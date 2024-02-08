import express from 'express';
import multer from 'multer';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import UserModel from './models/user.js';

import checkAuth from './utils/checkAuth.js';

import user from './models/user.js';

import { userController, postController } from "./controllers/index.js";
import handleValidationErrors from './utils/handleValidationErrors.js';



mongoose
    .connect('mongodb+srv://admin:skibidipapa@cluster0.e7ahum7.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json()); //учим тело сервера использовать json

app.use("/uploads", express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, userController.login );
app.post('/auth/register', registerValidation, handleValidationErrors, userController.register);
app.get('/auth/me', checkAuth, userController.getMe)

app.post('/uploads', checkAuth, upload.single('image'), (req,res) => {
    res.json({
        url: '/uploads/${ req.file.originalname }',
    });
});

app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, postController.create);
app.delete('/posts/:id', checkAuth, postController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, postController.update);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
}); // задаем порт, если будет ошибка возвращаем ошибку, если все отлично, в терминале сервер ок

