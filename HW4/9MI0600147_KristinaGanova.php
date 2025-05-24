<?php
header('Content-Type: application/json; charset=utf-8');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$errors = [];

function utf8_strlen($string) {
    return mb_strlen($string, 'UTF-8');
}

$requiredFields = ['name', 'teacher', 'description', 'group', 'credits'];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || $data[$field] === '') {
        switch ($field) {
            case 'name':
                $errors['name'] = 'Името на учебния предмет е задължително поле';
                break;
            case 'teacher':
                $errors['teacher'] = 'Името на преподавателя е задължително поле';
                break;
            case 'description':
                $errors['description'] = 'Описанието е задължително поле';
                break;
            case 'group':
                $errors['group'] = 'Групата е задължително поле';
                break;
            case 'credits':
                $errors['credits'] = 'Кредитите са задължително поле';
                break;
        }
    }
}

if (isset($data['name'])) {
    $len = utf8_strlen($data['name']);
    if ($len < 2 || $len > 150) {
        $errors['name'] = "Името на учебния предмет трябва да е между 2 и 150 символа, а вие сте въвели $len";
    }
}

if (isset($data['teacher'])) {
    $len = utf8_strlen($data['teacher']);
    if ($len < 3 || $len > 200) {
        $errors['teacher'] = "Името на преподавателя трябва да е между 3 и 200 символа, а вие сте въвели $len";
    }
}

if (isset($data['description'])) {
    $len = utf8_strlen($data['description']);
    if ($len < 10) {
        $errors['description'] = "Описанието трябва да е с дължина поне 10 символа, а вие сте въвели $len";
    }
}

$validGroups = ['М', 'ПМ', 'ОКН', 'ЯКН'];
if (isset($data['group']) && !in_array($data['group'], $validGroups)) {
    $errors['group'] = 'Невалидна група, изберете една от М, ПМ, ОКН и ЯКН';
}

if (isset($data['credits'])) {
    if (!is_int($data['credits']) || $data['credits'] <= 0) {
        $errors['credits'] = 'Кредитите трябва да бъдат цяло положително число';
    }
}

if (empty($errors)) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'errors' => $errors], JSON_UNESCAPED_UNICODE);
}
?>