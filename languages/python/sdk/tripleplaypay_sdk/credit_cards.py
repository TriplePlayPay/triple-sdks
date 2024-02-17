from json import loads
from typing import TYPE_CHECKING, Optional
from urllib.parse import urljoin

from httpx import AsyncClient
from pydantic import BaseModel

from tripleplaypay_sdk.common import Response, Service

if TYPE_CHECKING:
    from tripleplaypay_sdk import TriplePlayPayClient


class NewCreditCard(BaseModel):
    cc: str
    cvv: Optional[str]
    mm: str
    yy: str
    email: Optional[str]


class CreditCardService(BaseModel, Service):
    PATH: str = '/api/card'

    api_client: 'TriplePlayPayClient'
    client: 'AsyncClient'

    async def create(self, bank_account: NewCreditCard) -> Response:
        response = await self.client.post(
            url=urljoin(self.api_client.config.base_url, CreditCardService.PATH),
            content=bank_account.model_dump_json(),
            headers=self.api_client.headers,
        )

        return Response(**loads(response.content))
