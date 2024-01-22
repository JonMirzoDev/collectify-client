import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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

const UserPage = () => {
  const { mutate: deleteCollection, isLoading: isDeleting } =
    useDeleteCollection()
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const { data: collections, isLoading } = useCollectionsByUser()

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
    if (!isDeleting)
      deleteCollection(id, {
        onSuccess: (res) => {
          console.log('successfully deleted.')
          queryClient.invalidateQueries('collections-by-user')
        },
        onError: (error) => {
          console.log('delete err: ', error)
        }
      })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Container maxWidth='lg' className={styles.container}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        className={styles.pageTitle}
      >
        My Page
      </Typography>
      <Grid container spacing={2} justifyContent='flex-end' marginBottom='2rem'>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            onClick={handleCreateNewCollection}
            className={styles.createButton}
          >
            Create Collection
          </Button>
        </Grid>
      </Grid>
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
                    {collection.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default UserPage
