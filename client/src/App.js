import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { PostPage } from './pages/PostPage.jsx'
import { EditPostPage } from './pages/EditPostPage.jsx'
import { CreatePostPage } from './pages/CreatePostPage.jsx'
import { FriendsPage } from './pages/FriendsPage.jsx'
import { ChatPage } from "./pages/ChatPage.jsx"
import { AuthPage } from "./pages/AuthPage.jsx"
import { ToastContainer } from 'react-toastify'
import { MePage } from './pages/Me.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes> 
        <Route path='/' element={<HomePage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='create' element={<CreatePostPage />} />
        <Route path='auth/login' element={<AuthPage />} />
        <Route path='friends' element={<FriendsPage />} />
        <Route path='chat' element={<ChatPage />} />
        <Route path='me' element={<MePage />}/>
      </Routes>

      <ToastContainer position='bottom-right'/>
    </Layout>
  )
}

export default App;