import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { PostPage } from './pages/PostPage.jsx'
import { EditPostPage } from './pages/EditPostPage.jsx'
import { CreatePostPage } from './pages/CreatePostPage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { FriendsPage } from './pages/FriendsPage.jsx'
import { ChatPage } from "./pages/ChatPage.jsx"
import { AuthPage } from "./pages/AuthPage.jsx"
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
        <Route path='auth/login' element={<AuthPage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='friends' element={<FriendsPage />} />
        <Route path='chat' element={<ChatPage />} />
      </Routes>

      <ToastContainer position='bottom-right'/>
    </Layout>
  )
}

export default App;