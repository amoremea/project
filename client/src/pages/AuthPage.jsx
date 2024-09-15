import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export const AuthPage = () => {
  // State for user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation after successful login/register

  useEffect(() => {
    if (status) {
      toast(status);
      if (isAuth) {
        navigate('/'); // Redirect to home or other page upon successful auth
      }
    }
  }, [status, isAuth, navigate]);

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, password }));
    setUsername('');
    setPassword('');
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  // State for form toggle
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <main className="main" id="main">
      <div className="authContainer" id="authContainer">

        <div id="toggleChoiceOnSignUp" className={`toggleChoiceOnSignUp toggleChoice ${!active ? 'active' : ''}`}>
          <h1>Нет аккаунта?</h1>
          <button onClick={handleClick}>Зарегистрироваться</button>
        </div>

        <div id="toggleChoiceOnSignIn" className={`toggleChoiceOnSignIn toggleChoice ${active ? 'active' : ''}`}>
          <h1>Уже зарегистрированы?</h1>
          <button onClick={handleClick} className="login" id="adaptiveLogin">Войти</button>
        </div>

        <div id="signIn" className={`signIn formContainer ${!active ? 'active' : ''}`}>
          <form className="formSignIn" id="formSignIn" onSubmit={handleSubmitLogin}>
            <h1>Вход</h1>
            <input
              type="text"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="choiceHolder">
              <button type="submit">Войти</button>
              <button type="button" className="register" id="adaptiveRegister" onClick={handleClick}>
                Зарегистрироваться
              </button>
            </div>
            <a href="#">Забыли пароль?</a>
          </form>
        </div>

        <div id="signUp" className={`signUp formContainer toggleIntoContainer ${active ? 'active' : ''}`}>
          <form className="formSignUp" id="formSignUp" onSubmit={handleSubmitRegister}>
            <h1>Создайте аккаунт</h1>
            <input
              className="nickName"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите ник"
            />
            <input
              className="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
            <div className="choiceHolder">
              <button type="submit">Зарегистрироваться</button>
              <button type="button" className="login" id="adaptiveLogin" onClick={handleClick}>
                Уже зарегистрированы?
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
