import Comment from "../models/Comment.js";
import Post from '../models/Post.js';

// Create Comment
export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;

        // Проверка на пустой комментарий
        if (!comment) {
            return res.status(400).json({ message: "Комментарий не может быть пустым" });
        }

        // Проверка существования поста
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Пост не найден" });
        }

        // Создание нового комментария
        const newComment = new Comment({
            comment,
            author: req.userId // Если есть информация о пользователе
        });
        await newComment.save();

        // Обновление поста с добавлением комментария
        post.comments.push(newComment._id);
        await post.save();

        // Возврат созданного комментария
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Ошибка при создании комментария:', error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};