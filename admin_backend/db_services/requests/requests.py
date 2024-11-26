from pydantic import BaseModel, Field


class SqlQuery(BaseModel):
    query: str
    db_provider: str
    database_name: str
    db_host: str
    db_port: str
    db_user: str
    db_user_passwd: str
    limit: int = Field(gt=0, lt=10)
