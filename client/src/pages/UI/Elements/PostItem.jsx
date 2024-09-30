import React, {useState} from 'react'
import '../../../styles/Post.css'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../redux/features/comment/commentSlice.js';
import { CommentItem } from './CommentItem.jsx'
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

export const PostItem = ({ post }) => {
    const dispatch = useDispatch()
    const postId = post._id
    console.log(useParams(post._id))
    const [comment, setComment] = useState('')
    // const { comments } = useSelector((state) => state.comment)

    const handleSubmit = () => {
        try {
            const postId = post._id
            dispatch(createComment({postId, comment}))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    // const fetchComments = useCallback(async () => {
    //     try {
    //         dispatch(getPostComments(params.id))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [params.id, dispatch])

    // useEffect(() => {
    //     fetchComments()
    // }, [fetchComments])

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
            <div className='comments'>
                <form onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder='comment' value={comment} onChange={e => setComment(e.target.value)}/>
                    <button type='submit' onClick={handleSubmit}>Отправить</button>
                </form>
            </div>
            <div>
                {/* {comments?.map((cmt, idx) => (
                    <CommentItem key={idx} cmt={cmt} />
                ))} */}
            </div>
        </div>
    )
}