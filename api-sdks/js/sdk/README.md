# Triple Play Pay Javascript SDK

## Example usage:

```javascript
let triple = require('@tripleplaypay/sdk')
let client = triple.client({ bearerToken: 'token' });
let response = await client.createCreditCard({
    cc: '',
    cvv: '',
    mm: '',
    yy: '',
    email: '',
});
```


## API docs

for all possible api usage, see [the OpenAPI spec](../../../openapi/Triple-OpenAPI.yaml).

You can access the latest version of it here: https://github.com/TriplePlayPay/triple-sdks/blob/main/openapi/Triple-OpenAPI.yaml

## Packaging

this package is provided as `cjs` with typescript bindings.
To use from an `esm` package, simply set your `package.json` "type" field to `module`:

```json
{
  "type": "module"
}
```

and import the SDK like so:

```typescript
import * as triple from '@tripleplaypay/sdk'
```

## Support
