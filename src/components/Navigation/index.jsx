import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/auth.slice'
import styles from './style.module.scss'
import { Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import SearchBar from '../SearchBar'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((store) => store.auth)
  const handleLogout = () => dispatch(logout())

  const navigateToAdmin = () => {
    navigate('/admin')
  }

  return (
    <AppBar position='fixed' className={styles.navigationBar}>
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          className={styles.title}
          onClick={() => navigate('/')}
        >
          Collectify
        </Typography>

        <div className={styles.searchContainer}>
          <SearchBar />
        </div>

        <div className={styles.authSection}>
          {!isAuth ? (
            <Button
              className={styles.button}
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
          ) : (
            <>
              <Box
                aria-label='account of current user'
                aria-haspopup='true'
                onClick={() => navigate('/user')}
                color='inherit'
                className={styles.logoBtn}
              >
                <AccountCircle />
                <span className={styles.username}>{user.username}</span>
              </Box>
              {user.isAdmin && (
                <Button className={styles.button} onClick={navigateToAdmin}>
                  Admin
                </Button>
              )}
              <Button className={styles.button} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
