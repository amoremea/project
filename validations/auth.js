import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Вы ввели адрес почты неверно').isEmail(),
    body('password', 'Пароль должен быть 8-50 символов').isLength({ min: 8 }),
    body('nick', 'Ник не уникален, либо вы ввели пустую строку').isLength({ min: 1 }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];