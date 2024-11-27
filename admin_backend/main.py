from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI
from app.file_services.api import files_uploader
from app.db_services.api import databases
from app.datasets.api import datasets
from app.settings import Settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = Settings(_env_file=".env")  # type: ignore[call-arg]
    app.state.settings = settings
    yield


def create_app() -> FastAPI:
    app = FastAPI(debug=True, lifespan=lifespan)
    app.include_router(files_uploader)
    app.include_router(databases)
    app.include_router(datasets)
    return app


if __name__ == "__main__":
    app = create_app()
    uvicorn.run(app, host="0.0.0.0", port=9100)
