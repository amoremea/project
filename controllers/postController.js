import PostModel from '../models/post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user', ["nick", "avararUrl"] ).exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить посты',
        });
    }
};

export const getOne = async (req, res) => {

    const postId = req.params.id;

    PostModel.findOneAndUpdate(
    {
        _id: postId,
    },
    {
        $inc: { viewsCount: 1 },
    },
    {
        returnDocument: "after",
    }
    ).then((doc, err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            message: "Не удалось получить пост",
        });
    }

    if (!doc) {
        return res.status(404).json({
            message: "Пост не найден",
        });
    }

    res.json(doc);
    });
};

export const remove = async (req, res) => {

    const postId = req.params.id;

    PostModel.findOneAndDelete(
    {
        _id: postId,
    }
    ).then((doc, err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            message: "Не удалось удалить пост",
        });
    }

    if (!doc) {
        return res.status(404).json({
            message: "Пост не найден",
        });
    }

    res.json({
        succes: true,
    });
    });
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            tags: req.body.tags,
            title: req.body.title,
            text: req.body.text,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать пост',
        });
    }
};

export const update = async(req, res) => {

    const postId = req.params.id;

    PostModel.updateOne(
    {
        _id: postId,
    },
    {
        tags: req.body.tags,
        title: req.body.title,
        text: req.body.text,
    }
    ).then((doc, err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            message: "Не удалось обновить пост",
        });
    }

    if (!doc) {
        return res.status(404).json({
        message: "Пост не найден",
        });
    }

    res.json({
        succes: true,
    });
    });
};