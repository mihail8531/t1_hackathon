import http

from fastapi import APIRouter, Depends
from fastapi import Response

from admin_backend.db_services.requests.requests import SqlQuery


databases = APIRouter(prefix="/api/v1/databases")


@databases.get("/sql/lookup/")
async def lookup_data_using_sql(dsn: str, query: str, limit: int) -> Response:
    return Response(status_code=http.HTTPStatus.ACCEPTED)


@databases.post("/sql/send/text")
async def upload_data_using_sql(qry: SqlQuery = Depends(SqlQuery)) -> Response:
    """load and send data from sql db into S3 storage"""
    return Response(status_code=http.HTTPStatus.ACCEPTED)



