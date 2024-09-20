import React, {useState, useCallback, useEffect} from 'react'
import '../styles/CreatePost.css'
import {useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios';
import { HomeNav } from './UI/Elements/HomeNav';
import { updatePost } from '../redux/features/post/postSlice'

export const EditPostPage = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async() =>{
    const {data} = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const clearFormHandler = () =>{
    setText('')
    setTitle('')
  }

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id',  params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/me')
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
          <input type='file' className='uploadImgCreatePost' 
          onChange={
            (e) => {
              setNewImage(e.target.files[0])
              setOldImage('')
            }
          }/>
          <div>
            {oldImage && (
              <img src={`http://localhost:3002/${oldImage}`} alt='image' />
            )}
            {newImage && (
              <img src={URL.createObjectURL(newImage)} alt='image' />
            )}
          </div>
          <button onClick={submitHandler} className='uploadPost' >Изменить пост</button>
          <button onClick={clearFormHandler} className='cancelPost' >Отмена</button>
        </form>
      </div>
    </main>
  )
}
