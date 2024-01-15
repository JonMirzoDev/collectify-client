import { useSelector } from 'react-redux'
import CollectionList from '../collections/CollectionList'
import styles from './style.module.scss' // Import your styles

export default function HomePage() {
  const { token, user } = useSelector((store) => store.auth)

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.welcomeMessage}>
        Welcome to HomePage, {user ? user.username : 'Guest'}
      </div>
      <CollectionList userId={user?.id} />
    </div>
  )
}
