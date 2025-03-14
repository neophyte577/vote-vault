from fastapi import FastAPI
from routers import converter, fec_queries

app = FastAPI()

app.include_router(converter.router)
# app.include_router(fec_queries.router)
# app.include_router(election_queries.router)

# Run with: uvicorn main:app --host 0.0.0.0 --port 1337 --reload
