import http
from typing import Annotated, Optional
from urllib.parse import urlparse
from fastapi import APIRouter, Depends, FastAPI
from fastapi.responses import JSONResponse
from app.settings import Settings
from app.site_services.site_extractor import extract_text_from_site
from app.dependencies import get_settings
from ragflow_sdk import RAGFlow
from ..config.config import app_logger

site = APIRouter(prefix="/api/v1/site")


def url_to_filename(url: str) -> str:
    parsed_url = urlparse(url)
    domain = parsed_url.netloc.replace("www.", "").replace(".", "_")
    path = parsed_url.path.replace("/", "_")
    query = parsed_url.query.replace("&", "_").replace("=", "_")
    parts = filter(None, [domain, path, query])
    filename = "_".join(parts)
    return f"{filename}.txt"


@site.post("/new")
async def upload_from_site(
    settings: Annotated[Settings, Depends(get_settings)],
    url: str,
    filename: str,
    description: str,
    language: str,
    permission: str,
    chunk_method: str,
    avatar: Optional[str] = "",
    dataset_id: Optional[str] = None,
) -> None:
    text = extract_text_from_site(url)
    filename = url_to_filename(url)
    flow = RAGFlow(api_key=settings.RAGFLOW_API_KEY, base_url=settings.ragflow_base_url)
    _data = [
        {"display_name": filename, "blob": text.encode()},
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
        return JSONResponse(rsp)
    except Exception as err:
        app_logger.error(f"{__name__}: {err}")
        return JSONResponse(
            {"error": 500}, status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
        )
