<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

function sendContactMail(array $data): bool|string
{
    $requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_SECURE'];
    $missing = [];

    foreach ($requiredEnv as $key) {
        if (empty($_ENV[$key])) {
            $missing[] = $key;
        }
    }

    if (!empty($missing)) {
        $message = 'Thiếu biến môi trường: ' . implode(', ', $missing);
        error_log($message);
        return $message;
    }

    $mail = new PHPMailer(true);

    try {
        // Cấu hình SMTP
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->Port       = (int) $_ENV['SMTP_PORT'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'];
        $mail->Password   = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = $_ENV['SMTP_SECURE'] === 'true'
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;

        // Người gửi và nhận
        $mail->setFrom($_ENV['SMTP_USER'], 'Website Contact Form');
        $mail->addAddress($_ENV['SMTP_USER']);

        // Nội dung
        $mail->Subject = $data['subject'] ?? 'Thông tin liên hệ mới';
        $mail->Body = <<<EOT
Họ tên: {$data['name']}
Email: {$data['email']}
Số điện thoại: {$data['phone']}
Vị trí: {$data['position']}
Công ty: {$data['company']}
EOT;

        $mail->send();
        return true;
    } catch (Exception $e) {
        $errorMessage = "PHPMailer exception: {$e->getMessage()} | SMTP Error: {$mail->ErrorInfo}";
        error_log($errorMessage);
        return $errorMessage;
    }
}
