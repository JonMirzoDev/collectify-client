/* eslint-disable no-unused-vars */
import { Navigate, useRoutes } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'
import CreateCollection from '../pages/collections/CreateCollection'
import UpdateCollectionPage from '../pages/collections/UpdateCollection'

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
  },
  {
    path: '/collections',
    children: [
      {
        path: 'create',
        element: <CreateCollection />
      },
      {
        path: 'update/:id',
        element: <UpdateCollectionPage />
      }
    ]
  }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
