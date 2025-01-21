## Operations:

| Method                            | HTTP request           | Description                                                                                      |
|-----------------------------------|------------------------|--------------------------------------------------------------------------------------------------|
| [**authorize**](#authorize)       | **POST** /authorize    | Used to verify funds when the total amount of the purchase is unknown.                           |
| [**callVoid**](#callVoid)         | **POST** /void         | A Void transaction can be used to back out a previous Sale transaction.                          |
| [**charge**](#charge)             | **POST** /charge       | Process payment or settle a previous charge. *card **bank ***terminal                            |
| [**client**](#client)             | **POST** /client       | Get/Set configuration parameters                                                                 |
| [**enroll**](#enroll)             | **POST** /enroll       | Enroll a new child merchant or retrieve status of pending submission.                            |
| [**refund**](#refund)             | **POST** /refund       | Credit/Refund transaction used to credit a cardholder for a previous transaction.                |
| [**report**](#report)             | **GET** /report        | Get transaction detail history                                                                   |
| [**settle**](#settle)             | **POST** /settle       | Same as sending a transactionId to charge, this method will settle an outstanding Authorization. |
| [**subscription**](#subscription) | **POST** /subscription | Setup a payment subscription or get details/history. Can also send to /api/charge                |
| [**terminal**](#terminal)         | **POST** /terminal     | Configure new Credit Card Terminal or get status of existing.                                    | |
