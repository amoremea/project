import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../styles/Post.css'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

export const HomePage = ({ children }) => {
  return (
    <main className="main" id="main">
      <ul className='contentMenu'>
        <li>
          <NavLink
            to={''}
          >
            <button>News</button>
          </NavLink>
        </li>
        <li>
          <NavLink
           to={'/home/recomendations'}
          >
          <button id='contentRecomendations'>Recomendations</button>
          </NavLink>
        </li>
        <li>
          <NavLink
           to={'/home/contentLikes'}
          >
          <button id='contentLikes'>Likes</button>
          </NavLink>
          </li>
        <li>
          <NavLink
           to={'/home/contentdDislikes'}
          >
          <button id='contentDislikes'>Dislikes</button>
          </NavLink>
          </li>
      </ul>
      <div className='content' id ='content'>
      </div>
    </main>
  )
}