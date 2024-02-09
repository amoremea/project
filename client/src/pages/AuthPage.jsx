import React from 'react'

export const AuthPage = () => {
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
                <input class="email" type="text" placeholder="Введите почту" />
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
                <input class="nickName" type="text" placeholder="Введите ник" />
                <input class="email" type="text" placeholder="Введите почту" />
                <input class="password" type="password" placeholder="Введите пароль" />
                <div class="choiceHolder">
                    <button> Зарегистрироваться </button>
                    <button class = "login" id = "adaptiveLogin">Войти</button>
                </div>
            </form>
        </div>
      </div>
    </main>
  )
}
