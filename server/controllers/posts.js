import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Если загружены файлы
        let fileName = '';
        if (req.files && req.files.image) {
            fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const filePath = path.join(__dirname, '..', 'uploads', fileName);

            // Перемещаем файл в папку uploads
            req.files.image.mv(filePath, (err) => {
                if (err) {
                    console.error('Ошибка при загрузке файла:', err);
                    return res.status(500).json({ message: 'Ошибка при загрузке файла' });
                }
            });
        }

        // Создаем пост с или без изображения
        const newPost = new Post({
            username: user.username,
            title,
            text,
            imgUrl: fileName,
            author: req.userId,
        });

        await newPost.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPost },
        });

        return res.json(newPost);
    } catch (error) {
        console.error('Ошибка при создании поста:', error);
        res.status(500).json({ message: 'Ошибка при создании поста' });
    }
};

// Get all posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort('-views');

        if (!posts.length) {
            return res.status(404).json({ message: 'Постов нет' });
        }

        return res.json({ posts, popularPosts });
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
        res.status(500).json({ message: 'Ошибка при получении постов' });
    }
};

// Get Post By Id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1},
        })
        return res.json(post);
    } catch (error) {
        console.error('Ошибка при получении поста:', error);
        res.status(500).json({ message: 'Ошибка при получении поста' });
    }
};

// Get My Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            })
        )

        return res.json(list)
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
        res.status(500).json({ message: 'Ошибка при получении постов' });
    }
};

// Remove Post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'Такого поста не существует' });
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: post._id }
        });

        return res.json({ message: 'Пост был удален' });
    } catch (error) {
        console.error('Ошибка при удалении поста:', error);
        res.status(500).json({ message: 'Ошибка при удалении поста' });
    }
};

// Update Post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        let fileName = '';
        if (req.files && req.files.image) {
            fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const filePath = path.join(__dirname, '..', 'uploads', fileName);
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()

        return res.json(post);
    } catch (error) {
        console.error('Ошибка при изменении поста:', error);
        res.status(500).json({ message: 'Ошибка при изменении поста' });
    }
};

// Get Post Comment
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}