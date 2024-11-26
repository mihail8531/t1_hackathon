from pydantic import BaseModel


class CreatedDataset(BaseModel):
    dsid: str
