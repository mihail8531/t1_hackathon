from pydantic_settings import BaseSettings as BaseSettings_, SettingsConfigDict


RAG_API_PUBLIC_KEY: str = (
    """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArq9XTUSeYr2+N1h3Afl/z8Dse/2yD0ZGrKwx+EEEcdsBLca9Ynmx3nIB5obmLlSfmskLpBo0UACBmB5rEjBp2Q2f3AG3Hjd4B+gNCG6BDaawuDlgANIhGnaTLrIqWrrcm4EMzJOnAOI1fgzJRsOOUEfaS318Eq9OVO3apEyCCt0lOQK6PuksduOjVxtltDav+guVAA068NrPYmRNabVKRNLJpL8w4D44sfth5RvZ3q9t+6RTArpEtc5sh5ChzvqPOzKGMXW83C95TxmXqpbK6olN4RevSfVjEAgCydH6HN6OhtOQEcnrU97r9H0iZOWwbw3pVrZiUkuRD1R56Wzs2wIDAQAB
-----END PUBLIC KEY-----""")


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
    RAGFLOW_HOST: str
    RAGFLOW_PORT: str

    @property
    def ragflow_base_url(self) -> str:
        return f"http://{self.RAGFLOW_HOST}:{self.RAGFLOW_PORT}/"


class AuthSettings(BaseSettings):
    model_config = SettingsConfigDict(extra="allow")

    APP_LOGIN: str
    APP_PASSWD: str
    APP_LOGIN_HOST: str
    APP_LOGIN_PORT: str

    @property
    def get_login_v1_path(self) -> str:
        return f"http://{self.APP_LOGIN_HOST}:{self.APP_LOGIN_PORT}/v1/user/login"

    @property
    def get_sign_up_v1_path(self) -> str:
        return f"http://{self.APP_LOGIN_HOST}:{self.APP_LOGIN_PORT}/v1/user/register"

    @property
    def get_api_token_path(self) -> str:
        return f"http://{self.APP_LOGIN_HOST}:{self.APP_LOGIN_PORT}/v1/system/new_token"
