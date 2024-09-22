import jwt from 'jsonwebtoken';

// Проверка на авторизацию у пользователя
export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            // Проверка токена и декодирование
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Добавляем идентификатор пользователя в запрос
            req.userId = decoded.id;
            
            // Переход к следующему middleware
            next();
        } catch (error) {
            // Ошибка при проверке токена
            return res.status(401).json({
                message: 'Нет доступа.',
            });
        }
    } else {
        // Если токен отсутствует
        return res.status(401).json({
            message: 'Нет доступа',
        });
    }
};