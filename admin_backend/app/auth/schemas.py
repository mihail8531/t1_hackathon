from pydantic import BaseModel


class UserCredentials(BaseModel):
    email: str
    nickname: str
    password: str


class LoginCredentials(BaseModel):
    email: str
    password: str

class RagFlowKeys(BaseModel):
    api_key: str
    auth_key: str