<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

function detectLanguage(string $text): string {
    $apiKey = $_ENV['DETECT_LANGUAGE_API_KEY'] ?? null;
    if (!$apiKey) {
    error_log(" Missing DETECT_LANGUAGE_API_KEY");
    echo "data: Error: Missing DETECT LANGUAGE API KEY\n\n";
    flush();
    exit;
}
    $payload = [
        'q' => $text,
    ];

    $ch = curl_init('https://ws.detectlanguage.com/0.2/detect');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($payload),
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $apiKey"
        ],
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error || !$response) {
        error_log("DetectLanguage API error: $error");
        return 'en'; // mặc định nếu lỗi
    }

    $data = json_decode($response, true);
    return $data['data']['detections'][0]['language'] ?? 'en';
}
