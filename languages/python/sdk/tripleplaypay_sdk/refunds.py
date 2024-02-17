from json import loads
from typing import TYPE_CHECKING
from urllib.parse import urljoin

from httpx import AsyncClient
from pydantic import BaseModel

from tripleplaypay_sdk.common import Response, Service

if TYPE_CHECKING:
    from tripleplaypay_sdk import TriplePlayPayClient


class NewRefund(BaseModel):
    id: str


class RefundService(BaseModel, Service):
    PATH: str = '/api/refund'

    api_client: 'TriplePlayPayClient'
    client: 'AsyncClient'

    async def create(self, bank_account: NewRefund) -> Response:
        response = await self.client.post(
            url=urljoin(self.api_client.config.base_url, RefundService.PATH),
            content=bank_account.model_dump_json(),
            headers=self.api_client.headers,
        )

        return Response(**loads(response.content))
