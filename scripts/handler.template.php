<?php
// handler.php — сгенерирован при сборке сайта. Не редактируйте вручную.
// Принимает POST с JSON { name, phone, details } и отправляет:
//   1) письмо через PHPMailer на email_1 и email_2 из ../config.php
//   2) сообщение в Telegram (telegram_token + telegram_chat_id)
// config.php лежит на один уровень выше public_html и недоступен из интернета.

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

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if (!$data || !isset($data['name']) || !isset($data['phone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit();
}

// Минимальная валидация и обрезка
$name    = mb_substr(trim((string)$data['name']), 0, 100);
$phone   = mb_substr(trim((string)$data['phone']), 0, 30);
$details = isset($data['details']) ? mb_substr(trim((string)$data['details']), 0, 2000) : '';

if ($name === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Empty fields']);
    exit();
}

$mailSent = false;
$mailError = null;
$tgSent = false;
$tgError = null;

// --- EMAIL через PHPMailer ---
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mailerLoaded = true;
foreach (['Exception.php', 'PHPMailer.php', 'SMTP.php'] as $f) {
    $p = __DIR__ . '/../PHPMailer/' . $f;
    if (!file_exists($p)) { $mailerLoaded = false; break; }
    require_once $p;
}

if ($mailerLoaded) {
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

        $fromAddr = !empty($config['email_from']) ? $config['email_from'] : $config['smtp_user'];
        $mail->setFrom($fromAddr, 'Заявка с сайта');

        if (!empty($config['email_1'])) $mail->addAddress($config['email_1']);
        if (!empty($config['email_2'])) $mail->addAddress($config['email_2']);

        $mail->isHTML(true);
        $mail->Subject = 'Новая заявка с сайта';
        $mail->Body    = "<b>Имя:</b> " . htmlspecialchars($name) . "<br>" .
                         "<b>Телефон:</b> " . htmlspecialchars($phone) . "<br><br>" .
                         "<b>Детали:</b><br>" . nl2br(htmlspecialchars($details));

        $mail->send();
        $mailSent = true;
    } catch (Exception $e) {
        $mailError = $mail->ErrorInfo;
    }
} else {
    $mailError = 'PHPMailer library not found';
}

// --- TELEGRAM ---
if (!empty($config['telegram_token']) && !empty($config['telegram_chat_id'])) {
    $text = "🔔 Новая заявка\n" .
            "Имя: {$name}\n" .
            "Телефон: {$phone}\n" .
            ($details !== '' ? "Детали: {$details}\n" : '');

    $tgUrl = "https://api.telegram.org/bot{$config['telegram_token']}/sendMessage";
    $ch = curl_init($tgUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
            'chat_id' => $config['telegram_chat_id'],
            'text'    => $text,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($resp !== false && $code === 200) {
        $tgSent = true;
    } else {
        $tgError = 'Telegram HTTP ' . $code;
    }
    curl_close($ch);
}

// Успех, если сработал хотя бы один канал
$success = $mailSent || $tgSent;
if (!$success) http_response_code(500);

echo json_encode([
    'success'    => $success,
    'mail_sent'  => $mailSent,
    'mail_error' => $mailError,
    'tg_sent'    => $tgSent,
    'tg_error'   => $tgError,
]);
