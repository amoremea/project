import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
// Функция которая регистрирует пользователя
export const register = async (req, res) => {
    try {
        const {username, password} = req.body
        const isUsed = await User.findOne({ username })

        if(isUsed){
            return res.status(402).json({
                message: 'Днное имя уже занято.',
            })
        }

        const salt = bcrypt.genSaltSync(10) // сложность хэширования пароля
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign({
            id: newUser._id,
        },
        process.env.JWT_SECRET, 
        {expiresIn: '30d'},
        ) 

        await newUser.save()

        res.json({
            newUser, message: 'Регистрация прошла успешно.',
        })
    } catch (error) {
        res.json({message: 'Ошибка при создании пользователя.'})
    }
}
// Login user
// Функция с помощью которой пользователь входит на свой аккаунт
export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({ username })
        if(!user) {
            return res.json({
                message: "Пользователь не найден."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.json({
                message: "Неверный пароль"
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET, 
        {expiresIn: '30d'},
    ) 

    res.json({
        token, user, message: 'Вы вошли в систему.',
    })

    } catch (error) {
        res.json({message: 'Ошибка при авторизации.'})
    }
}
// Get Me
// Функция которая проверяет есть ли токен у пользователя и действителен ли он
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return res.json({
                message: "Пользователь не найден."
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET, 
        {expiresIn: '30d'},
        ) 
        
        res.json({
            user, 
            token
        })
    } catch (error) {
        res.json({message: 'Нет доступа.'})
    }
}