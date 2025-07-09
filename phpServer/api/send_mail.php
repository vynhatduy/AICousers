<?php

// log error in website for dev
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);


require_once '../services/mail.php';

// Bổ sung đoạn sau để lấy dữ liệu từ client
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

header('Content-Type: application/json');

// Kiểm tra dữ liệu có hợp lệ không
if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Dữ liệu gửi lên không hợp lệ.',
        'error' => 'Không thể phân tích JSON hoặc dữ liệu không phải dạng mảng.',
    ]);
    exit;
}

// valid data
$requiredFields = ['name', 'email', 'phone', 'position', 'company'];
$missingFields = array_filter($requiredFields, fn($field) => empty($data[$field]));

if (!empty($missingFields)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Thiếu thông tin bắt buộc.',
        'missing_fields' => $missingFields,
    ]);
    exit;
}

$result = sendContactMailWithPHPMail($data);

if ($result === true) {
    echo json_encode(['success' => true, 'message' => 'Gửi email thành công.']);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gửi email thất bại.',
        'error' => $result, // Trả về thông tin lỗi cụ thể
    ]);
}
