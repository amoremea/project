import React from 'react'
import { HomeNav } from './UI/Elements/HomeNav'
import '../styles/CreatePost.css'

export const CreatePostPage = () => {
  return (
    <main className="main" id="main">
      <HomeNav />
      <div className='createPostContainer'>
        <input className='titleCreatePost' type="text" placeholder='Заголовок' />
        <input className='textCreatePost' type="text" placeholder='Текст' />
        <img src="" alt="" />
        <button className='imgCreatePost' >Выбрать фотографию</button>
        <button className='uploadPost' >Создать</button>
      </div>
    </main>
  )
}
