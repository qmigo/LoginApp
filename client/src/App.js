import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Username from './components/Username'
import Password from './components/Password'
import Register from './components/Register'
import Reset from './components/Reset'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import PageNotFound from './components/PageNotFound'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <Username/>
    },
    {
      path:'/password',
      element: <Password/>
    },
    {
      path:'/register',
      element: <Register/>
    },
    {
      path:'/reset',
      element: <Reset/>
    },
    {
      path:'/profile',
      element: <Profile/>
    },
    {
      path:'/recovery',
      element: <Recovery/>
    },
    {
      path:'*',
      element: <PageNotFound/>
    }
  ]
)
function App() {
  return (
    <main>
    <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
