# Triple Play Pay PHP SDK (PHP8+)

A minimal-dependency PHP8 SDK for the [Triple Play Pay API](https://www.tripleplaypay.com).  
Implements all endpoints from the [OpenAPI Spec](https://www.tripleplaypay.com/docs) with `curl` only.

## Installation

1. Clone this repository (or copy the files).
2. Run `composer install` to generate the autoloader.

```bash
composer install
```

## Basic Usage

```php
<?php

require 'vendor/autoload.php';

use TriplePlayPay\Client;

// Create the client with your API key
$client = new Client('https://tripleplaypay.com/api', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

// Example: Charge
$response = $client->charge([
    'amount' => '25.00',
    'cc' => '4111111111111111',
    'mm' => '12',
    'yy' => '25',
    'cvv' => '123',
    'email' => 'user@example.com'
]);

var_dump($response);
```

## CLI Usage
```shell
# Make it executable
chmod +x bin/tripleplaypay

# Show usage
./bin/tripleplaypay

# Example: Charge endpoint
./bin/tripleplaypay charge --apiKey=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --amount=25.00 --cc=4111111111111111 --mm=12 --yy=25 --cvv=123 --email=user@example.com
```