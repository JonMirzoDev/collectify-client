import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Navigation = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Your App
        </Typography>
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
