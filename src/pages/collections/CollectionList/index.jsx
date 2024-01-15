/* eslint-disable react/prop-types */
import {
  useCollectionsQuery,
  useDeleteCollection
} from '../../../services/collection.service'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './style.module.scss'
import { useQueryClient } from 'react-query'
import { LoadingButton } from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

const CollectionList = ({ userId }) => {
  const { data: collections, isLoading } = useCollectionsQuery()
  const { mutate: deleteCollection, isLoading: isDeleting } =
    useDeleteCollection()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  console.log('collections: ', collections)

  if (isLoading) return <div>Loading...</div>

  const handleDelete = (id) => {
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

  const handleUpdate = (id) => {
    navigate(`/collections/update/${id}`)
  }

  return (
    <div className={styles.collectionListContainer}>
      {collections?.map((collection) => (
        <Card key={collection.id} className={styles.card}>
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
                  onClick={() => handleDelete(collection?.id)}
                  startIcon={<DeleteIcon />}
                  aria-label='delete'
                >
                  Delete
                </LoadingButton>

                <LoadingButton
                  variant='text'
                  startIcon={<EditIcon />}
                  onClick={() => handleUpdate(collection.id)}
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
