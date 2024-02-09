import React from 'react'
import { Link, NavLink } from "react-router-dom";


export const HomePage = ({ children }) => {
  return (
    <main className="main" id="main">
      <ul className='contentMenu'>
        <li>
          <NavLink
            to={'/'}
            href='/'
          >
            <button>News</button>
          </NavLink>
        </li>
        <li><button id='contentRecomendations'>Recomendations</button></li>
        <li><button id='contentLikes'>Likes</button></li>
        <li><button id='contentDislikes'>Dislikes</button></li>
      </ul>
      <div className='content' id ='content'>
        
      </div>
    </main>
  )
}
