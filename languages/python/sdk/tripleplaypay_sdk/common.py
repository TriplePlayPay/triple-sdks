from abc import ABC
from typing import Any

from pydantic import BaseModel, ConfigDict


class Service(ABC):
    pass


class Response(BaseModel):
    model_config = ConfigDict(extra='ignore')

    id: str
    status: str
    method: str
    message: Any
