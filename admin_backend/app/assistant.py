from dataclasses import dataclass
from typing import Iterable, Protocol


@dataclass
class LLM:
    frequency_penalty: float
    max_tokens: int
    model_name: str
    presence_penalty: float
    temperature: float
    top_p: float


@dataclass
class Variable:
    key: str
    optional: bool


@dataclass
class Prompt:
    empty_response: str
    keywords_similarity_weight: float
    opener: str
    prompt: str
    similarity_threshold: float
    top_n: int
    variables: list[Variable]


@dataclass
class Assistant:
    id: str
    name: str
    dataset_ids: list[str]
    llm: LLM
    prompt: Prompt


class AssistantRepository(Protocol):
    async def get_by_id(self, id: int) -> Assistant: ...

    async def get_all(self) -> list[Assistant]: ...

    async def create(
        self, name: str, dataset_ids: Iterable[str], llm: LLM, Prompt: Prompt
    ) -> Assistant: ...

    async def delete(self, id: int) -> None: ...

    async def update(
        self,
        name: str | None,
        dataset_ids: list[str] | None,
        llm: LLM | None,
        prompt: Prompt | None,
    ) -> Assistant: ...
