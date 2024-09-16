import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../styles/Post.css'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { HomeNav } from './UI/Elements/HomeNav';

export const HomePage = ({ children }) => {
  return (
    <main className="main" id="main">
      <HomeNav />
      <div className='content' id ='content'>
      </div>
    </main>
  )
}