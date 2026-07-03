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

// --- Защита 1: проверка Referer ---
$allowedDomains = [
    'бетонноеполотно.рус',
    'xn--90aiayiacdcbbbi0bj.xn--p1acf',
    'localhost',
    '127.0.0.1',
];
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$refererHost = parse_url($referer, PHP_URL_HOST);
$refererAllowed = false;
foreach ($allowedDomains as $domain) {
    if ($refererHost === $domain || str_ends_with($refererHost, '.' . $domain)) {
        $refererAllowed = true;
        break;
    }
}
if (!empty($referer) && !$refererAllowed) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit();
}

// --- Защита 2: Rate limiting по IP ---
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ipHash   = md5($ip); // не храним реальный IP
$rateFile = sys_get_temp_dir() . '/rate_' . $ipHash . '.json';
$limit    = 5;   // максимум запросов
$window   = 3600; // за 1 час (секунды)
$now      = time();

$rateData = ['count' => 0, 'window_start' => $now];
if (file_exists($rateFile)) {
    $rateData = json_decode(file_get_contents($rateFile), true);
    if ($now - $rateData['window_start'] > $window) {
        // Окно истекло — сбрасываем
        $rateData = ['count' => 0, 'window_start' => $now];
    }
}

if ($rateData['count'] >= $limit) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Try again later.']);
    exit();
}

$rateData['count']++;
file_put_contents($rateFile, json_encode($rateData), LOCK_EX);

// --- Конфиг и PHPMailer ---
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

// --- Читаем данные ---
$rawData = file_get_contents('php://input');
$data    = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit();
}

$name     = trim($data['name'] ?? '');
$phone    = trim($data['phone'] ?? '');
$details  = trim($data['details'] ?? '');
$honeypot = trim($data['_hp'] ?? ''); // honeypot поле

// --- Защита 3: Honeypot ---
if (!empty($honeypot)) {
    // Бот заполнил скрытое поле — делаем вид что всё ок
    echo json_encode(['success' => true]);
    exit();
}

// --- Валидация ---
if (strlen($name) < 2 || strlen($phone) < 10) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed']);
    exit();
}

// --- Отправка письма ---
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
