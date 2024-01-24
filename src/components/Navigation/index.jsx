import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/auth.slice'
import styles from './style.module.scss'
import { Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import SearchBar from '../SearchBar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((store) => store.auth)
  const handleLogout = () => dispatch(logout())

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigateToAdmin = () => {
    navigate('/admin')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }} onClick={() => navigate('/')}>
        Collectify
      </Typography>
      <List>
        {!isAuth ? (
          <ListItem onClick={() => navigate('/auth/login')}>
            <ListItemText primary='Login' />
          </ListItem>
        ) : (
          <>
            <ListItem
              onClick={() =>
                navigate(`/users/${user.id}/${user.username}/${user.email}`)
              }
            >
              <ListItemText primary={user.username} />
            </ListItem>
            {user.isAdmin && (
              <ListItem onClick={() => navigate('/admin')}>
                <ListItemText primary='Admin' />
              </ListItem>
            )}
            <ListItem onClick={handleLogout}>
              <ListItemText primary='Logout' />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  )

  return (
    <AppBar position='fixed' className={styles.navigationBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          className={styles.title}
          onClick={() => navigate('/')}
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Collectify
        </Typography>
        <SearchBar className={styles.searchContainer} />
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
                onClick={() =>
                  navigate(`/users/${user.id}/${user.username}/${user.email}`)
                }
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
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Navigation
