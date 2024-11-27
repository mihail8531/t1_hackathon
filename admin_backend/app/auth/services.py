import io
from typing import Optional

import httpx
from io import BytesIO
from httpx import AsyncClient
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

from .schemas import UserCredentials, LoginCredentials
from ..exceptions.exceptions import ApplicationError
from ..settings import AuthSettings, RAG_API_PUBLIC_KEY
from ..config.config import app_logger

auth_settings = AuthSettings(_env_file=".env")


def encrypt(passwd: str, pub: str) -> str:
    rsa_key = RSA.import_key(pub)
    cipher = PKCS1_OAEP.new(rsa_key)
    encrypted_password = cipher.encrypt(passwd.encode('utf-8'))
    
    # Кодируем результат в Base64
    encrypted_base64 = base64.b64encode(encrypted_password).decode('utf-8')
    return encrypted_base64


async def get_rag_api_token(*, timeout: float = 10.0) -> str:
    data: Optional[UserCredentials] = None
    try:
        encrypted_pass = encrypt(auth_settings.APP_PASSWD, RAG_API_PUBLIC_KEY)
        data = UserCredentials(
            email=auth_settings.APP_LOGIN,
            nickname=auth_settings.APP_LOGIN.split("@")[0],
            password=encrypted_pass,
        )
    except Exception as err:
        await app_logger.error(f"{__name__}: {err}")
        raise ApplicationError("system user credentials error")
    async with AsyncClient(timeout=timeout) as a_client:
        try:
            url = auth_settings.get_sign_up_v1_path
            resp = await a_client.post(url, json=data.model_dump())
            resp.raise_for_status()
        except (
            httpx.TimeoutException,
            httpx.HTTPStatusError,
            httpx.HTTPError,
        ) as err:
            await app_logger.error(f"{__name__}: {err}")
            raise ApplicationError("remote server conversation error")
    print(encrypted_pass)
    print(resp.content)
    print(resp.status_code)
    login_data: Optional[LoginCredentials] = None
    try:
        encrypted_pass = encrypt(auth_settings.APP_PASSWD, RAG_API_PUBLIC_KEY)
        login_data = UserCredentials(
            email=auth_settings.APP_LOGIN,
            nickname=auth_settings.APP_LOGIN.split("@")[0],
            password=encrypted_pass,
        )
    except Exception as err:
        await app_logger.error(f"{__name__}: {err}")
        raise ApplicationError("system user credentials error")

    auth_header: str = ""
    async with AsyncClient(timeout=timeout) as log_in_client:
        try:
            url = auth_settings.get_login_v1_path
            resp = await log_in_client.post(url, json=login_data.model_dump())
            resp.raise_for_status()
        except (
            httpx.TimeoutException,
            httpx.HTTPStatusError,
            httpx.HTTPError,
        ) as err:
            await app_logger.error(f"{__name__}: {err}")
            raise ApplicationError("remote server conversation error")
        print(resp.content)
        print(resp.status_code)
        auth_header = resp.headers.get("Authorization")
        if auth_header is None:
            await app_logger.error(f"{__name__}: Authorization header not found")

    headers = {"Authorization": auth_header}
    async with AsyncClient(timeout=timeout, headers=headers) as token_client:
        try:
            url = auth_settings.get_api_token_path
            resp = await token_client.post(url)
            resp.raise_for_status()
        except (
            httpx.TimeoutException,
            httpx.HTTPStatusError,
            httpx.HTTPError,
        ) as err:
            await app_logger.error(f"{__name__}: {err}")
            raise ApplicationError("remote server conversation error")

        try:
            response_data = resp.json()
            await app_logger.debug(f"{__name__}: token response {response_data}")
            return response_data["data"]["token"]
        except Exception as err:
            await app_logger.error(f"{__name__}: {err}")
            raise ApplicationError("serialization error")
