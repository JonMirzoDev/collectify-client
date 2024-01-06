import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/auth.slice'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth } = useSelector((store) => store.auth)
  const handleLogout = () => dispatch(logout())

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Your App
        </Typography>
        {!isAuth ? (
          <Button color='inherit' onClick={() => navigate('/auth/login')}>
            Login
          </Button>
        ) : (
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
