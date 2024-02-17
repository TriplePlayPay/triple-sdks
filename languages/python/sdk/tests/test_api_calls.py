from asyncio import run
from json import dumps

import pytest
from pytest_httpx import HTTPXMock
from tripleplaypay_sdk import Response, NewBankAccount, BankAccountService, \
    TriplePlayPayClient


@pytest.mark.asyncio
def test_bank_account_create(httpx_mock: HTTPXMock):
    httpx_mock.add_response(
        status_code=200,
        headers={'content-type': 'application/json'},
        content=dumps(Response(
            id='test_bank_account_create',
            status='Success',
            method='GET',
            message={},
        ).model_dump()).encode('utf-8'),
    )

    nba = NewBankAccount(
        routing_number='123',
        account_number='456',
        email='email@server.localhost'
    )

    service = BankAccountService(
        api_client=TriplePlayPayClient(
            config=TriplePlayPayClient.Config(
                bearer_token='token'
            )))

    response = run(service.create(nba))
    assert 'test_bank_account_create' == response.id

    request = httpx_mock.get_request(url='/api/bankaccount')
    print(request.url)
    print(request.method)
    print(request.content)
    print(request.headers)
    print('authorization' in request.headers)
    print(request.headers.get('authorization', None))
