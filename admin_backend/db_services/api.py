import http

from fastapi import APIRouter, Depends
from fastapi import Response

from admin_backend.db_services.db_adapters.postgres_adapter import \
    PostgresqlRepository
from admin_backend.db_services.requests.requests import SqlQuery
from admin_backend.db_services.db_adapters.adapters import POSSIBLE_DB_PROVIDERS
from admin_backend.exceptions.exceptions import ApplicationError

databases = APIRouter(prefix="/api/v1/databases")


@databases.post("/sql/lookup/")
async def lookup_data_using_sql(query: SqlQuery = Depends(SqlQuery)) -> Response:
    db_provider = query.db_provider.lower()
    if db_provider not in POSSIBLE_DB_PROVIDERS:
        content = {"error": f"driver {db_provider} not supported"}
        return Response(content, status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    dsn = (
            f"{query.db_provider}://{query.db_user}:{query.db_user_passwd}"
            f"@{query.db_host}:{query.db_port}/{query.database_name}"
    )
    repo = PostgresqlRepository(dsn)
    if not repo.query_is_readonly(query.query):
        cnt = {"error": "query type not supported"}
        return Response(cnt, status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    try:
        data = repo.load(query.query, records_limit=query.limit)
    except ApplicationError as err:
        return Response(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
    return Response(data, status_code=http.HTTPStatus.ACCEPTED)


@databases.post("/sql/send/text")
async def upload_data_using_sql(query: SqlQuery = Depends(SqlQuery)) -> Response:
    """load and send data from sql db into S3 storage"""
    db_provider = query.db_provider.lower()
    if db_provider not in POSSIBLE_DB_PROVIDERS:
        content = {"error": f"driver {db_provider} not supported"}
        return Response(
            content,
            status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY
            )

    dsn = (
            f"{query.db_provider}://{query.db_user}:{query.db_user_passwd}"
            f"@{query.db_host}:{query.db_port}/{query.database_name}"
    )
    repo = PostgresqlRepository(dsn)
    if not repo.query_is_readonly(query.query):
        cnt = {"error": "query type not supported"}
        return Response(cnt, status_code=http.HTTPStatus.UNPROCESSABLE_ENTITY)

    try:
        data = repo.load(query.query, records_limit=query.limit)
        # send data by API into RAG
    except ApplicationError as err:
        return Response(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
    return Response(data, status_code=http.HTTPStatus.ACCEPTED)



