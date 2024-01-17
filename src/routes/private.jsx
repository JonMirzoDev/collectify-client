/* eslint-disable no-unused-vars */
import { Navigate, useRoutes } from 'react-router-dom'
import CreateCollection from '../pages/collections/CreateCollection'
import UpdateCollectionPage from '../pages/collections/UpdateCollection'
import commonRoutes from './common'
import UserPage from '../pages/UserPage'
import AddItem from '../components/Items/AddItem'

export const privateRoutes = [
  {
    ...commonRoutes
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
      },
      {
        path: ':id/add-item',
        element: <AddItem />
      }
    ]
  },
  {
    path: '/user',
    element: <UserPage />
  }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
