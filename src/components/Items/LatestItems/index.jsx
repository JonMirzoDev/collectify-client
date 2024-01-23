import { Card, CardContent, Typography, Grid, Chip } from '@mui/material'
import { useGetAllItems } from '../../../services/item.service'
import styles from './style.module.scss'
import { truncateText } from '../../../utils'
import { useNavigate } from 'react-router-dom'

const LatestItems = ({ latestItems = [], isLoading = false }) => {
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading latest items...</div>
  }

  const handleAuthorClick = (e, userId, userName, email) => {
    e.stopPropagation()
    navigate(`/users/${userId}/${userName}/${email}`)
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
