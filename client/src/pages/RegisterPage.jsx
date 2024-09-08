import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import '../styles/Auth.css'


export const RegisterPage = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('') 
  const dispatch = useDispatch()

  const handleSubmit = () => {
    try {
      dispatch(registerUser({username,password}))
      setPassword("")
      setUsername("")
    } catch (error) {
      console.log(error)
    }
  }

  const [] = useState(false)
  return (
    <main className="main" id="main">
      <div className="authContainer" id = "authContainer">

        <div className="toggleChoiceOnSignIn toggleChoice toggleIntoContainer" id="toggleChoiceOnSignIn">

            <h1>Уже зарегистрированы?</h1>

            <NavLink
            to={"/auth/login"}
            href="/"
            >
            <button className = "login" id = "adaptiveLogin">Войти</button>
            </NavLink>
            
        </div>
            
        <div className="signUp formContainer toggleIntoContainer" id="signUp">
            <form className = "formSignUp" id = "formSignUp">

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
                    <button onClick={handleSubmit}> Зарегистрироваться </button>

                    <NavLink
                    to={"/auth/login"}
                    href="/"
                    >
                    <button className = "login" id = "adaptiveLogin">Войти</button>
                    </NavLink>
                </div>

            </form>
        </div>
      </div>
    </main>
  )
}
