import React from 'react';
import { GoPerson } from "react-icons/go"
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
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
              <li>
                <NavLink
                  to={'/search'}
                  href='/'
                >
                  <button>Search</button>
                </NavLink>
              </li>
          </ul>
          
          <div className='authorizationHolder' id='authorizationHolder'>
              <NavLink
                to={"/auth"}
                href="/"
              >
                <button className='authorization' id='authorization'>
                    <GoPerson />
                </button>
              </NavLink>
          </div>
      </div>
    </header>
  )
}
