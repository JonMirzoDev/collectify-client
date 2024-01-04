import { Navigate, useRoutes } from 'react-router-dom'
import HomePage from '../pages/HomePage'

export const publicRoutes = [
  // {
  //   path: '/',
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: '/auth/login',
  //       element: <Login />
  //     },
  //     {
  //       path: '/',
  //       element: <Navigate to='/auth/login' replace />
  //     },
  //     {
  //       path: '/auth/register',
  //       element: <Signup />
  //     }
  //   ]
  // },
  {
    path: '/',
    element: <HomePage />
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
