import uvicorn
from fastapi import FastAPI

from file_services.api import files_uploader
from db_services.api import databases


app = FastAPI()
app.include_router(files_uploader)
app.include_router(databases)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9100)
