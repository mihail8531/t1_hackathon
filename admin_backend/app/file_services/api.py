import http
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from ragflow_sdk import RAGFlow

from app.dependencies import get_settings

from .converter import SUPPORTED_EXTS, File, FileConverter
from .csv_covnerter import CSVtoXLSXConverter
from .empty_converter import EmptyConverter
from ..config.config import app_logger
from ..settings import Settings

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
async def upload_new_file(
    rag_settings: Annotated[Settings, Depends(get_settings)],
    file: UploadFile,
    filename: str,
    description: str,
    language: str,
    permission: str,
    chunk_method: str,
    avatar: Optional[str] = "",
    dataset_id: Optional[str] = None,
) -> JSONResponse:
    flow = RAGFlow(
        api_key=rag_settings.RAGFLOW_API_KEY, base_url=rag_settings.ragflow_base_url
    )
    extension = get_extension(file.filename or "")
    if extension not in SUPPORTED_EXTS:
        raise HTTPException(status_code=415, detail="wrong extension")
    converter = get_converter(file)
    converted_file = converter.convert_file(
        File(content=file.file, name=file.filename or "")
    )
    # displayed_name
    _data = [
        {"displayed_name": converted_file.name, "blob": converted_file.content},
    ]
    if dataset_id is None:
        try:
            new_ds = flow.create_dataset(
                name=filename,
                avatar=avatar,
                description=description,
                language=language,
                permission=permission,
                chunk_method=chunk_method,
            )
            docs_ids = []
            docs = new_ds.upload_documents(_data)
            for doc in docs:
                docs_ids.append(doc.id)
            rsp = {"dataset_id": new_ds.id, "docs": docs_ids}
            return JSONResponse(rsp)
        except Exception as err:
            app_logger.error(f"{__name__}: {err}")
            return JSONResponse(
                {"error": 500}, status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
            )

    try:
        ds = flow.list_datasets(id=dataset_id)
        if len(ds) == 0:
            app_logger.error(f"{__name__}: dataset {dataset_id} not found")
            return JSONResponse({"error": 500}, status_code=http.HTTPStatus.NOT_FOUND)
        docs_ids = []
        docs = ds[0].upload_documents(_data)
        for doc in docs:
            docs_ids.append(doc.id)
        rsp = {"dataset_id": ds[0].id, "docs": docs_ids}
        return JSONResponse(rsp)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(
            {"error": 500}, status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
        )


@files_uploader.post("/new/files")
async def upload_new_files(
    rag_settings: Annotated[Settings, Depends(get_settings)],
    files: list[UploadFile],
    filename: str,
    description: str,
    language: str,
    permission: str,
    chunk_method: str,
    avatar: Optional[str] = "",
    dataset_id: Optional[str] = None,
) -> JSONResponse:
    """upload limit = 20"""
    flow = RAGFlow(
        api_key=rag_settings.RAGFLOW_API_KEY, base_url=rag_settings.ragflow_base_url
    )
    _data = []
    for file in files:
        extension = get_extension(file.filename or "")
        if extension not in SUPPORTED_EXTS:
            raise HTTPException(status_code=415, detail="wrong extension")
        converter = get_converter(file)
        converted_file = converter.convert_file(
            File(content=file.file, name=file.filename or "")
        )
        _data.append(
            {"displayed_name": converted_file.name, "blob": converted_file.content},
        )
    if dataset_id is None:
        try:
            new_ds = flow.create_dataset(
                name=filename,
                avatar=avatar,
                description=description,
                language=language,
                permission=permission,
                chunk_method=chunk_method,
            )
            new_ds.upload_documents(_data)
            rsp = {"dataset_id": new_ds.id}
            return JSONResponse(rsp)
        except Exception as err:
            app_logger.error(f"{__name__}: {err}")
            return JSONResponse(
                {"error": 500}, status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
            )

    try:
        ds = flow.list_datasets(id=dataset_id)
        if len(ds) == 0:
            app_logger.error(f"{__name__}: dataset {dataset_id} not found")
            return JSONResponse({"error": 500}, status_code=http.HTTPStatus.NOT_FOUND)
        ds[0].upload_documents(_data)
        rsp = {"dataset_id": ds[0].id}
        JSONResponse(rsp)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(
            {"error": 500}, status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
        )


# @files_uploader.get("/files")
# async def get_files(
#     rag_settings: Annotated[Settings, Depends(get_settings)], dataset_id: str
# ) -> JSONResponse:
#     flow = RAGFlow(
#         api_key=rag_settings.RAGFLOW_API_KEY, base_url=rag_settings.ragflow_base_url
#     )
#
#     if dataset_id == "":
#         app_logger.error(f"{__name__}: no dataset id")
#         return JSONResponse({"error": 400}, status_code=http.HTTPStatus.BAD_REQUEST)
#
#     try:
#         ds = flow.list_datasets(id=dataset_id)
#         if len(ds) == 0:
#             return JSONResponse([])
#
#         JSONResponse(rsp)
#     except Exception as err:
#         app_logger.error(f"{__name__}: {err}")
#         return JSONResponse(
#             {"error": 500}, status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
#         )
