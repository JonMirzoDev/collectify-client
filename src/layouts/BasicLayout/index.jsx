import { Outlet } from 'react-router-dom'
import styles from './style.module.scss'
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function BasicLayout() {
  return (
    <div className={styles.app}>
      <Navigation />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default BasicLayout
