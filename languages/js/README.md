# Triple Play Pay Javascript SDK

All URIs are relative to *https://www.tripleplaypay.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authorize**](ApiApi.md#authorize) | **POST** /authorize | Used to verify funds when the total amount of the purchase is unknown.
[**callVoid**](ApiApi.md#callVoid) | **POST** /void | A Void transaction can be used to back out a previous Sale transaction.
[**charge**](ApiApi.md#charge) | **POST** /charge | Process payment or settle a previous charge. *card **bank ***terminal
[**client**](ApiApi.md#client) | **POST** /client | Get/Set configuration parameters
[**enroll**](ApiApi.md#enroll) | **POST** /enroll | Enroll a new child merchant or retrieve status of pending submission.
[**refund**](ApiApi.md#refund) | **POST** /refund | Credit/Refund transaction used to credit a cardholder for a previous transaction.
[**report**](ApiApi.md#report) | **GET** /report | Get transaction detail history
[**settle**](ApiApi.md#settle) | **POST** /settle | Same as sending a transactionId to charge, this method will settle an outstanding Authorization.
[**subscription**](ApiApi.md#subscription) | **POST** /subscription | Setup a payment subscription or get details/history. Can also send to /api/charge
[**terminal**](ApiApi.md#terminal) | **POST** /terminal | Configure new Credit Card Terminal or get status of existing.
[**tokenize**](ApiApi.md#tokenize) | **POST** /tokenize | Create a token for later use.

<a name="authorize"></a>
# **authorize**
> [Response] authorize(amount, cc, mm, yy, cvv, opts)

Used to verify funds when the total amount of the purchase is unknown.

Used to verify funds when the total amount of the purchase is unknown.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let amount = "amount_example"; // String | The total transaction amount. This is the amount of funds to move on the card
let cc = "cc_example"; // String | Credit Card Number with or without dashes
let mm = "mm_example"; // String | 2 digit Month
let yy = "yy_example"; // String | 2 digit Year
let cvv = "cvv_example"; // String | Card Verification Value found on the card (CVV2, CVC2, CID)
let opts = { 
  'zipZipcode': "zipZipcode_example", // String | Postal code
  'ticket': "ticket_example", // String | Ticket Number used by POS
  'meta': null // Object | Optional user defined object to be returned with future response
};
apiInstance.authorize(amount, cc, mm, yy, cvv, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **amount** | **String**| The total transaction amount. This is the amount of funds to move on the card | 
 **cc** | **String**| Credit Card Number with or without dashes | 
 **mm** | **String**| 2 digit Month | 
 **yy** | **String**| 2 digit Year | 
 **cvv** | **String**| Card Verification Value found on the card (CVV2, CVC2, CID) | 
 **zipZipcode** | **String**| Postal code | [optional] 
 **ticket** | **String**| Ticket Number used by POS | [optional] 
 **meta** | [**Object**](.md)| Optional user defined object to be returned with future response | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="callVoid"></a>
# **callVoid**
> [Response] callVoid(id, opts)

A Void transaction can be used to back out a previous Sale transaction.

A Void transaction can be used to back out a previous Sale transaction.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let id = "id_example"; // String | Transaction ID of charged event
let opts = { 
  'ticket': "ticket_example", // String | Ticket Number used by POS
  'meta': null // Object | Optional user defined object to be returned with future response
};
apiInstance.callVoid(id, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Transaction ID of charged event | 
 **ticket** | **String**| Ticket Number used by POS | [optional] 
 **meta** | [**Object**](.md)| Optional user defined object to be returned with future response | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="charge"></a>
# **charge**
> [Response] charge(amount, terminal, cc, mm, yy, cvv, accountNumber, routingNumber, type, opts)

Process payment or settle a previous charge. *card **bank ***terminal

Process payment or settle a previous charge. *card **bank ***terminal

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let amount = "amount_example"; // String | The total transaction amount. This is the amount of funds to move on the card
let terminal = 1.2; // Number | Initiate a Credit Card Terminal transaction by its laneId or terminalId
let cc = "cc_example"; // String | Credit Card Number with or without dashes
let mm = "mm_example"; // String | 2 digit month
let yy = "yy_example"; // String | 2 digit year
let cvv = "cvv_example"; // String | Card Verification Value found on the card (CVV2, CVC2, CID)
let accountNumber = "accountNumber_example"; // String | Bank Account Number
let routingNumber = "routingNumber_example"; // String | Bank Routing Number
let type = "type_example"; // String | Options: checking, savings <code>default</code>: checking
let opts = { 
  'id': "id_example", // String | Transaction ID used to settle an authorized payment method (cc or bank info then not required)
  'zipZipcode': "zipZipcode_example", // String | Postal code
  'ticket': "ticket_example", // String | Ticket Number used by POS
  'items': [new TriplePlayPayApi.Items()], // [Items] | List of items for receipt and level3 data. <code><br>[[id, price, description, tax, options],]<br>[{\"id\": \"\", \"price\": \"\", \"description\": \"\", \"tax\": \"\", \"options\": \"\"},]</code> 
  'meta': null // Object | Optional user defined object to be returned with future response
};
apiInstance.charge(amount, terminal, cc, mm, yy, cvv, accountNumber, routingNumber, type, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **amount** | **String**| The total transaction amount. This is the amount of funds to move on the card | 
 **terminal** | **Number**| Initiate a Credit Card Terminal transaction by its laneId or terminalId | 
 **cc** | **String**| Credit Card Number with or without dashes | 
 **mm** | **String**| 2 digit month | 
 **yy** | **String**| 2 digit year | 
 **cvv** | **String**| Card Verification Value found on the card (CVV2, CVC2, CID) | 
 **accountNumber** | **String**| Bank Account Number | 
 **routingNumber** | **String**| Bank Routing Number | 
 **type** | **String**| Options: checking, savings &lt;code&gt;default&lt;/code&gt;: checking | 
 **id** | **String**| Transaction ID used to settle an authorized payment method (cc or bank info then not required) | [optional] 
 **zipZipcode** | **String**| Postal code | [optional] 
 **ticket** | **String**| Ticket Number used by POS | [optional] 
 **items** | [**[Items]**](Items.md)| List of items for receipt and level3 data. &lt;code&gt;&lt;br&gt;[[id, price, description, tax, options],]&lt;br&gt;[{\&quot;id\&quot;: \&quot;\&quot;, \&quot;price\&quot;: \&quot;\&quot;, \&quot;description\&quot;: \&quot;\&quot;, \&quot;tax\&quot;: \&quot;\&quot;, \&quot;options\&quot;: \&quot;\&quot;},]&lt;/code&gt;  | [optional] 
 **meta** | [**Object**](.md)| Optional user defined object to be returned with future response | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="client"></a>
# **client**
> [Response] client(opts)

Get/Set configuration parameters

Get/Set configuration parameters

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let opts = { 
  'timezone': "timezone_example", // String | Set your timezone
  'email': "email_example", // String | Set your notification email
  'callback': "callback_example", // String | Set your callback URL for notification of activity
  'tax': "tax_example" // String | Set your sales tax rate. (This helps simplify receipt generation and level3 detail)
};
apiInstance.client(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **timezone** | **String**| Set your timezone | [optional] 
 **email** | **String**| Set your notification email | [optional] 
 **callback** | **String**| Set your callback URL for notification of activity | [optional] 
 **tax** | **String**| Set your sales tax rate. (This helps simplify receipt generation and level3 detail) | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="enroll"></a>
# **enroll**
> [Response] enroll(dbaName, email, website, fedTxId, legalName, startDate, accountHolderName, accountType, accountNumber, routingNumber, ownershipType, businessDescription, businessPhoneNumber, businessAddress1, businessAddress2, businessCity, businessStateProvince, businessPostalCode, principleFirstName, principleLastName, principleSsn, principleDateOfBirth, principleAddressLine1, principleAddressLine2, principleCity, principleStateProvince, principlePostalCode, principleTitle, principleOwnershipPercentage, principlePhoneNumber, opts)

Enroll a new child merchant or retrieve status of pending submission.

Enroll a new child merchant or retrieve status of pending submission.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let dbaName = "dbaName_example"; // String | Doing Business As name. <code>*</code> Only field necessary for GET.
let email = "email_example"; // String | 
let website = "website_example"; // String | 
let fedTxId = "fedTxId_example"; // String | 
let legalName = "legalName_example"; // String | Legal Business Name
let startDate = "startDate_example"; // String | Business Start Date
let accountHolderName = "accountHolderName_example"; // String | 
let accountType = "accountType_example"; // String | 
let accountNumber = "accountNumber_example"; // String | Bank Account to deposit transactions. 
let routingNumber = "routingNumber_example"; // String | Bank Routing Number to deposit transactions.
let ownershipType = "ownershipType_example"; // String | [\"Sole Proprietor\", \"C-Corp Private\", \"C-Corp Public\", \"S-Corp Private\", \"S-Corp Public\", \"LLC Private\", \"LLC Public\", \"Not For Profit\", \"Partnership Private\", \"Partnership\", \"Government Agency\"]
let businessDescription = "businessDescription_example"; // String | 
let businessPhoneNumber = "businessPhoneNumber_example"; // String | 
let businessAddress1 = "businessAddress1_example"; // String | 
let businessAddress2 = "businessAddress2_example"; // String | 
let businessCity = "businessCity_example"; // String | 
let businessStateProvince = "businessStateProvince_example"; // String | 
let businessPostalCode = "businessPostalCode_example"; // String | 
let principleFirstName = "principleFirstName_example"; // String | Primary Owners First Name. Adding a number to the parameter allows for adding multiple principle owners. Example: <strong>2principle_first_name</strong>
let principleLastName = "principleLastName_example"; // String | Primary Owners Last Name.
let principleSsn = "principleSsn_example"; // String | Primary Owners Social Security Number
let principleDateOfBirth = "principleDateOfBirth_example"; // String | 
let principleAddressLine1 = "principleAddressLine1_example"; // String | 
let principleAddressLine2 = "principleAddressLine2_example"; // String | 
let principleCity = "principleCity_example"; // String | 
let principleStateProvince = "principleStateProvince_example"; // String | 
let principlePostalCode = "principlePostalCode_example"; // String | 
let principleTitle = "principleTitle_example"; // String | 
let principleOwnershipPercentage = "principleOwnershipPercentage_example"; // String | 
let principlePhoneNumber = "principlePhoneNumber_example"; // String | 
let opts = { 
  'callback': "callback_example", // String | Optional URL we will forward changes to status to with enrollment payload.
  'stockSymbol': "stockSymbol_example" // String | 
};
apiInstance.enroll(dbaName, email, website, fedTxId, legalName, startDate, accountHolderName, accountType, accountNumber, routingNumber, ownershipType, businessDescription, businessPhoneNumber, businessAddress1, businessAddress2, businessCity, businessStateProvince, businessPostalCode, principleFirstName, principleLastName, principleSsn, principleDateOfBirth, principleAddressLine1, principleAddressLine2, principleCity, principleStateProvince, principlePostalCode, principleTitle, principleOwnershipPercentage, principlePhoneNumber, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dbaName** | **String**| Doing Business As name. &lt;code&gt;*&lt;/code&gt; Only field necessary for GET. | 
 **email** | **String**|  | 
 **website** | **String**|  | 
 **fedTxId** | **String**|  | 
 **legalName** | **String**| Legal Business Name | 
 **startDate** | **String**| Business Start Date | 
 **accountHolderName** | **String**|  | 
 **accountType** | **String**|  | 
 **accountNumber** | **String**| Bank Account to deposit transactions.  | 
 **routingNumber** | **String**| Bank Routing Number to deposit transactions. | 
 **ownershipType** | **String**| [\&quot;Sole Proprietor\&quot;, \&quot;C-Corp Private\&quot;, \&quot;C-Corp Public\&quot;, \&quot;S-Corp Private\&quot;, \&quot;S-Corp Public\&quot;, \&quot;LLC Private\&quot;, \&quot;LLC Public\&quot;, \&quot;Not For Profit\&quot;, \&quot;Partnership Private\&quot;, \&quot;Partnership\&quot;, \&quot;Government Agency\&quot;] | 
 **businessDescription** | **String**|  | 
 **businessPhoneNumber** | **String**|  | 
 **businessAddress1** | **String**|  | 
 **businessAddress2** | **String**|  | 
 **businessCity** | **String**|  | 
 **businessStateProvince** | **String**|  | 
 **businessPostalCode** | **String**|  | 
 **principleFirstName** | **String**| Primary Owners First Name. Adding a number to the parameter allows for adding multiple principle owners. Example: &lt;strong&gt;2principle_first_name&lt;/strong&gt; | 
 **principleLastName** | **String**| Primary Owners Last Name. | 
 **principleSsn** | **String**| Primary Owners Social Security Number | 
 **principleDateOfBirth** | **String**|  | 
 **principleAddressLine1** | **String**|  | 
 **principleAddressLine2** | **String**|  | 
 **principleCity** | **String**|  | 
 **principleStateProvince** | **String**|  | 
 **principlePostalCode** | **String**|  | 
 **principleTitle** | **String**|  | 
 **principleOwnershipPercentage** | **String**|  | 
 **principlePhoneNumber** | **String**|  | 
 **callback** | **String**| Optional URL we will forward changes to status to with enrollment payload. | [optional] 
 **stockSymbol** | **String**|  | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="refund"></a>
# **refund**
> [Response] refund(amount, cc, mm, yy, cvv, opts)

Credit/Refund transaction used to credit a cardholder for a previous transaction.

Credit/Refund transaction used to credit a cardholder for a previous transaction.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let amount = "amount_example"; // String | The total transaction amount. This is the amount of funds to move on the card
let cc = "cc_example"; // String | Credit Card Number with or without dashes
let mm = "mm_example"; // String | 2 digit month
let yy = "yy_example"; // String | 2 digit year
let cvv = "cvv_example"; // String | Card Verification Value found on the card (CVV2, CVC2, CID)
let opts = { 
  'zipZipcode': "zipZipcode_example", // String | Postal code
  'ticket': "ticket_example", // String | Ticket Number used by POS
  'meta': null // Object | Optional user defined object to be returned with future response
};
apiInstance.refund(amount, cc, mm, yy, cvv, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **amount** | **String**| The total transaction amount. This is the amount of funds to move on the card | 
 **cc** | **String**| Credit Card Number with or without dashes | 
 **mm** | **String**| 2 digit month | 
 **yy** | **String**| 2 digit year | 
 **cvv** | **String**| Card Verification Value found on the card (CVV2, CVC2, CID) | 
 **zipZipcode** | **String**| Postal code | [optional] 
 **ticket** | **String**| Ticket Number used by POS | [optional] 
 **meta** | [**Object**](.md)| Optional user defined object to be returned with future response | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="report"></a>
# **report**
> [Response] report(opts)

Get transaction detail history

Get transaction detail history

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let opts = { 
  'start': "start_example", // String | Start of date range YYYY-MM-DD <code>*</code>defaults to that month
  'end': "end_example", // String | End of date range YYYY-MM-DD
  'filter': null, // Object | Filter results on any key value pair. <br>ex: <code>{\"method\":\"charge\"}</code> or nested <code>{\"message\":{\"details\": { \"Batch\": {\"HostItemID\": \"12\"}}}}</code>
  'timezone': "timezone_example" // String | Convert to timezone. <code>default</code>: tz set in client preferences
};
apiInstance.report(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **start** | **String**| Start of date range YYYY-MM-DD &lt;code&gt;*&lt;/code&gt;defaults to that month | [optional] 
 **end** | **String**| End of date range YYYY-MM-DD | [optional] 
 **filter** | [**Object**](.md)| Filter results on any key value pair. &lt;br&gt;ex: &lt;code&gt;{\&quot;method\&quot;:\&quot;charge\&quot;}&lt;/code&gt; or nested &lt;code&gt;{\&quot;message\&quot;:{\&quot;details\&quot;: { \&quot;Batch\&quot;: {\&quot;HostItemID\&quot;: \&quot;12\&quot;}}}}&lt;/code&gt; | [optional] 
 **timezone** | **String**| Convert to timezone. &lt;code&gt;default&lt;/code&gt;: tz set in client preferences | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="settle"></a>
# **settle**
> [Response] settle(id, opts)

Same as sending a transactionId to charge, this method will settle an outstanding Authorization.

Same as sending a transactionId to charge, this method will settle an outstanding Authorization.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let id = "id_example"; // String | Transaction ID of charged event
let opts = { 
  'ticket': "ticket_example", // String | Ticket Number used by POS
  'meta': null // Object | Optional user defined object to be returned with future response
};
apiInstance.settle(id, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Transaction ID of charged event | 
 **ticket** | **String**| Ticket Number used by POS | [optional] 
 **meta** | [**Object**](.md)| Optional user defined object to be returned with future response | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="subscription"></a>
# **subscription**
> [Response] subscription(amount, start, interval, email, payment, opts)

Setup a payment subscription or get details/history. Can also send to /api/charge

Setup a payment subscription or get details/history. Can also send to /api/charge

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let amount = "amount_example"; // String | Amount charged per cycle.
let start = "start_example"; // String | Start of subscription <code>YYYY-MM-DD</code>
let interval = "interval_example"; // String | <code>daily, weekly, monthly, yearly</code>
let email = "email_example"; // String | Subscribers email address
let payment = null; // Object | Same details as <code>charge</code>. (credit card only method supported currently)
let opts = { 
  'id': "id_example", // String | GET specific subscription by id.  AN empty call gets a list of all current subscriptions
  'cancelId': "cancelId_example", // String | Subscription ID you want to cancel
  'end': "end_example", // String | End of subscription. <code>YYYY-MM-DD</code> Empty means forever.
  'cycles': "cycles_example", // String | Set number of iterations. <code>end</code> will be calculated for you. 
  'frequency': 1.2 // Number | 1 means every interval, 2 would mean every other interval <code>*</code> Every other week would be 2
};
apiInstance.subscription(amount, start, interval, email, payment, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **amount** | **String**| Amount charged per cycle. | 
 **start** | **String**| Start of subscription &lt;code&gt;YYYY-MM-DD&lt;/code&gt; | 
 **interval** | **String**| &lt;code&gt;daily, weekly, monthly, yearly&lt;/code&gt; | 
 **email** | **String**| Subscribers email address | 
 **payment** | [**Object**](.md)| Same details as &lt;code&gt;charge&lt;/code&gt;. (credit card only method supported currently) | 
 **id** | **String**| GET specific subscription by id.  AN empty call gets a list of all current subscriptions | [optional] 
 **cancelId** | **String**| Subscription ID you want to cancel | [optional] 
 **end** | **String**| End of subscription. &lt;code&gt;YYYY-MM-DD&lt;/code&gt; Empty means forever. | [optional] 
 **cycles** | **String**| Set number of iterations. &lt;code&gt;end&lt;/code&gt; will be calculated for you.  | [optional] 
 **frequency** | **Number**| 1 means every interval, 2 would mean every other interval &lt;code&gt;*&lt;/code&gt; Every other week would be 2 | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="terminal"></a>
# **terminal**
> [Response] terminal(terminalId, opts)

Configure new Credit Card Terminal or get status of existing.

Configure new Credit Card Terminal or get status of existing.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let terminalId = "terminalId_example"; // String | Name of Terminal
let opts = { 
  'activationCode': "activationCode_example", // String | Activation Code on Terminal Screen
  'meta': null // Object | Optional user defined object to be returned with future response
};
apiInstance.terminal(terminalId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **terminalId** | **String**| Name of Terminal | 
 **activationCode** | **String**| Activation Code on Terminal Screen | [optional] 
 **meta** | [**Object**](.md)| Optional user defined object to be returned with future response | [optional] 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="tokenize"></a>
# **tokenize**
> [Response] tokenize(cc, mm, yy, cvv, accountNumber, routingNumber)

Create a token for later use.

Create a token for later use.

### Example
```javascript
import {TriplePlayPayApi} from 'triple_play_pay_api';

let apiInstance = new TriplePlayPayApi.ApiApi();
let cc = "cc_example"; // String | Credit Card Number with or without dashes
let mm = "mm_example"; // String | 2 digit Month
let yy = "yy_example"; // String | 2 digit Year
let cvv = "cvv_example"; // String | Card Verification Value found on the card (CVV2, CVC2, CID)
let accountNumber = "accountNumber_example"; // String | Bank Account Number
let routingNumber = "routingNumber_example"; // String | Bank Routing Number

apiInstance.tokenize(cc, mm, yy, cvv, accountNumber, routingNumber, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cc** | **String**| Credit Card Number with or without dashes | 
 **mm** | **String**| 2 digit Month | 
 **yy** | **String**| 2 digit Year | 
 **cvv** | **String**| Card Verification Value found on the card (CVV2, CVC2, CID) | 
 **accountNumber** | **String**| Bank Account Number | 
 **routingNumber** | **String**| Bank Routing Number | 

### Return type

[**[Response]**](Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

