from pydantic import BaseModel


class SqlQuery(BaseModel):
    query: str
    dsn: str
