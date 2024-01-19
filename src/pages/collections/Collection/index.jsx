import { useNavigate, useParams } from 'react-router-dom'
import { useCollection } from '../../../services/collection.service'
import { useItems } from '../../../services/item.service'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Button
} from '@mui/material'
import styles from './style.module.scss'
import ItemsList from '../../../components/Items/ItemsList'
import { useSelector } from 'react-redux'

const Collection = () => {
  const { id } = useParams()
  const { isAuth, user } = useSelector((store) => store.auth)
  const { data: collection, isLoading } = useCollection({ id })
  const { data: items, isLoading: isItemsLoading } = useItems({
    collectionId: id
  })
  const isOwner = isAuth && user.id === collection?.userId
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  const handleAddItem = () => {
    navigate(`/collections/${id}/add-item`)
  }

  if (!collection) {
    return <Typography variant='h5'>Collection not found.</Typography>
  }

  return (
    <Container maxWidth='md' className={styles.container}>
      <div className={styles.collectionDetails}>
        {collection.image && (
          <Box
            component='img'
            src={collection.image}
            alt={collection.name}
            className={styles.collectionImage}
          />
        )}
        <Typography
          variant='h4'
          component='h2'
          className={styles.collectionText}
        >
          {collection.name}
        </Typography>
        <Typography variant='body1' className={styles.collectionText}>
          {collection.description}
        </Typography>
        <Typography variant='overline' className={styles.collectionText}>
          Topic: {collection.topic}
        </Typography>
        {isOwner && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleAddItem}
            className={styles.addButton}
          >
            Add Item
          </Button>
        )}
      </div>
      <Typography variant='h5' className={styles.collectionText}>
        Collection Items
      </Typography>
      {isItemsLoading ? (
        <CircularProgress className={styles.progress} />
      ) : (
        <ItemsList
          isOwner={isOwner}
          items={items}
          loading={isItemsLoading}
          collectionId={id}
        />
      )}
    </Container>
  )
}

export default Collection
