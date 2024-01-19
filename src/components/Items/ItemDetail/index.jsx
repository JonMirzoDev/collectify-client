import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material'
import styles from './style.module.scss'
import { useItem } from '../../../services/item.service'

const ItemDetail = () => {
  const { itemId } = useParams()
  const { data: item, isLoading, error } = useItem({ itemId })

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography variant='h6'>Error loading item details.</Typography>
  }

  return (
    <Box className={styles.itemView} marginTop={10}>
      <Typography
        marginBottom={2}
        textAlign='center'
        fontSize={36}
        fontWeight={540}
        fontFamily='fantasy'
      >
        Item details
      </Typography>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {item.name}
          </Typography>
          <Typography variant='body1'>{item.description}</Typography>
          <Typography variant='overline' display='block'>
            Tags:
          </Typography>
          {item.tags.map((tag, index) => (
            <Chip key={index} label={tag} className={styles.tag} />
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}

export default ItemDetail
