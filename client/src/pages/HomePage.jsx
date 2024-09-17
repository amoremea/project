import React, { useEffect } from 'react'
import '../styles/Post.css'
import { HomeNav } from './UI/Elements/HomeNav';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice';
import { PopularPosts } from './UI/Elements/PopularPosts';
import { PostItem } from './UI/Elements/PostItem';

export const HomePage = ({ children }) => {
  const dispatch = useDispatch()
  const {posts, popularPosts} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  useEffect(() => {
    console.log('Posts:', posts);
    console.log('Popular Posts:', popularPosts);
  }, [posts, popularPosts]);

  if (!posts || !posts.length) {
    return (
      <main className="main" id="main">
        <HomeNav />
        <div className='postContainer'>
          Постов не существует
        </div>
      </main>
    );
  }

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
        <div className='popularPosts'>
          <div>Популярное</div>
          {popularPosts?.map((post, idx) =>(
            <PopularPosts key={idx} post={post}/>
          ))}
        </div>
      </div>
    </main>
  )
}