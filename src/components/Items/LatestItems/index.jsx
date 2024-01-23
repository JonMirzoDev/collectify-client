/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material'
import styles from './style.module.scss'
import { truncateText } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDislikeItem, useLikeItem } from '../../../services/item.service'
import { useQueryClient } from 'react-query'

const LatestItems = ({ latestItems = [], isLoading = false, query = '' }) => {
  const navigate = useNavigate()
  const { mutate: likeItem, isLoading: isLiking } = useLikeItem()
  const { mutate: dislikeItem, isLoading: isDisliking } = useDislikeItem()
  const { isAuth } = useSelector((store) => store.auth)
  const queryClient = useQueryClient()

  if (isLoading) {
    return <div>Loading latest items...</div>
  }

  const handleAuthorClick = (e, userId, userName, email) => {
    e.stopPropagation()
    navigate(`/users/${userId}/${userName}/${email}`)
  }

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (isAuth && !isLiking && !isDisliking) {
      if (!isLiked) {
        likeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries('get-all-items')
            queryClient.invalidateQueries(`search-items-${query}`)
          },
          onError: (err) => {
            console.log('like err: ', err)
          }
        })
      } else {
        dislikeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries('get-all-items')
            queryClient.invalidateQueries(`search-items-${query}`)
          },
          onError: (err) => {
            console.log('dislike err: ', err)
          }
        })
      }
    }
  }

  return (
    <div className={styles.latestItemsContainer}>
      <Grid container spacing={2}>
        {latestItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              className={styles.itemCard}
              onClick={() => navigate(`/items/${item.id}`)}
            >
              <CardContent>
                <div
                  onClick={(e) =>
                    handleAuthorClick(
                      e,
                      item?.collection?.user?.id,
                      item?.collection?.user?.username,
                      item?.collection?.user?.email
                    )
                  }
                >
                  author: {item?.collection?.user?.username}
                </div>
                <Typography gutterBottom variant='h6' component='div'>
                  {item.name}
                </Typography>

                <div>
                  <p>likes: {item?.likeCount}</p>
                  <p>likeStatus: {item.likeStatus && 'liked'}</p>
                </div>

                <Box
                  margin='10px 0'
                  onClick={(e) =>
                    handleLikeClick(e, item?.id, item?.likeStatus)
                  }
                >
                  likeIcon
                </Box>

                <Typography variant='body2' color='text.secondary'>
                  {truncateText(item.description, 4)}
                </Typography>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <Chip key={index} label={tag} className={styles.tag} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default LatestItems
