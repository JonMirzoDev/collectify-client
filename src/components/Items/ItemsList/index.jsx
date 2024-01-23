/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import styles from './style.module.scss'
import {
  useDeleteItem,
  useDislikeItem,
  useLikeItem
} from '../../../services/item.service'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDeleteItemAdmin } from '../../../services/admin.service'
import { truncateText } from '../../../utils'

const ItemsList = ({
  items = [],
  loading = false,
  isOwner = false,
  collectionId
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, isAuth } = useSelector((store) => store.auth)
  const isAdmin = user?.isAdmin
  const { mutate: deleteItem, isLoading: isDeleting } = useDeleteItem()
  const { mutate: deleteItemAdmin, isLoading: isDeletingAdmin } =
    useDeleteItemAdmin()
  const { mutate: likeItem, isLoading: isLiking } = useLikeItem()
  const { mutate: dislikeItem, isLoading: isDisliking } = useDislikeItem()

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (items.length === 0) {
    return <Typography>No items found in this collection.</Typography>
  }

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`)
  }

  const onDelete = (itemId) => {
    if (itemId && collectionId) {
      if (isAdmin) {
        deleteItemAdmin(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`items-by-${collectionId}`)
          },
          onError: (err) => {
            console.log('delete item err admin: ', err)
          }
        })
      } else {
        deleteItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`items-by-${collectionId}`)
          },
          onError: (err) => {
            console.log('delete item err: ', err)
            toast.error('Delete item error happened!')
          }
        })
      }
    }
  }

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (isAuth && !isLiking && !isDisliking) {
      if (!isLiked) {
        likeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`items-by-${collectionId}`)
          },
          onError: (err) => {
            console.log('like err: ', err)
          }
        })
      } else {
        dislikeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`items-by-${collectionId}`)
          },
          onError: (err) => {
            console.log('dislike err: ', err)
          }
        })
      }
    }
  }

  return (
    <Paper className={styles.itemsList}>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <Box display='flex' gap='15px'>
                {isOwner && (
                  <Box display='flex' gap='15px'>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={() =>
                        navigate(
                          `/collections/${collectionId}/items/edit/${item.id}`
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => onDelete(item.id)}
                      disabled={isDeleting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
                <IconButton
                  onClick={() => handleItemClick(item.id)}
                  aria-label='view details'
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            }
          >
            <Box marginRight={3}>
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
            <ListItemText
              primary={item.name}
              secondary={truncateText(item.description, 6)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ItemsList
