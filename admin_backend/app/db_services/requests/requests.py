from typing import Optional

from pydantic import BaseModel, Field
from enum import StrEnum

from admin_backend.app.datasets.requests.requests import NewDataset


class StoredContentType(StrEnum):
    TEXT: str = "text"


class SqlQuery(BaseModel):
    query: str
    db_provider: str
    database_name: str
    db_host: str
    db_port: str
    db_user: str
    db_user_passwd: str
    content_type: str
    content_title: str
    dataset: NewDataset
    limit: int = Field(gt=0, lt=10)
    dataset_id: Optional[str] = None
