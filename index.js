import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

import UserModel from './models/user.js';
import checkAuth from './utils/checkAuth.js';
import user from './models/user.js';
import * as userController from "./controllers/userController.js";

mongoose
    .connect('mongodb+srv://admin:skibidipapa@cluster0.e7ahum7.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json()); //учим тело сервера использовать json

app.post('/auth/login', userController.login );

app.post('/auth/register', registerValidation, userController.register);

app.get('/auth/me', checkAuth, userController.getMe)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
}); // задаем порт, если будет ошибка возвращаем ошибку, если все отлично, в терминале сервер ок

