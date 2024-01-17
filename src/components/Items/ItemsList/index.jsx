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
import { useDeleteItem } from '../../../services/item.service'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

const ItemsList = ({
  items = [],
  loading = false,
  isOwner = false,
  collectionId
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: deleteItem, isLoading: isDeleting } = useDeleteItem()

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
                      onClick={() => navigate(`/collections/${collectionId}/items/edit/${item.id}`)}
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
            <ListItemText
              primary={item.name}
              secondary={`${item.description
                .split(' ')
                .slice(0, 2)
                .join(' ')}...`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ItemsList
