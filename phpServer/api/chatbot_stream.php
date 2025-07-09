<?php
require_once '../services/detect_language.php';
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// SSE headers
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

if (function_exists('apache_setenv')) {
    apache_setenv('no-gzip', '1');
}
ini_set('zlib.output_compression', '0');
ini_set('output_buffering', 'off');
ini_set('implicit_flush', 1);

while (ob_get_level()) ob_end_clean();
ob_implicit_flush(true);


// Nhận dữ liệu từ client
$raw = file_get_contents('php://input');
error_log("Raw input: $raw");

$input = json_decode($raw, true);
error_log("Parsed input: " . json_encode($input));

if (!isset($input['message']) || trim($input['message']) === '') {
    http_response_code(400);
    echo "data: Error: empty message\n\n";
    flush();
    exit;
}

$userMessage = $input['message'];
$apiKey = $_ENV['OPENAI_API_KEY'] ?? null;

if (!$apiKey) {
    error_log("Missing OPENAI_API_KEY");
    echo "data: Error: Missing OpenAI API key\n\n";
    flush();
    exit;
}

$model = $_ENV['API_MODEL'] ?? "gpt-4.1-nano";
$lang = detectLanguage($userMessage);
error_log("Detected language: $lang");

$dataPath = $lang === 'vi' ? '../static/vi.json' : '../static/en.json';
$data = json_decode(file_get_contents($dataPath), true);

if (!$data) {
    error_log("Failed to load $dataPath");
    echo "data: Error: Failed to load reference data\n\n";
    flush();
    exit;
}

$referenceData = json_encode($data, JSON_UNESCAPED_UNICODE);

$prompt = $lang === 'vi'
    ? "Bạn là một trợ lý AI thông minh của Suri Technologies.

    Chỉ sử dụng thông tin bên dưới để trả lời câu hỏi của người dùng.

    ❗ Nếu không tìm thấy thông tin phù hợp, hãy lịch sự từ chối trả lời.

    ❗ *Bắt buộc phải trả lời bằng đúng ngôn ngữ mà người dùng sử dụng trong câu hỏi.*

    Tuyệt đối không phỏng đoán, suy diễn hay bịa đặt thông tin ngoài dữ liệu tham chiếu.

    Thông tin tham khảo: $referenceData"
    : "You are an intelligent AI assistant of Suri Technologies.

    Only use the information below to answer user questions.

    ❗ Your task is to strictly answer in **English** if the user’s question is in English. 

    Do not respond in Vietnamese, even if the reference contains Vietnamese content.

    ❗ If relevant information is not found, politely say you don't know.

    ❗ Never speculate or hallucinate information. Just stick to the data.

    Reference data: $referenceData";

$payload = [
    'model' => $model,
    'messages' => [
        ['role' => 'system', 'content' => $prompt],
        ['role' => 'user', 'content' => $userMessage]
    ],
    'temperature' => 0.7,
    'stream' => true,
];

error_log("Sending payload to OpenAI");

$headers = [];
$ch = curl_init('https://api.openai.com/v1/chat/completions');

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => false,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey",
    ],
    CURLOPT_HEADERFUNCTION => function($ch, $header) use (&$headers) {
        $parts = explode(":", $header, 2);
        if (count($parts) == 2) {
            $headers[strtolower(trim($parts[0]))] = trim($parts[1]);
        }
        return strlen($header);
    },
    CURLOPT_WRITEFUNCTION => function ($ch, $chunk) {
        $lines = explode("\n", $chunk);
        foreach ($lines as $line) {
            $trimmed = trim($line);
            if ($trimmed === '' || !str_starts_with($trimmed, 'data:')) continue;

            $jsonData = substr($trimmed, 5); // remove 'data: '
            $parsed = json_decode($jsonData, true);
            if (!is_array($parsed)) continue;

            $delta = $parsed['choices'][0]['delta'] ?? null;
            $finish = $parsed['choices'][0]['finish_reason'] ?? null;

            if ($finish === 'stop') {
                echo "event: done\ndata: [DONE]\n\n";
                @ob_flush(); flush();
                continue;
            }

            if (!empty($delta['content'])) {
                $text = $delta['content'];
                echo "data: $text\n\n";
                @ob_flush(); flush();
            }
        }
        return strlen($chunk);
    },
]);

$response = curl_exec($ch);

if ($response === false) {
    $error = curl_error($ch);
    error_log("cURL error: $error");
    echo "data: Error: Failed to contact OpenAI\n\n";
    flush();
    curl_close($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode === 429) {
    error_log("Rate limit exceeded.");
    $retry = $headers['retry-after'] ?? 'unknown';
    echo "data: Error: Rate limit exceeded. Please wait $retry seconds.\n\n";
    flush();
    curl_close($ch);
    exit;
}

if ($httpCode !== 200) {
    error_log("Unexpected HTTP status: $httpCode");
    echo "data: Error: OpenAI API error. HTTP code $httpCode\n\n";
    flush();
    curl_close($ch);
    exit;
}

curl_close($ch);
error_log("OpenAI stream completed.");
