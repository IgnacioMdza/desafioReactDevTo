import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import Home from './layouts/Home'

import Login from './pages/Login'
import Register from './pages/Register'
import Relevant from './pages/Relevant'
import Latest from './pages/Latest'
import Top from './pages/Top'
import NewPost from './pages/NewPost'
import Post from './layouts/Post'
import Content from './pages/Content'
import EditPost from './pages/EditPost'
import Search from './pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: '/relevant',
        element: <Relevant/>
      },
      {
        path: '/Latest',
        element: <Latest/>
      },
      {
        path: '/Top',
        element: <Top/>
      },
      {
        path: '/Search/:searchWords',
        element: <Search/>
      }
    ]
  },
  {
    path:'Login',
    element: <Login/>
  },
  {
    path:'Register',
    element: <Register/>
  },
  {
    path:'NewPost',
    element: <NewPost/>
  },
  {
    path:'Post/',
    element: <Post/>,
    children: [
      {
      path: '/Post/:postid',
      element: <Content/>
      }
    ]
  },
  {
    path:'EditPost/:postid',
    element: <EditPost/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={ router } />
  </React.StrictMode>, 
)

