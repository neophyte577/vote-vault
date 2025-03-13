from fastapi import FastAPI
from routers import converter

app = FastAPI()

app.include_router(converter.router)
# app.include_router(queries.router)

# Run with: uvicorn main:app --host 0.0.0.0 --port 1337 --reload
