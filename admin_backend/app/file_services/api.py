import http

from fastapi import APIRouter, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from ragflow_sdk import RAGFlow

from .converter import SUPPORTED_EXTS, File, FileConverter
from .csv_covnerter import CSVtoXLSXConverter
from .empty_converter import EmptyConverter
from .schemas import FileUploadRequest
from ..config.config import app_logger

files_uploader = APIRouter(prefix="/api/v1/documents")


def get_converter(file: UploadFile) -> FileConverter:
    ext = get_extension(file.filename or "")
    if ext == "csv":
        return CSVtoXLSXConverter()
    return EmptyConverter()


def get_extension(filename: str) -> str | None:
    dot_splited = filename.split(".")
    if len(dot_splited) == 0:
        return None
    return dot_splited[-1].lower()


@files_uploader.post("/new")
def upload_new_file(upload_req: FileUploadRequest, file: UploadFile) -> JSONResponse:
    flow = RAGFlow(api_key="")
    extension = get_extension(file.filename or "")
    if extension not in SUPPORTED_EXTS:
        raise HTTPException(status_code=415, detail="wrong extension")
    converter = get_converter(file)
    converted_file = converter.convert_file(
        File(content=file.file, name=file.filename or "")
    )
    _data = [
        {"display_name": converted_file.name, "blob": converted_file.content}, ]
    if upload_req.dataset_id is None:
        ds_params = upload_req.dataset
        try:
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
        ds = flow.list_datasets(id=upload_req.dataset_id)
        if len(ds) == 0:
            app_logger.error(f"{__name__}: dataset {upload_req.dataset_id} not found")
            return JSONResponse(status_code=http.HTTPStatus.NOT_FOUND)
        ds[0].upload_documents(_data)
        rsp = {"dataset_id": ds[0].id}
        return JSONResponse(rsp)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR)
