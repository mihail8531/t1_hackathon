import http
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from ragflow_sdk import RAGFlow

from app.config.config import app_logger
from app.db_services.db_adapters.adapters import POSSIBLE_DB_PROVIDERS
from app.db_services.db_adapters.postgres_adapter import (
    PostgresqlRepository,
)
from app.db_services.requests.requests import (
    StoredContentType,
    SqlQuery,
)
from app.dependencies import get_settings
from app.exceptions.exceptions import ApplicationError
from app.settings import Settings

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
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
    return data


@databases.post("/sql/send/text")
async def upload_data_using_sql(
    settings: Annotated[Settings, Depends(get_settings)], query: SqlQuery
) -> JSONResponse:
    """load and send data from sql db into S3 storage"""
    _data = []
    flow = RAGFlow(api_key=settings.RAGFLOW_API_KEY, base_url=settings.ragflow_base_url)
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

    if not query.content_type in (StoredContentType.TEXT,):
        return JSONResponse(status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    try:
        data = await repo.load(query.query, records_limit=query.limit)
        for idx, col in enumerate(data):
            if not isinstance(col, bytes) or not isinstance(col, str):
                app_logger.warning(
                    f"{__name__}: content type '{type(col)}' not supported"
                )
                return JSONResponse(status_code=http.HTTPStatus.BAD_REQUEST)

            if isinstance(col, str):
                col = col.encode("utf-8")

            _data.append(
                {
                    "displayed_name": f"{query.content_title}_{idx}",
                    "blob": col,
                }
            )
    except ApplicationError as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)

    if query.dataset_id is None:
        try:
            ds_params = query.dataset
            new_ds = flow.create_dataset(
                name=ds_params.name,
                avatar=ds_params.avatar,
                description=ds_params.description,
                language=ds_params.language,
                permission=ds_params.permission,
                chunk_method=ds_params.chunk_method,
            )
            new_ds.upload_documents(_data)
            rsp = {"dataset_id": new_ds.id}
            return JSONResponse(rsp)
        except Exception as err:
            app_logger.error(f"{__name__}: {err}")
            return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)

    try:
        ds = flow.list_datasets(id=query.dataset_id)
        if len(ds) == 0:
            app_logger.error(f"{__name__}: dataset {query.dataset_id} not found")
            return JSONResponse(status_code=http.HTTPStatus.NOT_FOUND)
        ds[0].upload_documents(_data)
        rsp = {"dataset_id": ds[0].id}
        return JSONResponse(rsp)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
