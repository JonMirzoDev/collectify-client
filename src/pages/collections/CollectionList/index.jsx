/* eslint-disable react/prop-types */
import {
  useCollectionsQuery,
  useDeleteCollection
} from '../../../services/collection.service'
import { useDeleteCollectionAdmin } from '../../../services/admin.service'
import { Card, CardContent, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styles from './style.module.scss'
import { useQueryClient } from 'react-query'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { truncateText } from '../../../utils'

const CollectionList = ({ userId }) => {
  const { data: collections, isLoading } = useCollectionsQuery()
  const { mutate: deleteCollection, isLoading: isDeleting } =
    useDeleteCollection()
  const { mutate: deleteCollectionAdmin, isLoading: isDeletingAdmin } =
    useDeleteCollectionAdmin()
  const { user } = useSelector((store) => store.auth)
  const isAdmin = user?.isAdmin
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if ((!isDeleting || !isDeletingAdmin) && !!id)
      if (isAdmin) {
        deleteCollectionAdmin(id, {
          onSuccess: (res) => {
            console.log('successfully deleted.')
            queryClient.invalidateQueries('collections')
            queryClient.invalidateQueries('get-all-items')
          },
          onError: (error) => {
            console.log('delete admin err: ', error)
          }
        })
      } else {
        deleteCollection(id, {
          onSuccess: (res) => {
            console.log('successfully deleted.')
            queryClient.invalidateQueries('collections')
            queryClient.invalidateQueries('get-all-items')
          },
          onError: (error) => {
            console.log('delete err: ', error)
          }
        })
      }
  }

  const handleUpdate = (id, e) => {
    e.stopPropagation()
    navigate(`/collections/update/${id}`)
  }

  const handleCollectionClick = (id) => navigate(`/collections/${id}`)

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className={styles.collectionListContainer}>
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
                {truncateText(collection.description, 8)}
              </Typography>

              {((userId && userId === collection?.userId) || isAdmin) && (
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
    </>
  )
}

export default CollectionList
