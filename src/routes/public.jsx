import { Navigate, useRoutes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'
import BasicLayout from '../layouts/BasicLayout'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../components/Login'
import Register from '../components/Register'

export const publicRoutes = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/users',
        element: <UsersPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]

const PublicRoutes = () => {
  let element = useRoutes(publicRoutes)
  return element
}

export default PublicRoutes
