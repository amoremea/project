import React from 'react'
import '../../../styles/Post.css'
import img from '../../../images/i.jpg';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

export const PopularPosts = ({post}) => {
  return (
    <div className='postContainer'>
        <div>
            {post.title}
        </div>
    </div>
  )
}
