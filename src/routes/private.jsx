/* eslint-disable no-unused-vars */
import { Navigate, useRoutes } from 'react-router-dom'

export const privateRoutes = [
  // {
  //   path: '/users',
  //   element: <Users />
  // },
  // {
  //   path: '*',
  //   element: <Navigate to='/users' />
  // }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
