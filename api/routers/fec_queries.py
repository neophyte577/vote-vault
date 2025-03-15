from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query, Request
from starlette.status import HTTP_401_UNAUTHORIZED
from auth import validate_api_key
import snowflake.connector
import os
import re
import logging
from pydantic import BaseModel
from slowapi import Limiter
from slowapi.util import get_remote_address

logger = logging.getLogger("uvicorn")
logger.setLevel(logging.INFO)

router = APIRouter(prefix="/fec", tags=["FEC Queries"])

limiter = Limiter(key_func=get_remote_address)

def get_snowflake_connection():
    try:
        print("Attempting to trigger the Snowflake...", flush=True)
        connection = snowflake.connector.connect(
            user=os.getenv("SNOWFLAKE_USER"),
            password=os.getenv("SNOWFLAKE_PASSWORD"),
            account=os.getenv("SNOWFLAKE_ACCOUNT"),
            warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
            database=os.getenv("SNOWFLAKE_DATABASE"),
            role=os.getenv('SNOWFLAKE_ROLE'),
            schema="RAW"
        )
        print("❄️ Oh, happy day. Snowflake connection established. Querying...", flush=True)
        return connection
    except Exception as e:
        print("Failure to communicate with Snowflake:", e, flush=True)
    

def validate_sql_query(query: str):
    query = query.strip().rstrip(";")  

    if not query.lower().startswith("select"):
        raise HTTPException(status_code=400, detail="Only SELECT statements are allowed.")

    forbidden_keywords = ["insert", "update", "delete", "drop", "alter", "create", "truncate", "merge", "grant", "revoke", "execute", "call", "--", ";"]
    for keyword in forbidden_keywords:
        if re.search(rf"\b{keyword}\b", query, re.IGNORECASE):
            raise HTTPException(status_code=400, detail="Unsafe SQL query detected.")

    allowed_syntax = re.compile(r"^SELECT\s+[a-zA-Z0-9_.*(),\s]+\s+FROM\s+[a-zA-Z0-9_]+"
                                 r"(\s+JOIN\s+[a-zA-Z0-9_]+\s+ON\s+[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\s*=\s*[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)?"
                                 r"(\s+WHERE\s+.+)?"
                                 r"(\s+GROUP BY\s+.+)?"
                                 r"(\s+HAVING\s+.+)?"
                                 r"(\s+ORDER BY\s+.+)?"
                                 r"(\s+LIMIT\s+\d+)?"
                                 r"\s*$", re.IGNORECASE)

    if not allowed_syntax.match(query):
        raise HTTPException(status_code=400, detail="Invalid SQL query format.")

    return query

@router.get("/param_query")
@limiter.limit("5/minute")
def query_fec_data(request: Request,
    table: str = Query(..., title="Primary Table Name"),
    columns: str = Query("*", title="Columns to Select", description="Comma-separated list of columns"),
    join_type: str = Query("INNER", title="Join Type", description="Type of JOIN (INNER, LEFT, RIGHT, FULL, OUTER)"),
    join_table: str = Query(None, title="Join Table", description="Optional table to JOIN with"),
    join_on: str = Query(None, title="Join Condition", description="ON condition for JOIN"),
    where: str = Query(None, title="WHERE Clause", description="Optional WHERE condition"),
    group_by: str = Query(None, title="GROUP BY Clause", description="Columns to group by"),
    having: str = Query(None, title="HAVING Clause", description="Optional HAVING condition for aggregation"),
    order_by: str = Query(None, title="ORDER BY Clause", description="Optional ORDER BY condition"),
    limit: int = Query(5, title="Row Limit")
):
    table = table.strip()
    query = f"SELECT {columns} FROM FEC.RAW.{table}"
    
    valid_joins = {"INNER", "LEFT", "RIGHT", "FULL", "OUTER"}
    if join_type.upper() not in valid_joins:
        raise HTTPException(status_code=400, detail="Invalid join type. Use INNER, LEFT, RIGHT, FULL, or OUTER.")
    
    if join_type.upper() == "OUTER":
        join_type = "FULL"
    
    if join_table and join_on:
        query += f" {join_type} JOIN FEC.RAW.{join_table} ON {join_on}"
    elif join_table or join_on:
        raise HTTPException(status_code=400, detail="Both join_table and join_on must be provided for a JOIN operation.")
    
    if where:
        query += f" WHERE {where}"
    if group_by:
        query += f" GROUP BY {group_by}"
    if having:
        query += f" HAVING {having}"
    if order_by:
        query += f" ORDER BY {order_by}"
    query += f" LIMIT {limit}"
    
    try:
        with get_snowflake_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(query)
                result = cur.fetchall()
                columns = [desc[0] for desc in cur.description]
        return [dict(zip(columns, row)) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

class SQLQuery(BaseModel):
    query: str

@router.post("/sql_query")
@limiter.limit("5/minute")
async def query_fec_sql(request: Request, query_data: SQLQuery, check: bool = Depends(validate_api_key)):
    if check:

        query = query_data.query.strip()
        query = validate_sql_query(query)
        
        try:
            with get_snowflake_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(query)
                    result = cur.fetchall()
                    columns = [desc[0] for desc in cur.description]
            return [dict(zip(columns, row)) for row in result]
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="WRONG. Try a working API key next time."
        )
    