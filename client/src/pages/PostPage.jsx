import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HomeNav } from './UI/Elements/HomeNav';
import '../styles/Post.css';
import { removePost } from '../redux/features/post/postSlice';
import { PostItem } from './UI/Elements/PostItem';

import axios from '../utils/axios';

export const PostPage = () => {
  const { user } = useSelector(state => state.auth);
  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Пост был удален');
      navigate('/me');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main" id="main">
      <HomeNav />
      <Link to='/'>
        <button>Назад</button>
      </Link>
      {
        post && user?._id === post.author && (
          <div>
            <button>
              <Link to={`/${params.id}/edit`}>
                <AiTwotoneEdit />
              </Link>
            </button>
            <button onClick={removePostHandler}>
              <AiFillDelete />
            </button>
          </div>
        )
      }
      {post && (
        <PostItem post={post} />
      )}
    </main>
  );
};
