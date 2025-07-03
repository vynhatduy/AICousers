<?php
require_once '../services/send_contact_mail.php';

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

$result = sendContactMail($data);

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
