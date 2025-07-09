<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

function sendContactMailWithPHPMail(array $data):bool|string {
    if(empty($_ENV['MAIL_TO'])){
        return 'Please provide destination email';
    }
    $to=$_ENV['MAIL_TO'];
    $subject =$data['subject']??"Thông tin đăng ký khóa học AI";

    $message = <<<EOD
Họ tên: {$data['name']}
Email: {$data['email']}
Số điện thoại: {$data['phone']}
Vị trí: {$data['position']}
Công ty: {$data['company']}
EOD;


    $headers = "From: SuriShop Contact <no-reply@surishops.com>\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $parameters = "-f no-reply@surishops.com";
    
    if (mail($to, $subject, $message, $headers, $parameters)) {
        return true;
    } else {
        return "Không gửi được email. Hãy kiểm tra cấu hình máy chủ.";
    }
}