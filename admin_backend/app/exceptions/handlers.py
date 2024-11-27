
from fastapi import Request
from fastapi.responses import JSONResponse

from app.exceptions.exceptions import NotFoundError


async def not_found_exception_handler(request: Request, exc: NotFoundError):
    return JSONResponse(
        status_code=404,
        content="Not found",
    )