import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../../../styles/Post.css'

export const HomeNav = ({ children }) => {
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
           to={'/create'}
          >
          <button id='create'>Create</button>
          </NavLink>
        </li>
      </ul>
  )
}