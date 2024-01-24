/* eslint-disable react/prop-types */
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styles from './style.module.scss'
import { truncateText } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDislikeItem, useLikeItem } from '../../../services/item.service'
import { useQueryClient } from 'react-query'

const LatestItems = ({ latestItems = [], isLoading = false, query = '' }) => {
  const navigate = useNavigate()
  const { mutate: likeItem } = useLikeItem()
  const { mutate: dislikeItem } = useDislikeItem()
  const { isAuth } = useSelector((state) => state.auth)
  const queryClient = useQueryClient()

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (isAuth) {
      const action = isLiked ? dislikeItem : likeItem
      action(itemId, {
        onSuccess: () => {
          queryClient.invalidateQueries('get-all-items')
          queryClient.invalidateQueries(`search-items-${query}`)
        }
      })
    } else {
      navigate('/auth/login')
    }
  }

  const handleAuthorClick = (e, userId, userName, email) => {
    e.stopPropagation()
    navigate(`/users/${userId}/${userName}/${email}`)
  }

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='200px'
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid container spacing={4} className={styles.latestItemsContainer}>
      {latestItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card
            className={styles.itemCard}
            onClick={() => navigate(`/items/${item.id}`)}
          >
            <CardContent className={styles.cardContent}>
              <Box
                className={styles.authorSection}
                onClick={(e) =>
                  handleAuthorClick(
                    e,
                    item.collection.user.id,
                    item.collection.user.username,
                    item.collection.user.email
                  )
                }
              >
                <Typography variant='subtitle2' component='div'>
                  by: {item.collection.user.username}
                </Typography>
              </Box>
              <Typography gutterBottom variant='h5' component='div'>
                {truncateText(item.name, 8)}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {truncateText(item.description, 8)}
              </Typography>
              <Box className={styles.tags}>
                {item.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant='outlined'
                    className={styles.tag}
                  />
                ))}
              </Box>
              <Box className={styles.likeSection}>
                <IconButton
                  onClick={(e) => handleLikeClick(e, item.id, item.likeStatus)}
                >
                  {item.likeStatus ? (
                    <FavoriteIcon color='error' />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <Typography variant='caption' marginLeft={-1}>
                  {item.likeCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default LatestItems
