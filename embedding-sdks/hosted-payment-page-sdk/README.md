# Hosted Payment Page SDK

This folder will contain the library that allows to create
an `<iframe>` tag for embedding [the hosted payment page][e.g.] for your merchant(s).

[e.g.]: https://sandbox.tripleplaypay.com/iframe/payment?params=eyJmcmVlRm9ybUFtb3VudCI6dHJ1ZSwicGF5bWVudFR5cGUiOiJjaGFyZ2UiLCJuZXdXaW5kb3ciOnRydWUsInBheW1lbnRPcHRpb25zIjpbImNyZWRpdF9jYXJkIl19Cg==

It is currently available here:

```html
<script src="https://tripleplaypay.com/static/js/triple.js"
        crossorigin="anonymous">
</script>
```

with the sandbox build available here:

```html

<script src="https://tripleplaypay.com/static/js/sandbox.js"
        crossorigin="anonymous">
</script>
```

The integrity attribute is not currently recommended as the version is updated in place.
However, you can generate one like so:

```bash
echo '<script src="https://tripleplaypay.com/static/js/sandbox.js"
        integrity="sha384-'$(curl -fSs 'https://tripleplaypay.com/static/js/sandbox.js' -w '' | openssl dgst -sha384 -binary | openssl base64)'"
        crossorigin="anonymous">
</script>'
```

as documented here: [https://tripleplaypay.com/iframe.html](https://tripleplaypay.com/iframe.html).
