import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'

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
      <div class="authContainer" id = "authContainer">

        <div class="toggleChoiceOnSignUp toggleChoice" id="toggleChoiceOnSignUp">
            <h1>Нет аккаунта?</h1>
            <button id="register">Зарегистрироваться</button>
        </div>

        <div class="toggleChoiceOnSignIn toggleChoice" id="toggleChoiceOnSignIn">
            <h1>Уже зарегистрированы?</h1>
            <button id = "login">Войти</button>
        </div>

        <div class="signIn formContainer" id="signIn">
            <form class = "formSignIn" id = "formSignIn">
                <h1>Вход</h1>
                <input
                class="email"
                type="text"
                placeholder="Введите почту"
                />
                <input class="password" type="password" placeholder="Введите пароль" />
                <div class="choiceHolder">
                    <button> Войти </button>
                    <button class = "register" id="adaptiveRegister">Зарегистрироваться</button>
                </div>  
                <a href="#">Забыли пароль?</a>
            </form>
        </div>
            
        <div class="signUp formContainer" id="signUp">
            <form class = "formSignUp" id = "formSignUp">
                <h1>Создайте аккаунт</h1>
                <input
                class="nickName"
                type="text"
                value = "username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите ник"
                />
                {/* <input class="email" type="text" placeholder="Введите почту" /> */}
                <input
                class="password"
                type="password"
                value = "password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                />
                <div class="choiceHolder">
                    <button onClick={handleSubmit}> Зарегистрироваться </button>
                    <button class = "login" id = "adaptiveLogin">Войти</button>
                </div>
            </form>
        </div>
      </div>
    </main>
  )
}
