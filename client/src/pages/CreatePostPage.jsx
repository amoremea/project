import React, {useState} from 'react'
import { HomeNav } from './UI/Elements/HomeNav'
import '../styles/CreatePost.css'
import {useDispatch} from 'react-redux'
import { createPost } from '../redux/features/post/postSlice'

export const CreatePostPage = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <main className="main" id="main">
      <HomeNav />
      <div className='createPostContainer'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input className='titleCreatePost' type="text" placeholder='Заголовок' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <input className='textCreatePost' type="text" placeholder='Текст' value={text} onChange={(e) => setText(e.target.value)}/>
          <input type='file' className='uploadImgCreatePost' onChange={(e) => setImage(e.target.files[0])}/>
          <img src="" alt="" />
          <button onClick={submitHandler} className='uploadPost' >Создать пост</button>
          <button className='cancelPost' >Отмена</button>
        </form>
      </div>
    </main>
  )
}
