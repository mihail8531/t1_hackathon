from typing import Annotated, AsyncGenerator
import asyncpg
from fastapi import Depends, Request
from app.settings import Settings
from db import get_connection
from assistant_window import AssistantWindowRepository


def settings(request: Request) -> Settings:
    return request.app.state.settings


async def get_db_connection(
    settings: Annotated[Settings, Depends(settings)]
) -> AsyncGenerator[asyncpg.Connection, None]:
    async with get_connection(settings.DB_URL) as con:
        yield con


async def get_assistant_window_repository(
    con: Annotated[asyncpg.Connection, Depends(get_db_connection)]
) -> AssistantWindowRepository:
    pass # TODO 
