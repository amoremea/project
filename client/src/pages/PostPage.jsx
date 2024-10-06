import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HomeNav } from './UI/Elements/HomeNav'
import '../styles/Post.css'
import { removePost } from '../redux/features/post/postSlice'
import { CommentItem } from './UI/Elements/CommentItem'
import { createComment } from '../redux/features/comment/commentSlice'
import { getPostComments } from '../redux/features/comment/commentSlice'
import Moment from 'react-moment'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

import axios from '../utils/axios'

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {
      try {
          dispatch(removePost(params.id))
          toast('Пост был удален')
          navigate('/posts')
      } catch (error) {
          console.log(error)
      }
  }

  const handleSubmit = () => {
      try {
          const postId = params.id
          dispatch(createComment({ postId, comment }))
          setComment('')
      } catch (error) {
          console.log(error)
      }
  }

  const fetchComments = useCallback(async () => {
    try {
        dispatch(getPostComments(params.id))
    } catch (error) {
        console.log(error)
    }
}, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`)
      setPost(data)
  }, [params.id])

  useEffect(() => {
      fetchPost()
  }, [fetchPost])

  useEffect(() => {
      fetchComments()
  }, [fetchComments])

  if (!post) {
    return (
        <div className='text-xl text-center text-white py-10'>
            Загрузка...
        </div>
    )
  }

  return (
    <main className="main" id="main">
      <HomeNav />
      <Link to='/'>
        <button>Назад</button>
      </Link>
      {
        post && user?._id === post.author && (
          <div>
            <button>
              <Link to={`/${params.id}/edit`}>
                <AiTwotoneEdit />
              </Link>
            </button>
            <button onClick={removePostHandler}>
              <AiFillDelete />
            </button>
          </div>
        )
      }
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
      <div className='comments'>
          <form onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder='comment' value={comment} onChange={e => setComment(e.target.value)}/>
              <button type='submit' onClick={handleSubmit}>Отправить</button>
          </form>
      </div>
      {comments?.map((cmt) => (
        <CommentItem key={cmt._id} cmt={cmt} /> 
      ))}
    </main>
  );
};
