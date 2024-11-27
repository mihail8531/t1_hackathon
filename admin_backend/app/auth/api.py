from typing import Annotated
from fastapi import APIRouter, Depends

from app.dependencies import get_settings
from app.settings import Settings


auth = APIRouter(prefix="/api/v1/auth")


@auth.get("/token")
def get_ragflow_token(settings: Annotated[Settings, Depends(get_settings)]) -> str:
    return settings.RAGFLOW_API_KEY
