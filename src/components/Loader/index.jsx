import { Box, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  box: {
    width: '100%',
    height: 'calc(100vh - 50px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8rem'
  }
})

// eslint-disable-next-line react/prop-types
const Loader = ({ page }) => {
  const classes = useStyles()

  return (
    <Box className={page === 'my-page' ? classes.box2 : classes.box}>
      <CircularProgress
        style={{ color: '#ff006b' }}
        size={page === 'my-page' ? 43 : 83}
        thickness={page === 'my-page' ? 2 : 4}
      />
    </Box>
  )
}

export default Loader
