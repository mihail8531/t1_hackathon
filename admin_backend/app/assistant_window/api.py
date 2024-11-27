from typing import Annotated
from fastapi import APIRouter, Depends

from app.assistant_window.assistant_window import AssistantWindowRepository
from app.assistant_window.schemas import (
    AssistantWindow,
    AssistantWindowCreate,
    AssistantWindowUpdate,
)
from app.dependencies import get_assistant_window_repository


assistant_windows = APIRouter(prefix="/api/v1/assistant_window")


@assistant_windows.get("/{assistant_window_id}")
async def get_assistant_window(
    assistant_window_id: int,
    assistant_window_repository: Annotated[
        AssistantWindowRepository, Depends(get_assistant_window_repository)
    ],
) -> AssistantWindow:
    window = await assistant_window_repository.get_by_id(assistant_window_id)
    return AssistantWindow.from_model(window)


@assistant_windows.get("/")
async def get_all_assistant_windows(
    assistant_window_repository: Annotated[
        AssistantWindowRepository, Depends(get_assistant_window_repository)
    ],
) -> list[AssistantWindow]:
    res = []
    for window in await assistant_window_repository.get_all():
        res.append(AssistantWindow.from_model(window))
    return res


@assistant_windows.post("/")
async def create_assistant_window(
    assistant_window_create: AssistantWindowCreate,
    assistant_window_repository: Annotated[
        AssistantWindowRepository, Depends(get_assistant_window_repository)
    ],
) -> AssistantWindow:
    return AssistantWindow.from_model(
        await assistant_window_repository.create(
            assistant_window_create.style, assistant_window_create.assistant_id
        )
    )


@assistant_windows.patch("/{assistant_window_id}")
async def update_assistant_window(
    assistant_window_id: int,
    assistant_window_update: AssistantWindowUpdate,
    assistant_window_repository: Annotated[
        AssistantWindowRepository, Depends(get_assistant_window_repository)
    ],
) -> AssistantWindow:
    assistant_window = await assistant_window_repository.get_by_id(assistant_window_id)
    if assistant_window_update.style is not None:
        assistant_window.style = assistant_window_update.style
    if assistant_window_update.assistant_id is not None:
        assistant_window.assistant_id = assistant_window_update.assistant_id
    await assistant_window_repository.update(assistant_window)
    return AssistantWindow.from_model(assistant_window)


@assistant_windows.delete("/{assistant_window_id}")
async def delete_assistant_window(
    assistant_window_id: int,
    assistant_window_repository: Annotated[
        AssistantWindowRepository, Depends(get_assistant_window_repository)
    ],
) -> None:
    assistant_window = await assistant_window_repository.get_by_id(assistant_window_id)
    await assistant_window_repository.delete(assistant_window.id)
