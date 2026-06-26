<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$configFile = __DIR__ . '/../config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Config not found']);
    exit();
}
require $configFile;

require __DIR__ . '/../PHPMailer/Exception.php';
require __DIR__ . '/../PHPMailer/PHPMailer.php';
require __DIR__ . '/../PHPMailer/SMTP.php';

$rawData = file_get_contents('php://input');
$data    = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit();
}

$name    = trim($data['name'] ?? '');
$phone   = trim($data['phone'] ?? '');
$details = trim($data['details'] ?? '');

if (strlen($name) < 2 || strlen($phone) < 10) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed']);
    exit();
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $config['smtp_port'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($config['email_from'], 'Заявка с сайта — Бетонное полотно');
    $mail->addAddress($config['email_1']);
    if (!empty($config['email_2'])) {
        $mail->addAddress($config['email_2']);
    }

    $mail->isHTML(true);
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    =
        '<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;">'
        . '<h2 style="color:#1e3a5f;">Новая заявка с сайта</h2>'
        . '<p><b>Имя:</b> ' . htmlspecialchars($name) . '</p>'
        . '<p><b>Телефон:</b> <a href="tel:' . htmlspecialchars($phone) . '">'
        . htmlspecialchars($phone) . '</a></p>'
        . (!empty($details)
            ? '<p><b>Детали:</b><br>' . nl2br(htmlspecialchars($details)) . '</p>'
            : '')
        . '<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">'
        . '<p style="color:#999;font-size:12px;">Письмо отправлено автоматически с сайта</p>'
        . '</div>';

    $mail->AltBody =
        "Новая заявка с сайта\n\n"
        . "Имя: $name\n"
        . "Телефон: $phone\n"
        . (!empty($details) ? "Детали: $details\n" : '');

    $mail->send();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success'    => false,
        'mail_error' => $mail->ErrorInfo,
    ]);
}
