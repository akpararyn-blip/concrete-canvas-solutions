<?php
// config.example.php — переименуйте в config.php и положите на уровень ВЫШЕ public_html.
// Этот файл недоступен из интернета.

$config = [
    // Telegram (необязательно — если пусто, отправка в TG отключена)
    'telegram_token'   => '',
    'telegram_chat_id' => '',

    // Email-получатели заявок
    'email_1' => '',
    'email_2' => '',

    // От кого приходит письмо (желательно, чтобы домен совпадал с сайтом)
    'email_from' => '',

    // SMTP
    'smtp_host' => 'smtp.spaceweb.ru',
    'smtp_user' => '',
    'smtp_pass' => '',
    'smtp_port' => 465, // 465 для SSL
];
