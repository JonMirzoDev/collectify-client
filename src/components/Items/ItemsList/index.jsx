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
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
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
  const { mutate: deleteItem } = useDeleteItem()
  const { mutate: deleteItemAdmin } = useDeleteItemAdmin()
  const { mutate: likeItem } = useLikeItem()
  const { mutate: dislikeItem } = useDislikeItem()

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (items.length === 0) {
    return <Typography>No items found in this collection.</Typography>
  }

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`)
  }

  const handleDelete = (itemId, e) => {
    e.stopPropagation()
    if (isAdmin) {
      deleteItemAdmin(itemId, {
        onSuccess: () => {
          queryClient.invalidateQueries(`items-by-${collectionId}`)
          toast.success('Item successfully deleted.')
        },
        onError: () => {
          toast.error('Error deleting item.')
        }
      })
    } else {
      deleteItem(itemId, {
        onSuccess: () => {
          queryClient.invalidateQueries(`items-by-${collectionId}`)
          toast.success('Item successfully deleted.')
        },
        onError: () => {
          toast.error('Error deleting item.')
        }
      })
    }
  }

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (isAuth) {
      const action = isLiked ? dislikeItem : likeItem
      action(itemId, {
        onSuccess: () => {
          queryClient.invalidateQueries(`items-by-${collectionId}`)
        },
        onError: () => {
          toast.error('Error updating like status.')
        }
      })
    }
  }

  const handleEditClick = (e, collectionId, itemId) => {
    e.stopPropagation()
    navigate(`/collections/${collectionId}/items/edit/${itemId}`)
  }

  return (
    <Paper className={styles.itemsList}>
      <List>
        {items.map((item) => (
          <ListItem
            onClick={() => handleItemClick(item.id)}
            className={styles.listItem}
            key={item.id}
            secondaryAction={
              <Box
                display='flex'
                alignItems='center'
                gap='15px'
                className={styles.iconsBox}
              >
                <IconButton
                  onClick={(e) => handleLikeClick(e, item.id, item.likeStatus)}
                  aria-label='like'
                  className={styles.likeBtn}
                >
                  {item.likeStatus ? (
                    <FavoriteIcon color='error' />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                  <Typography marginLeft={1}>{item?.likeCount}</Typography>
                </IconButton>
                {isOwner && (
                  <>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={(e) => handleEditClick(e, collectionId, item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={(e) => handleDelete(item.id, e)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
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
            <ListItemText
              primary={truncateText(item.name, 6)}
              secondary={truncateText(item.description, 3)}
            />
            <Box className={styles.authorDetails}>
              <Typography variant='caption' display='block'>
                Author: {item?.collection?.user?.username}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ItemsList
