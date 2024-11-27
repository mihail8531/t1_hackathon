from typing import Any, Optional
import re

import aiologger
import asyncpg

from app.exceptions.exceptions import ApplicationError


class PostgresqlRepository:

    _qry_check = re.compile(".*(INSERT|UPDATE|DELETE|TRUNCATE|CREATE).*")

    @classmethod
    def query_is_readonly(cls, q: str) -> bool:
        if q == "" or cls._qry_check.match(q) is not None:
            return False
        return True

    def __init__(self, dsn: str, logger: aiologger.Logger) -> None:
        self._log = logger
        self._dsn = dsn

    async def load(
        self,
        q: str,
        *,
        records_limit: Optional[int] = None,
        timeout: float = 5.0,
    ) -> list[tuple[Any]]:
        to_ret = []
        try:
            with asyncpg.connect(self._dsn, timeout=timeout) as conn:
                rows = await conn.fetch(q)
                if records_limit is None:
                    return rows

                for idx, row in enumerate(rows, 1):
                    if records_limit != idx:
                        to_ret.append(row)
                        continue
                    return to_ret
        except Exception as err:
            self._log.error(f"{__name__}: {err}")
            raise ApplicationError(err)
