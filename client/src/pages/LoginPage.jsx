import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import '../styles/Auth.css'


export const LoginPage = () => {
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

        <div className="toggleChoiceOnSignUp toggleChoice" id="toggleChoiceOnSignUp">

            <h1>Нет аккаунта?</h1>
            <NavLink
            to={"/auth/register"}
            href="/"
            >
            <button id="register">Зарегистрироваться</button>
            </NavLink>
        </div>

        <div className="signIn formContainer" id="signIn">
            <form className = "formSignIn" id = "formSignIn">

                <h1>Вход</h1>

                <input
                className="email"
                type="text"
                placeholder="Введите почту"
                />

                <input className="password" type="password" placeholder="Введите пароль" />

                <div className="choiceHolder">
                    <button> Войти </button>
                    <button className = "register" id="adaptiveRegister">Зарегистрироваться</button>
                </div>  

                <a href="#">Забыли пароль?</a>

            </form>
        </div>
      </div>
    </main>
  )
}
