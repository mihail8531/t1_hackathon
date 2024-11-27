from dataclasses import dataclass
from io import BytesIO
import mimetypes
from typing import BinaryIO, Literal, Protocol, TypeAlias


SUPPORTED_RAG_EXTS = ["pdf", "xlsx", "doc", "docx", "txt"]
ADDITIONAL_EXTS = ["csv"]
SUPPORTED_EXTS = SUPPORTED_RAG_EXTS + ADDITIONAL_EXTS


@dataclass
class File:
    content: BinaryIO
    name: str


class FileConverter(Protocol):

    def convert_file(self, input_file: File) -> File: ...
