import ItemDetail from '../components/Items/ItemDetail'
import BasicLayout from '../layouts/BasicLayout'
import HomePage from '../pages/HomePage'
import Collection from '../pages/collections/Collection'

const commonRoutes = [
  {
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
        path: 'items/:itemId',
        element: <ItemDetail />
      }
    ]
  }
]

export default commonRoutes
