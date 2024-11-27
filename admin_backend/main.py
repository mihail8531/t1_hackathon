from contextlib import asynccontextmanager
from fastapi import FastAPI
import uvicorn
from app.exceptions.exceptions import NotFoundError, ApplicationError
from app.exceptions.handlers import not_found_exception_handler
from app.file_services.api import files_uploader
from app.db_services.api import databases
from app.assistant_window.api import assistant_windows
from app.settings import Settings
from app.site_services.api import sites
from app.config.config import app_logger
from app.auth.services import get_rag_api_token
from app.auth.api import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = Settings(_env_file=".env")  # type: ignore[call-arg]
    try:
        settings.RAGFLOW_API_KEY, settings.RAGFLOW_AUTH_KEY = await get_rag_api_token()
    except ApplicationError as err:
        await app_logger.error(f"{__name__}: failed to fetch RAG API token\n({err})")
    app.state.settings = settings
    yield


def create_app() -> FastAPI:
    app = FastAPI(debug=True, lifespan=lifespan)
    app.include_router(files_uploader)
    app.include_router(databases)
    app.include_router(assistant_windows)
    app.include_router(sites)
    app.include_router(auth)
    app.exception_handler(NotFoundError)(not_found_exception_handler)

    return app


if __name__ == "__main__":
    app = create_app()
    uvicorn.run(app, host="0.0.0.0", port=9100)
