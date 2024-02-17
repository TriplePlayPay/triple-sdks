from json import loads
from typing import TYPE_CHECKING, Optional, Any, Dict, Union
from urllib.parse import urljoin

from httpx import AsyncClient
from pydantic import BaseModel

from tripleplaypay_sdk.common import Response, Service

if TYPE_CHECKING:
    from tripleplaypay_sdk import TriplePlayPayClient

NewCharge = Union[
    'CardChargeRequest',
    'BankChargeRequest',
    'TerminalChargeRequest',
]


class ChargeService(BaseModel, Service):
    PATH: str = '/api/charge'

    api_client: 'TriplePlayPayClient'
    client: 'AsyncClient'

    async def create(self, bank_account: NewCharge) -> Response:
        response = await self.client.post(
            url=urljoin(self.api_client.config.base_url, ChargeService.PATH),
            content=bank_account.model_dump_json(),
            headers=self.api_client.headers,
        )

        return Response(**loads(response.content))


class CardChargeRequest(BaseModel):
    amount: str
    id: Optional[str]
    token: Optional[str]
    email: Optional[str]
    meta: Optional[Dict[str, Any]]
    address1: Optional[str]
    address2: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip: Optional[str]
    tip: Optional[str]
    cc: str
    mm: str
    yy: str
    cvv: str


class BankChargeRequest(BaseModel):
    amount: str
    id: Optional[str]
    token: Optional[str]
    email: Optional[str]
    meta: Optional[Dict[str, Any]]
    address1: Optional[str]
    address2: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip: Optional[str]
    tip: Optional[str]
    account_number: str
    routing_number: str
    type: Optional[str]


class TerminalChargeRequest(BaseModel):
    amount: str
    id: Optional[str]
    token: Optional[str]
    email: Optional[str]
    meta: Optional[Dict[str, Any]]
    address1: Optional[str]
    address2: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip: Optional[str]
    tip: Optional[str]
    laneId: str
    surcharge: str
