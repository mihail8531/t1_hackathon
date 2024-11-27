import asyncpg
from app.assistant_window.assistant_window import (
    AssistantWindow,
    AssistantWindowRepository,
)
from app.exceptions.exceptions import NotFoundError


class AssistantWindowPgRepository(AssistantWindowRepository):
    def __init__(self, con: asyncpg.Connection) -> None:
        self._con = con

    async def get_all(self) -> list[AssistantWindow]:
        query = """
        SELECT * FROM assistant_window
        """
        res = []
        for row in await self._con.fetch(query):
            res.append(
                AssistantWindow(
                    id=row["id"], style=row["style"], assistant_id=row["assistant_id"]
                )
            )
        return res

    async def get_by_id(self, id: int) -> AssistantWindow:
        query = """
        SELECT * FROM assistant_window
        WHERE id = $1
        """
        rows = await self._con.fetch(query, id)
        if len(rows) == 0:
            raise NotFoundError
        row = rows[0]
        return AssistantWindow(
            id=row["id"], style=row["style"], assistant_id=row["assistant_id"]
        )

    async def create(self, style: str, assistant_id: str) -> AssistantWindow:
        query = """
        INSERT INTO assistant_window (style, assistant_id)
        VALUES ($1, $2)
        RETURNING id
        """
        rows = await self._con.fetch(query, style, assistant_id)
        row = rows[0]
        return AssistantWindow(id=row["id"], style=style, assistant_id=assistant_id)

    async def delete(self, id: int) -> None:
        query = """
        DELETE FROM assistant_window
        WHERE id = $1
        """
        await self._con.execute(query, id)

    async def update(self, assistant_window: AssistantWindow) -> None:
        query = """
        UPDATE assistant_window
        SET
            style = $2,
            assistant_id = $3
        WHERE id = $1
        """
        await self._con.execute(
            query,
            assistant_window.id,
            assistant_window.style,
            assistant_window.assistant_id,
        )
