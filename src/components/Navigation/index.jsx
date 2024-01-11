import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/auth.slice'
import styles from './style.module.scss'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth } = useSelector((store) => store.auth)
  const handleLogout = () => dispatch(logout())

  return (
    <AppBar position='fixed' className={styles.navigationBar}>
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          className={styles.title}
          onClick={() => navigate('/')}
        >
          Your App
        </Typography>
        {!isAuth ? (
          <Button
            className={styles.button}
            onClick={() => navigate('/auth/login')}
          >
            Login
          </Button>
        ) : (
          <Button className={styles.button} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
      <header className={styles.header}>
        <h1>Collectify</h1>
      </header>
    </AppBar>
  )
}

export default Navigation
