from pydantic import BaseModel


class NewDataset(BaseModel):
    name: str
    avatar: str
    description: str
    language: str
    permission: str
    chunk_method: str


class DeleteDatasets(BaseModel):
    list_id: list[str]
