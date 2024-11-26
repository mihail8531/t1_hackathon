from typing import Any, Optional
import re

import asyncpg

from admin_backend.exceptions.exceptions import ApplicationError


class PostgresqlRepository:

    _qry_check = re.compile(".*(INSERT|UPDATE|DELETE|TRUNCATE|CREATE).*")

    @classmethod
    def query_is_readonly(cls, q: str) -> bool:
        if q == "" or cls._qry_check.match(q) is not None:
            return False
        return True

    def __init__(self, dsn: str) -> None:
        self._dsn = dsn

    async def load(self, q: str, *, records_limit: Optional[int] = None) -> list[tuple[Any]]:
        to_ret = []
        conn = None
        try:
            conn = await asyncpg.connect(self._dsn)
            rows = await conn.fetch(q)
            if records_limit is not None:
                for idx, row in enumerate(rows, 1):
                    if records_limit == idx:
                        await conn.Close()
                        return to_ret
                    to_ret.append(row)
        except Exception as err:
            await conn.Close()
            raise ApplicationError(err)

        if conn is not None:
            await conn.Close()





