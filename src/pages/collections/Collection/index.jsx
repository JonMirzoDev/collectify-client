import React from 'react'
import { useParams } from 'react-router-dom'
import { useCollection } from '../../../services/collection.service'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container
} from '@mui/material'
import styles from './style.module.scss'

const Collection = () => {
  const { id } = useParams()
  const { data: collection, isLoading } = useCollection({ id })
  console.log('collection: ', collection)

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

  if (!collection) {
    return <Typography variant='h5'>Collection not found.</Typography>
  }

  return (
    <Container maxWidth='md' className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant='h4' component='h2' className={styles.title}>
            {collection.name}
          </Typography>
          <Typography variant='body1' className={styles.description}>
            {collection.description}
          </Typography>
          <Typography variant='overline' className={styles.topic}>
            Topic: {collection.topic}
          </Typography>
          {collection.image && (
            <Box
              component='img'
              src={collection.image}
              alt={collection.name}
              className={styles.image}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default Collection
