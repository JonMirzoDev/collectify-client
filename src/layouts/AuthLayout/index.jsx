import { Outlet } from 'react-router-dom'
import { Paper } from '@mui/material'
import styles from './style.module.scss'

const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <Paper elevation={6} className={styles.paper}>
        <div className={styles.logo}>collectify_logo</div>
        <Outlet />
      </Paper>
    </div>
  )
}

export default AuthLayout
