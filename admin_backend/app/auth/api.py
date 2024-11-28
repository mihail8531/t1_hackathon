from typing import Annotated
from fastapi import APIRouter, Depends

from app.auth.schemas import RagFlowKeys
from app.dependencies import get_settings
from app.settings import Settings


auth = APIRouter(prefix="/api/v1/auth")


@auth.get("/token")
def get_ragflow_token(settings: Annotated[Settings, Depends(get_settings)]) ->  RagFlowKeys:
    return RagFlowKeys(api_key=settings.RAGFLOW_API_KEY, auth_key=settings.RAGFLOW_AUTH_KEY)
