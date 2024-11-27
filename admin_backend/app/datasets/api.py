import http

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from ragflow_sdk import RAGFlow

from app.datasets.requests.requests import NewDataset
from app.datasets.responses.responses import CreatedDataset
from app.config.config import app_logger

from app.datasets.requests.requests import DeleteDatasets

datasets = APIRouter(prefix="/api/v1/datasets")


@datasets.post("/new")
async def create_new_dataset(rq: NewDataset) -> JSONResponse:
    flow = RAGFlow(api_key="", base_url="")
    try:
        ds = flow.create_dataset(
            name=rq.name,
            avatar=rq.avatar,
            description=rq.description,
            language=rq.language,
            permission=rq.permission,
            chunk_method=rq.chunk_method,
        )
        dset = CreatedDataset(dsid=ds.id)
        return JSONResponse(
            dset.model_dump(),
            status_code=http.HTTPStatus.ACCEPTED,
        )
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)


@datasets.get("/")
async def get_datasets_list(
    page: int,
    page_size: int,
    orderby: str,
    desc: bool,
    id: str | None = None,
    name: str | None = None,
) -> JSONResponse:
    try:
        ds = RAGFlow.list_datasets(
            page=page,
            page_size=page_size,
            orderby=orderby,
            desc=desc,
            id=id,
            name=name,
        )
        return JSONResponse(ds)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(
            status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR,
        )


@datasets.post("/delete")
async def delete_wished_datasets(delete: DeleteDatasets) -> JSONResponse:
    flow = RAGFlow(api_key="", base_url="")
    if len(delete.list_id) == 0:
        app_logger.error(f"{__name__}: nothing to delete")
        return JSONResponse(status_code=http.HTTPStatus.BAD_REQUEST)
    try:
        flow.delete_datasets(delete.list_id)
        return JSONResponse(status_code=http.HTTPStatus.ACCEPTED)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
