import React, { useEffect } from 'react'
import '../styles/Post.css'
import { HomeNav } from './UI/Elements/HomeNav';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice';
import { PostItem } from './UI/Elements/PostItem';

export const HomePage = () => {
  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  return (
    <main className="main" id="main">
      <HomeNav />
      <div className='content' id ='content'>
        <div>
          <div>Все посты</div>
          {posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}