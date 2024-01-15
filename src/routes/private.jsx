/* eslint-disable no-unused-vars */
import { Navigate, useRoutes } from 'react-router-dom'
import CreateCollection from '../pages/collections/CreateCollection'
import UpdateCollectionPage from '../pages/collections/UpdateCollection'
import commonRoutes from './common'

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
      }
    ]
  }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
