from json import loads
from typing import TYPE_CHECKING, Optional
from urllib.parse import urljoin

from pydantic import BaseModel

from tripleplaypay_sdk.common import Response, Service

if TYPE_CHECKING:
    from tripleplaypay_sdk import TriplePlayPayClient


class NewBankAccount(BaseModel):
    routing_number: str
    account_number: str
    email: Optional[str]


class BankAccountService(BaseModel, Service):
    PATH: str = '/api/bankaccount'

    api_client: 'TriplePlayPayClient'

    async def create(self, bank_account: NewBankAccount) -> Response:
        response = await self.api_client.config.client.post(
            url=urljoin(self.api_client.config.base_url, BankAccountService.PATH),
            content=bank_account.model_dump_json(),
            headers=self.api_client.headers,
        )

        return Response(**loads(response.content))
