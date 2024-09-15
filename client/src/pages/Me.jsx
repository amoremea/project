import React from 'react'
import img from '../images/i.jpg';
import '../styles/Me.css'
import { useDispatch, useSelector } from 'react-redux';
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const MePage = () => {
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate(); // For navigation after successful login/register

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth/login')
    }
  })

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
    navigate('/')
  }

  return (
    <main className="main" id="main">
        <button onClick={logoutHandler}>Выйти</button>
        <div className="meContainer" id="meContainer">
            <img className="mePhoto" src={img} alt="photo"/>
            <h1 className='meStatus'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
            <div className='mePosts'>
              
            </div>
        </div>
    </main>
  )
}
