import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Container
} from '@mui/material'
import styles from './style.module.scss'
import {
  useDislikeItem,
  useItem,
  useLikeItem
} from '../../../services/item.service'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'

const ItemDetail = () => {
  const { itemId } = useParams()
  const queryClient = useQueryClient()
  const { isAuth } = useSelector((store) => store.auth)
  const { data: item, isLoading, error } = useItem({ itemId })
  const { mutate: likeItem, isLoading: isLiking } = useLikeItem()
  const { mutate: dislikeItem, isLoading: isDisliking } = useDislikeItem()

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (isAuth && !isLiking && !isDisliking) {
      if (!isLiked) {
        likeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`item-${itemId}`)
          },
          onError: (err) => {
            console.log('like err: ', err)
          }
        })
      } else {
        dislikeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`item-${itemId}`)
          },
          onError: (err) => {
            console.log('dislike err: ', err)
          }
        })
      }
    }
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography variant='h6'>Error loading item details.</Typography>
  }

  return (
    <Container>
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

            <Box marginTop={3}>
              <p>author: {item?.collection?.user?.username}</p>
              <p>likeCount: {item?.likeCount}</p>
              <p>likeStatus: {item?.likeStatus && 'liked'}</p>
              <Box
                margin='10px 0'
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleLikeClick(e, item?.id, item?.likeStatus)}
              >
                likeIcon
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default ItemDetail
