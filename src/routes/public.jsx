import { Navigate, useRoutes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'
import BasicLayout from '../layouts/BasicLayout'

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
  // {
  //   path: '/users',
  //   element: <UsersPage />
  // },
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
