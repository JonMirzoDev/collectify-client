import { useCollectionsQuery } from '../../../services/collection.service'
import { Card, CardContent, Typography } from '@mui/material'
import styles from './style.module.scss'

const CollectionList = () => {
  const { data: collections, isLoading } = useCollectionsQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.collectionListContainer}>
      {collections.map((collection) => (
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CollectionList
