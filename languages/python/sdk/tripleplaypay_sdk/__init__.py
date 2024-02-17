from typing import Optional, Dict, List

from httpx import AsyncClient
from pydantic import BaseModel, ConfigDict

from tripleplaypay_sdk.bank_accounts import BankAccountService, NewBankAccount
from tripleplaypay_sdk.charges import (
    ChargeService,
    NewCharge,
    CardChargeRequest,
    BankChargeRequest,
    TerminalChargeRequest,
)
from tripleplaypay_sdk.credit_cards import CreditCardService, NewCreditCard
from tripleplaypay_sdk.refunds import RefundService, NewRefund
from tripleplaypay_sdk.common import Response, Service


class TriplePlayPayClient:
    def __init__(self, config: 'Config'):
        self.config: 'TriplePlayPayClient.Config' = config

        self.headers: Dict[str, str] = {
            'content-type': 'application/json',
            'authorization': 'bearer ' + self.config.bearer_token
        }

        if not self.config.client:
            self.config.client = AsyncClient(timeout=10)
        if not self.config.base_url:
            self.config.base_url = 'https://tripleplaypay.com'

        self.banks = BankAccountService(api_client=self)

    class Config(BaseModel):
        model_config = ConfigDict(arbitrary_types_allowed=True)

        bearer_token: str
        base_url: Optional[str] = None
        client: Optional[AsyncClient] = None


services: List[BaseModel] = [
    k[1] for k in locals().items()
    if isinstance(k[1], type)
       and issubclass(k[1], Service)
       and issubclass(k[1], BaseModel)]
# services[0].update_forward_refs
[s.update_forward_refs() for s in services]

# for service in locals().values():
#     if (isinstance(service, type) and
#             issubclass(service, Service) and
#             issubclass(service, BaseModel)):
#         service.model_rebuild()
