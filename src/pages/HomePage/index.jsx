import { useSelector } from 'react-redux'
import CollectionList from '../collections/CollectionList'
import styles from './style.module.scss' // Import your styles
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { token, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.welcomeMessage}>
        Welcome to HomePage,{' '}
        <span onClick={() => navigate('/user')}>
          {user ? user.username : 'Guest'}
        </span>
      </div>
      <CollectionList userId={user?.id} />
    </div>
  )
}
