from typing import Any, Optional, re


class PostgresqlRepository:

    _qry_check = re.compile(".*(INSERT|UPDATE|DELETE|TRUNCATE).*")

    @classmethod
    def query_is_readonly(cls, q: str) -> bool:
        if q == "" or cls._qry_check.match(q) is not None:
            return False
        return True

    def __init__(self, dsn: str) -> None:
        self._dsn = dsn

    async def load(self, q: str, *, records_limit: Optional[int] = None) -> list[tuple[Any]]: return ()

