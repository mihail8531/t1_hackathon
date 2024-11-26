class PostgresqlRepository:

    def __init__(self, dsn: str, query: str) -> None:
        self._q = query
        self._dsn = dsn

