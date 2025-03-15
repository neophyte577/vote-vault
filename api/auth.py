from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
import json
import os

IS_PRODUCTION = os.getenv("ENV") == "production"

if IS_PRODUCTION == 'production':
    users = json.loads(os.getenv("USERS_JSON"))
    api_keys = json.loads(os.getenv("API_KEYS_JSON"))
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    USERS_FILE = os.path.join(BASE_DIR, "credentials", "users.json")
    KEYS_FILE = os.path.join(BASE_DIR, "credentials", "keys.json")

    def load_json(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"WRONG: {file_path} not found.")
            return {}
        except json.JSONDecodeError:
            print(f"WRONG: {file_path} contains invalid JSON.")
            return {}

    users = load_json(USERS_FILE)
    api_keys = load_json(KEYS_FILE)


def check_api_key(api_key: str):
    return api_key in api_keys

def get_user_from_api_key(api_key: str):
    return users[api_keys[api_key]]

api_key_header = APIKeyHeader(name="X-API-Key")

def get_user(api_key_header: str = Security(api_key_header)):
    if check_api_key(api_key_header):
        user = get_user_from_api_key(api_key_header)
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Missing or invalid API key"
    )

def validate_api_key(api_key_header: str = Security(api_key_header)):
    return api_key_header in api_keys

