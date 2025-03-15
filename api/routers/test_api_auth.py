from fastapi import APIRouter, Depends
from auth import get_user

router = APIRouter(tags=['API Key Authorization Test'])

@router.get("/test_api_auth")
async def get_testroute(user: dict = Depends(get_user)):
    return user