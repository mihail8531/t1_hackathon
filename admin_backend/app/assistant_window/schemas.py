from pydantic import BaseModel
from app.assistant_window.assistant_window import (
    AssistantWindow as AssistantWindowModel,
)


class AssistantWindow(BaseModel):
    id: int
    style: str
    assistant_id: str

    @staticmethod
    def from_model(assistant_window_model: AssistantWindowModel) -> "AssistantWindow":
        return AssistantWindow.model_validate(
            assistant_window_model, from_attributes=True
        )


class AssistantWindowCreate(BaseModel):
    style: str
    assistant_id: str


class AssistantWindowUpdate(BaseModel):
    style: str | None = None
    assistant_id: str | None = None
