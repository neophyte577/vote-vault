from fastapi import FastAPI, Depends
from routers import converter, fec_queries, test_api_auth
from fastapi.security import APIKeyHeader
from auth import get_user

app = FastAPI()

header_scheme = APIKeyHeader(name="x-key")

app.include_router(test_api_auth.router, dependencies=[Depends(get_user)])
app.include_router(converter.router)
app.include_router(fec_queries.router)
# app.include_router(election_queries.router)

# Run with: uvicorn main:app --host 0.0.0.0 --port 1337 --reload
