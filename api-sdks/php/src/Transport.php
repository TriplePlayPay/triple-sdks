<?php

namespace TriplePlayPay;

class Transport
{
    /**
     * Send an HTTP request with cURL and return decoded JSON or raw string.
     *
     * @param string $method  HTTP method (GET, POST, etc.)
     * @param string $url     Full URL to the endpoint
     * @param array|null $body  Associative array for JSON request (or null)
     * @param array $headers Additional headers
     * @return mixed Decoded JSON or string on error
     * @throws TripleException
     */
    private ?string $apiKey = null;

    public function __construct(?string $apiKey = null)
    {
        $this->apiKey = $apiKey;
    }

    public function request(string $method, string $url, ?array $body = null, array $headers = [])
    {
        // Base headers: includes JSON content type
        $finalHeaders = [
            'Content-Type: application/json',
            'Accept: application/json'
        ];

        // If we have an API key, add it
        if (!empty($this->apiKey)) {
            $finalHeaders[] = 'Authorization: Bearer ' . $this->apiKey;
        }

        // Merge in any extra headers passed
        foreach ($headers as $h) {
            $finalHeaders[] = $h;
        }

        $ch = curl_init();
        $options = [
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => $finalHeaders,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_TIMEOUT => 30
        ];

        if ($body !== null) {
            $jsonBody = json_encode($body);
            if (false === $jsonBody) {
                throw new TripleException('Failed to JSON-encode body.');
            }
            $options[CURLOPT_POSTFIELDS] = $jsonBody;
        }

        curl_setopt_array($ch, $options);

        $responseRaw = curl_exec($ch);
        $error       = curl_error($ch);
        $statusCode  = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

        curl_close($ch);

        if ($responseRaw === false) {
            throw new TripleException('cURL error: ' . $error);
        }

        $decoded = json_decode($responseRaw, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            // Non-JSON or invalid JSON => return raw if success
            if ($statusCode >= 400) {
                throw new TripleException("HTTP $statusCode Error: $responseRaw");
            }
            return $responseRaw;
        }

        if ($statusCode >= 400) {
            $message = $decoded['message'] ?? 'Unknown error';
            throw new TripleException("HTTP $statusCode Error: $message");
        }

        return $decoded;
    }
}