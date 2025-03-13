from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse
import boto3
import os
import shutil
import pandas as pd
from dotenv import load_dotenv
from starlette.background import BackgroundTask

load_dotenv()

router = APIRouter()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = "fec-data-staging-bucket"
AWS_REGION = "us-east-2"

if not AWS_ACCESS_KEY or not AWS_SECRET_KEY:
    raise RuntimeError("AWS credentials not found. Check your .env file.")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

TEMP_DIR = "temp"

def create_temp():
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)  
    os.makedirs(TEMP_DIR)  

@router.get("/convert")
def get_s3_file(
    dataset_name: str = Query(..., description="The dataset name (e.g., candidate_summary)"),
    cycle: str = Query(..., description="The election cycle (e.g., '2024')"),
    filetype: str = Query("csv", description="Desired file type (csv, xlsx, or parquet)")
):
    try:
        if filetype not in ["csv", "xlsx", "parquet"]:
            raise HTTPException(status_code=400, detail="Invalid filetype. Use 'csv', 'xlsx', or 'parquet'.")

        file_key = f"campaign-finance/{cycle}/{dataset_name}_{cycle}.parquet"

        create_temp()

        local_parquet_path = f"temp/{dataset_name}_{cycle}.parquet"

        s3_client.download_file(S3_BUCKET_NAME, file_key, local_parquet_path)

        print(f"File successfully downloaded to {local_parquet_path}")

        df = pd.read_parquet(local_parquet_path)

        if filetype == "csv":
            converted_file_path = f"temp/{dataset_name}_{cycle}.csv"
            df.to_csv(converted_file_path, index=False)
            return FileResponse(converted_file_path, 
                                filename=f"{dataset_name}_{cycle}.csv", 
                                media_type="text/csv", 
                                background=BackgroundTask(lambda: shutil.rmtree(TEMP_DIR, ignore_errors=True))
                                )

        elif filetype == "xlsx":
            converted_file_path = f"temp/{dataset_name}_{cycle}.xlsx"
            df.to_excel(converted_file_path, index=False)
            return FileResponse(converted_file_path, 
                                filename=f"{dataset_name}_{cycle}.xlsx", 
                                media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
                                background=BackgroundTask(lambda: shutil.rmtree(TEMP_DIR, ignore_errors=True))
                                )

        else:  
            return FileResponse(local_parquet_path, 
                                filename=f"{dataset_name}_{cycle}.parquet", 
                                media_type="application/octet-stream", 
                                background=BackgroundTask(lambda: shutil.rmtree(TEMP_DIR, ignore_errors=True))
                                )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
