from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI

from app.file_services.api import files_uploader
from app.db_services.api import databases
from app.datasets.api import datasets
from settings import Settings


settings = Settings(_env_file=".env.example")  # type: ignore[call-arg]


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.settings = settings
    yield


app = FastAPI(debug=True, lifespan=lifespan)
app.include_router(files_uploader)
app.include_router(databases)
app.include_router(datasets)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9100)
