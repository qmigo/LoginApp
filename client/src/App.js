import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <div>Router root</div>
    },
    {
      path: '/register',
      element: <div>Register Route</div>
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
