<?php

namespace TriplePlayPay;

class Client
{
    private string $baseUrl;
    private Transport $transport;

    /**
     * @param string      $baseUrl e.g. "https://www.tripleplaypay.com"
     * @param string|null $apiKey  e.g. "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" (UUID4)
     */
    public function __construct(string $baseUrl, ?string $apiKey = null)
    {
        $this->baseUrl = rtrim($baseUrl, '/');
        // Pass the API key to Transport
        $this->transport = new Transport($apiKey);
    }

    /**
     * POST /bankaccount
     */
    public function bankaccount(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/bankaccount", $data);
    }

    /**
     * POST /card
     */
    public function card(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/card", $data);
    }

    /**
     * POST /charge
     */
    public function charge(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/charge", $data);
    }

    /**
     * POST /authorize
     */
    public function authorize(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/authorize", $data);
    }

    /**
     * POST /settle
     */
    public function settle(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/settle", $data);
    }

    /**
     * POST /refund
     */
    public function refund(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/refund", $data);
    }

    /**
     * POST /void
     */
    public function void(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/void", $data);
    }

    /**
     * GET /report
     */
    public function getReport(array $queryParams = []): mixed
    {
        // If the user provided query params, build the URL
        $url = "{$this->baseUrl}/v1/report";

        if (!empty($queryParams)) {
            $qs = http_build_query($queryParams);
            $url .= "?{$qs}";
        }
        return $this->transport->request('GET', $url);
    }

    /**
     * GET /subscription
     */
    public function getSubscription(array $queryParams = []): mixed
    {
        // If the user provided 'id' or other query params, build the URL
        $url = "{$this->baseUrl}/subscription";

        if (!empty($queryParams)) {
            $qs = http_build_query($queryParams);
            $url .= "?{$qs}";
        }

        return $this->transport->request('GET', $url);
    }

    /**
     * POST /subscription
     */
    public function createSubscription(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/subscription", $data);
    }

    /**
     * PATCH /subscription
     *
     * Note the $data argument should include the following:
     *  - subscription_id - str (UUID) - (mandatory)
     *  - reason - str - (optional)
     */
    public function cancelSubscription(array $data): mixed
    {
        return $this->transport->request('PATCH', "{$this->baseUrl}/subscription/cancel", $data);
    }

    /**
     * POST /enroll
     */
    public function enroll(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/enroll", $data);
    }

    /**
     * POST /capture
     */
    public function capture(array $data): mixed
    {
        return $this->transport->request('POST', "{$this->baseUrl}/capture", $data);
    }

    /**
     * GET /events
     */
    public function getEvents(): mixed
    {
        return $this->transport->request('GET', "{$this->baseUrl}/events/client/events");
    }

    /**
     * GET /payouts
     */
    public function getPayouts(): mixed
    {
        return $this->transport->request('GET', "{$this->baseUrl}/payouts");
    }
}