from typing import Optional

from pydantic import BaseModel

from app.datasets.requests.requests import NewDataset


class FileUploadRequest(BaseModel):
    dataset: NewDataset
    dataset_id: Optional[str] = None