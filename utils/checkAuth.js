import jwt from 'jsonwebtoken';

export default (req, res, next) =>{

    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');

    if (token) {
        try {
            const decoded = jwt.verify(token, '92c3556b9e4647c9e5d09cb9d643bd3c');

            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};