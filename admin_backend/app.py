import uvicorn
from fastapi import FastAPI

from admin_backend.app.file_services.api import files_uploader
from admin_backend.app.db_services.api import databases
from admin_backend.app.datasets.api import datasets


app = FastAPI()
app.include_router(files_uploader)
app.include_router(databases)
app.include_router(datasets)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9100)
