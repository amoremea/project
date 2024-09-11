import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import '../styles/Auth.css';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      dispatch(registerUser({username,password}))
      setPassword("")
      setUsername("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    setActive(prevActive => !prevActive);
  };

  return (
    <main className="main" id="main">
      <div className="authContainer" id="authContainer">

        <div id="toggleChoiceOnSignUp" className={`toggleChoiceOnSignUp toggleChoice ${!active ? 'active' : ''}`}>
          <h1>Нет аккаунта?</h1>
            <button onClick={handleClick}>Зарегистрироваться</button>
        </div >

        <div id="toggleChoiceOnSignIn" className={`toggleChoiceOnSignIn toggleChoice ${active ? 'active' : ''}`}>

            <h1>Уже зарегистрированы?</h1>

            <button onClick={handleClick} className = "login" id = "adaptiveLogin">Войти</button>
            
        </div>

        <div id="signIn" className={`signIn formContainer ${!active ? 'active' : ''}` }>
          <form className="formSignIn" id="formSignIn" onSubmit={handleSubmit}>
            <h1>Вход</h1>
            <input
              className="email"
              type="text"
              placeholder="Введите почту"
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
              <NavLink to="/auth/register">
                <button type="button" className="register" id="adaptiveRegister">Зарегистрироваться</button>
              </NavLink>
            </div>
            <a href="#">Забыли пароль?</a>
          </form>
        </div>

        <div id="signUp" className={`signUp formContainer toggleIntoContainer ${active ? 'active' : ''}`}>
            <form className = "formSignUp" id = "formSignUp" onSubmit={(e) => e.preventDefault()}>

                <h1>Создайте аккаунт</h1>

                <input
                className="nickName"
                type="text"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите ник"
                />

                <input
                className="password"
                type="password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                />

                <div className="choiceHolder">
                    <button
                    type='submit'
                    onClick={handleSubmit}
                    >
                      Зарегистрироваться
                    </button>

                    <NavLink
                    to={"/auth/login"}
                    >
                    <button className = "login" id = "adaptiveLogin">Уже зарегистрированы?</button>
                    </NavLink>
                </div>

            </form>
        </div>
      </div>
    </main>
  );
};