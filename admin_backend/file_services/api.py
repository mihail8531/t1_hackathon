import http

from fastapi import APIRouter, UploadFile, File
from fastapi import Response


files_uploader = APIRouter(prefix="/api/v1/documents")


@files_uploader.post("/new")
async def upload_new_pdf(pdf_file: UploadFile = File(...)) -> Response:
    return Response(status_code=http.HTTPStatus.ACCEPTED)
