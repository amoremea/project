import React from 'react'
import '../../../styles/Post.css'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { Link } from 'react-router-dom';

import Moment from 'react-moment'

export const PostItem = ({ post }) => {
    if(!post) {
        return <div className='postContainer'>
            Постов не существует
        </div>
    }
    return (
        <div className='postContainer'>
            <Link to={`/${post._id}`} style={{textDecoration: 'none', color: 'black'}}>
            <div className='postItemHeader'>
                <div>{ post.username }</div>
                <div className='postDate'> <Moment date={post.createdAt} format='D MMM YYYY H:mm'/></div>
            </div>
            </Link>
            <div className='postContent'> 
                <div className='postInfo'>
                    <span className='postTitle'>{ post.title }</span>
                    <span className='postText'>{ post.text }</span>
                </div>
                <div>{post.imgUrl && (<img src={`http://localhost:3002/${post.imgUrl}`} alt='img'/>)}</div>
            </div>
            <div className='iconsPosts'>
                <button className='postContainerLikes'>
                    <AiOutlineLike />
                    <span className='likesCounter'>0</span>
                </button>

                <button className='postContainerViews'>
                    <FaRegComments />
                    <span className='commentsCounter'>{ post.comments?.length || 0 }</span>
                </button>

                <button>
                    <BiRepost />
                </button>
                
                <div className='postContainerViews'>
                    <FaEye />
                    <span className='viewersCounter'>{ post.views }</span>
                </div>
            </div>
        </div>
    )
}