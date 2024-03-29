import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TextField, Container, Paper, Typography, Box } from '@mui/material'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import {
  useCollection,
  useUpdateCollection
} from '../../../services/collection.service'
import { useUpdateCollectionAdmin } from '../../../services/admin.service'
import styles from './style.module.scss'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'

const UpdateCollectionPage = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)
  const isAdmin = user?.isAdmin
  const { data: collection, isLoading: isLoadingCollection } = useCollection({
    id
  })
  const { mutate: updateCollection, isLoading: isUpdating } =
    useUpdateCollection()
  const { mutate: updateCollectionAdmin, isLoading: isUpdatingAdmin } =
    useUpdateCollectionAdmin()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      topic: '',
      image: ''
    }
  })

  useEffect(() => {
    if (collection) {
      reset(collection)
    }
  }, [collection, reset])

  const onSubmit = async (data) => {
    if (id) {
      if (isAdmin) {
        updateCollectionAdmin(
          { id, data },
          {
            onSuccess: (res) => {
              queryClient.invalidateQueries(`collection-${id}`)
              queryClient.refetchQueries('collections')
              toast.success('Successfully updated.')
              navigate('/')
            },
            onError: (error) => {
              console.log('update admin error: ', error)
            }
          }
        )
      } else {
        updateCollection(
          { id, data },
          {
            onSuccess: (res) => {
              queryClient.invalidateQueries(`collection-${id}`)
              queryClient.refetchQueries('collections')
              toast.success('Successfully updated.')
              navigate('/')
            },
            onError: (error) => {
              console.log('update error: ', error)
            }
          }
        )
      }
    }
  }

  if (isLoadingCollection) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth='sm' className={styles.container}>
      <Typography
        component='h1'
        variant='h5'
        className={styles.header}
        textAlign='center'
        marginBottom={4}
        marginTop={3}
        fontWeight='550'
      >
        Update Collection
      </Typography>
      <Paper elevation={6} className={styles.paper}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            label='Name'
            {...register('name')}
            variant='outlined'
            margin='normal'
            fullWidth
            defaultValue={collection?.name}
          />
          <TextField
            label='Description'
            {...register('description')}
            variant='outlined'
            margin='normal'
            fullWidth
            defaultValue={collection?.description}
            multiline
            rows={3}
          />
          <TextField
            label='Topic'
            {...register('topic')}
            variant='outlined'
            margin='normal'
            fullWidth
            defaultValue={collection?.topic}
          />
          <TextField
            label='Image URL'
            {...register('image')}
            variant='outlined'
            margin='normal'
            fullWidth
            defaultValue={collection?.image}
          />
          <Box textAlign='center' marginTop={2}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              disabled={!isDirty || isUpdating}
              className={styles.submitButton}
              loading={isUpdating}
            >
              Update Collection
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default UpdateCollectionPage
