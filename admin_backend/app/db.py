from contextlib import asynccontextmanager
from typing import AsyncGenerator
import asyncpg


@asynccontextmanager
async def get_connection(db_url: str) -> AsyncGenerator[asyncpg.Connection, None]:
    try:
        con = await asyncpg.connect(db_url)
        yield con
    finally:
        await con.close()