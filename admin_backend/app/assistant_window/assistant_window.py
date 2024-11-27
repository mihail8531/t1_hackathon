from dataclasses import dataclass
from typing import Protocol


@dataclass
class AssistantWindow:
    id: int
    style: str
    assistant_id: str


class AssistantWindowRepository(Protocol):
    async def get_by_id(self, id: int) -> AssistantWindow: ...

    async def get_all(self) -> list[AssistantWindow]: ...

    async def create(self, style: str, assistant_id: str) -> AssistantWindow: ...

    async def delete(self, id: int) -> None: ...

    async def update(self, item: AssistantWindow) -> None: ...
