/* eslint-disable react/prop-types */
import {
  useCollectionsQuery,
  useDeleteCollection
} from '../../../services/collection.service'
import { Button, Card, CardContent, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styles from './style.module.scss'
import { useQueryClient } from 'react-query'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from 'react-redux'

const CollectionList = ({ userId }) => {
  const { data: collections, isLoading } = useCollectionsQuery()
  const { mutate: deleteCollection, isLoading: isDeleting } =
    useDeleteCollection()
  const { isAuth } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  console.log('collections: ', collections)

  if (isLoading) return <div>Loading...</div>

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (!isDeleting)
      deleteCollection(id, {
        onSuccess: (res) => {
          console.log('successfully deleted.')
          queryClient.invalidateQueries('collections')
        },
        onError: (error) => {
          console.log('delete err: ', error)
        }
      })
  }

  const handleUpdate = (id, e) => {
    e.stopPropagation()
    navigate(`/collections/update/${id}`)
  }

  const handleCollectionClick = (id) => navigate(`/collections/${id}`)

  const handleCreateNew = () => {
    navigate('/collections/create')
  }

  return (
    <div className={styles.collectionListContainer}>
      {isAuth && (
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          className={styles.createButton}
        >
          Create Collection
        </Button>
      )}
      {collections?.map((collection) => (
        <Card
          key={collection.id}
          className={styles.card}
          onClick={() => handleCollectionClick(collection?.id)}
        >
          {collection.image && (
            <div
              className={styles.cardImage}
              style={{ backgroundImage: `url(${collection.image})` }}
            />
          )}
          <CardContent className={styles.cardContent}>
            <Typography variant='h5' component='div' className={styles.title}>
              {collection.name}
            </Typography>
            <Typography className={styles.description} color='text.secondary'>
              {collection.description}
            </Typography>

            {userId && userId === collection?.userId && (
              <div className={styles.actions}>
                <LoadingButton
                  loading={isDeleting}
                  onClick={(e) => handleDelete(collection?.id, e)}
                  startIcon={<DeleteIcon />}
                  aria-label='delete'
                >
                  Delete
                </LoadingButton>

                <LoadingButton
                  variant='text'
                  startIcon={<EditIcon />}
                  onClick={(e) => handleUpdate(collection.id, e)}
                  className={styles.updateButton}
                >
                  Update
                </LoadingButton>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CollectionList
