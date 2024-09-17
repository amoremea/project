import React from 'react'
import '../../../styles/Post.css'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

import Moment from 'react-moment'

export const PostItem = ({ post }) => {
    if(!post) {
        return <div className='postContainer'>
            Постов не существует
        </div>
    }
    return (
        <div className='postContainer'>
            <div>{ post.username }</div>
            <div> <Moment date={post.createdAt} format='D MMM YYYY H:mm'/></div>
            <div className='postContent'> 
                <h1>{ post.title }</h1>
                <h2>{ post.text }</h2>
            </div>
            <div>{post.imgUrl && (<img src={`http://localhost:3002/${post.imgUrl}`} alt='img'/>)}</div>
            <div className='iconsPosts'>
                <button>
                    <AiOutlineLike />
                </button>

                <button>
                    <FaRegComments />
                </button>
                <span className='viewersCounter'>{ post.views }</span>

                <button>
                    <BiRepost />
                </button>

                <button>
                    <FaEye />
                </button>
                <span className='viewersCounter'>{ post.comments?.length }</span>
            </div>
        </div>
    )
}