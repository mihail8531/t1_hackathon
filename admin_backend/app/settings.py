from pydantic_settings import BaseSettings as BaseSettings_, SettingsConfigDict


class BaseSettings(BaseSettings_):
    model_config = SettingsConfigDict(extra="allow")


class DatabaseSettings(BaseSettings):
    ADMIN_BACKEND_DB_USER: str
    ADMIN_BACKEND_DB_PASSWORD: str
    ADMIN_BACKEND_DB_HOST: str
    ADMIN_BACKEND_DB_PORT: int
    ADMIN_BACKEND_DB_NAME: str

    @property
    def DB_URL(self) -> str:
        return f"postgresql://{self.ADMIN_BACKEND_DB_USER}:{self.ADMIN_BACKEND_DB_PASSWORD}@{self.ADMIN_BACKEND_DB_HOST}:{self.ADMIN_BACKEND_DB_PORT}/{self.ADMIN_BACKEND_DB_NAME}"


class Settings(DatabaseSettings):
    model_config = SettingsConfigDict(extra="allow")

    RAGFLOW_API_KEY: str
