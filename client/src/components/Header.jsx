import React from 'react';
import { GoPerson } from "react-icons/go"
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import '../styles/Header.css'
import { useDispatch, useSelector } from 'react-redux';
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify';

export const Header = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <header>
      <div className='header'>
          <div className='logo' id="logo">
              <h1>WHATHAPPENED</h1>
          </div>

          
          <div className='gamburgerHolder'>
              <button className='gamburger' id='gamburger'>
                  <RxHamburgerMenu />
              </button>
          </div>

          <ul className='navigation'>
              <li>
                <NavLink
                  to={'/'}
                  href='/'
                >
                  <button>Home</button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/friends'}
                  href='/'
                >
                  <button>Friends</button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/chat'}
                  href='/'
                >
                  <button>Chat</button>
                </NavLink>
              </li>
          </ul>
          
          <div className='authorizationHolder' id='authorizationHolder'>
              { isAuth ? ( 
                <NavLink
                to={"/me"}
                href="/"
              >
                <button className='authorization' id='authorization'>
                    <GoPerson />
                </button>
              </NavLink>
              ) : (
                <NavLink
                to={"/auth/login"}
                href="/"
              >
                <button className='authorization' id='authorization'>
                    <GoPerson />
                </button>
              </NavLink>
              )}
          </div>
      </div>
    </header>
  )
}
