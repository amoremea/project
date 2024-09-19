import React, { useCallback, useEffect, useState} from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { HomeNav } from './UI/Elements/HomeNav';
import Moment from 'react-moment';
import '../styles/Post.css'

import axios from '../utils/axios';
import { Link, useParams } from 'react-router-dom';


export const PostPage = () => {
  const [post, setPost] = useState(null)
  const params = useParams()

  const fetchPost = useCallback(async() =>{
    const {data} = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if(!post){
    return(
      <main className='main' id="main">Постов не существует</main>
    )
  }

  return (
    <main className="main" id="main">
      <HomeNav />
      <Link to='/'>
      <button>Назад</button>
      </Link>
      <div className='postContainer'>
            <div className='postItemHeader'>
                <div>{ post.username }</div>
                <div className='postDate'> <Moment date={post.createdAt} format='D MMM YYYY H:mm'/></div>
            </div>
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
    </main>
  )
}
