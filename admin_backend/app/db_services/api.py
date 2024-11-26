import http

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from admin_backend.app.db_services.db_adapters.postgres_adapter import (
    PostgresqlRepository,
)
from admin_backend.app.db_services.requests.requests import SqlQuery
from admin_backend.app.db_services.db_adapters.adapters import POSSIBLE_DB_PROVIDERS
from admin_backend.app.exceptions.exceptions import ApplicationError
from admin_backend.app.config.config import app_logger

databases = APIRouter(prefix="/api/v1/databases")


@databases.post("/sql/lookup/")
async def lookup_data_using_sql(query: SqlQuery) -> JSONResponse:
    db_provider = query.db_provider.lower()
    if db_provider not in POSSIBLE_DB_PROVIDERS:
        return JSONResponse(status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    dsn = (
        f"{query.db_provider}://{query.db_user}:{query.db_user_passwd}"
        f"@{query.db_host}:{query.db_port}/{query.database_name}"
    )
    repo = PostgresqlRepository(dsn, app_logger)
    if not repo.query_is_readonly(query.query):
        return JSONResponse(status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    try:
        data = await repo.load(query.query, records_limit=query.limit)
    except ApplicationError as err:
        app_logger.error(f"error: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
    return data


@databases.post("/sql/send/text")
async def upload_data_using_sql(query: SqlQuery) -> JSONResponse:
    """load and send data from sql db into S3 storage"""
    db_provider = query.db_provider.lower()
    if db_provider not in POSSIBLE_DB_PROVIDERS:
        return JSONResponse(status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    dsn = (
        f"{query.db_provider}://{query.db_user}:{query.db_user_passwd}"
        f"@{query.db_host}:{query.db_port}/{query.database_name}"
    )
    repo = PostgresqlRepository(dsn, app_logger)
    if not repo.query_is_readonly(query.query):
        return JSONResponse(status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    try:
        data = await repo.load(query.query, records_limit=query.limit)
        # send data by API into RAG
    except ApplicationError as err:
        app_logger.error(f"error: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
    return data
