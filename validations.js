import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Вы ввели адрес почты неверно').isEmail(),
    body('password', 'Пароль должен быть 8-50 символов').isLength({ min: 8 }),
];

export const registerValidation = [
    body('email', 'Вы ввели адрес почты неверно').isEmail(),
    body('password', 'Пароль должен быть 8-50 символов').isLength({ min: 8 }),
    body('nick', 'Ник не уникален, либо вы ввели пустую строку').isLength({ min: 1 }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];

export const postCreateValidation = [
    body('tags').optional().isString(),
    body('title', 'Введите краткое описание вашей истории, чтобы заинтересовать пользователей!').isLength({ min: 1 }).isString(),
    body('text', 'Поделитесь своей историей со всеми пользователями WH!').isLength({ min: 1 }).isString(),
];