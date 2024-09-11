import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { PostPage } from './pages/PostPage.jsx'
import { EditPostPage } from './pages/EditPostPage.jsx'
import { CreatePostPage } from './pages/CreatePostPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { FriendsPage } from './pages/FriendsPage.jsx'
import { ChatPage } from "./pages/ChatPage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Layout>
      <Routes> 
        <Route path='/' element={<HomePage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='new' element={<CreatePostPage />} />
        <Route path='auth/login' element={<LoginPage />} />
        <Route path='auth/register' element={<RegisterPage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='friends' element={<FriendsPage />} />
        <Route path='chat' element={<ChatPage />} />
      </Routes>

      <ToastContainer position='bottom-right'/>
    </Layout>
  )
}

export default App;