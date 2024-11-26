import http
from typing import Iterable

from fastapi import APIRouter, HTTPException, UploadFile
from fastapi import Response

from file_services.converter import SUPPORTED_EXTS, File, FileConverter
from file_services.csv_covnerter import CSVtoXLSXConverter
from file_services.empty_converter import EmptyConverter


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
def upload_new_file(file: UploadFile) -> Response:
    extension = get_extension(file.filename or "")
    if extension not in SUPPORTED_EXTS:
        raise HTTPException(status_code=415, detail="wrong extension")
    converter = get_converter(file)
    converted_file = converter.convert_file(
        File(content=file.file, name=file.filename or "")
    )
    
    #TODO передача файла 

    return Response(status_code=http.HTTPStatus.ACCEPTED)
