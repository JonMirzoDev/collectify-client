import BasicLayout from '../layouts/BasicLayout'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'
import Collection from '../pages/collections/Collection'

const commonRoutes = {
  path: '/',
  element: <BasicLayout />,
  children: [
    {
      index: true,
      element: <HomePage />
    },
    {
      path: 'collections/:id',
      element: <Collection />
    },
    {
      path: '/users',
      element: <UsersPage />
    }
  ]
}

export default commonRoutes
