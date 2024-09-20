import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import '../styles/Me.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PostItem } from './UI/Elements/PostItem';

export const MePage = () => {
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation after successful login/register

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth');
    }
  }, [isAuth, navigate]); // Add `isAuth` and `navigate` to the dependency array

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы');
    navigate('/');
  };

  const [posts, setPosts] = useState([]); // Изначально пустой массив

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data); // Сохраняем полученные данные в состояние
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]); // Добавляем эффект для получения постов

  return (
    <main className="main" id="main">
      <div className="meContainer" id="meContainer">
        <button onClick={logoutHandler}>Выйти</button>
        <div className="userPosts">
          {posts.length > 0 ? (
            posts.map((post, idx) => <PostItem post={post} key={idx} />)
          ) : (
            <span>Постов нет</span>
          )}
        </div>
      </div>
    </main>
  );
};
