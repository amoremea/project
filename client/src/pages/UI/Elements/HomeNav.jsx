import React from 'react'
import { Link, NavLink } from "react-router-dom";

export const HomeNav = () => {
  return (
      <ul className='contentMenu'>
        <li>
          <NavLink
            to={'/'}
          >
            <button>News</button>
          </NavLink>
        </li>
        <li>
          <NavLink
           to={'/popular'}
          >
          <button id='popular'>Popular</button>
          </NavLink>
        </li>
        <li>
          <NavLink
           to={'/create'}
          >
          <button id='create'>Create</button>
          </NavLink>
        </li>
      </ul>
  )
}