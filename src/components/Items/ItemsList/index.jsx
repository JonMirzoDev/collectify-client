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
import styles from './style.module.scss'

const ItemsList = ({
  items = [],
  loading = false,
  isOwner = false,
  onDelete
}) => {
  const navigate = useNavigate()

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (items.length === 0) {
    return <Typography>No items found in this collection.</Typography>
  }

  const handleItemClick = (itemId) => {
    // Navigate to Item View page
    navigate(`/items/${itemId}`)
  }

  return (
    <Paper className={styles.itemsList}>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              isOwner && (
                <Box display='flex' gap='15px'>
                  <IconButton
                    edge='end'
                    aria-label='edit'
                    onClick={() => history.push(`/items/edit/${item.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => onDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )
            }
          >
            <ListItemText
              primary={item.name}
              secondary={item.description}
              onClick={() => handleItemClick(item.id)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ItemsList
