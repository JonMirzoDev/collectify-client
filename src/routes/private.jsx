/* eslint-disable no-unused-vars */
import { Navigate, useRoutes } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'

export const privateRoutes = [
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
  }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
