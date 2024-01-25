import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  useCollectionsByUser,
  useDeleteCollection
} from '../../services/collection.service'
import { LoadingButton } from '@mui/lab'
import { useQueryClient } from 'react-query'
import styles from './style.module.scss'
import { truncateText } from '../../utils'
import { useSelector } from 'react-redux'

const UserPage = () => {
  const { mutate: deleteCollection, isLoading: isDeleting } =
    useDeleteCollection()
  const queryClient = useQueryClient()
  const { userId, userName, email } = useParams()
  const { isAuth, user } = useSelector((store) => store.auth)
  const isActionable = (isAuth && user.id == userId) || user?.isAdmin
  console.log('user: ', isAuth, user)

  const navigate = useNavigate()
  const { data: collections, isLoading } = useCollectionsByUser({ userId })

  const handleCreateNewCollection = () => {
    navigate('/collections/create')
  }

  const handleUpdate = (id, e) => {
    e.stopPropagation()
    navigate(`/collections/update/${id}`)
  }

  const handleCollectionClick = (id) => navigate(`/collections/${id}`)

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (!isDeleting && isAuth)
      deleteCollection(id, {
        onSuccess: (res) => {
          console.log('successfully deleted.')
          queryClient.invalidateQueries(`collections-by-${userId}`)
        },
        onError: (error) => {
          console.log('delete err: ', error)
        }
      })
  }

  return (
    <Container maxWidth='lg' className={styles.container}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        className={styles.pageTitle}
      >
        User: {userName}
      </Typography>
      <Typography variant='h6' component='div' className={styles.userDetails}>
        <span className='email'>{email}</span>
      </Typography>
      <Grid container spacing={2} justifyContent='flex-end' marginBottom='2rem'>
        <Grid item>
          {isActionable && (
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon />}
              onClick={handleCreateNewCollection}
              className={styles.createButton}
            >
              Create Collection
            </Button>
          )}
        </Grid>
      </Grid>
      {isLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='60vh'
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} className={styles.grid}>
          {collections?.map((collection) => (
            <Grid item xs={12} sm={6} md={4} key={collection.id}>
              <Card className={styles.card}>
                <CardActionArea
                  onClick={() => handleCollectionClick(collection?.id)}
                >
                  {collection.image && (
                    <CardMedia
                      component='img'
                      image={collection.image}
                      alt={collection.name}
                      className={styles.media}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {collection.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {truncateText(collection.description, 8)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {isActionable && (
                  <CardActions className={styles.cardActions}>
                    <LoadingButton
                      loading={isDeleting}
                      onClick={(e) => handleDelete(collection?.id, e)}
                      startIcon={<DeleteIcon />}
                      aria-label='delete'
                    >
                      Delete
                    </LoadingButton>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={(e) => handleUpdate(collection.id, e)}
                      className={styles.editButton}
                    >
                      Edit
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default UserPage
