from fastapi import APIRouter
from fastapi import Response


files_uploader = APIRouter(prefix="/api/v1/files")


@files_uploader.post("/pdf/new")
async def upload_new_pdf() -> Response: pass


@files_uploader.post("/csv/new")
async def upload_new_csv() -> Response: pass
