import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import styles from './style.module.scss'
import { useCreateCollection } from '../../../services/collection.service'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'

const CreateCollection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const { mutate: create, isLoading } = useCreateCollection()
  const queryClient = useQueryClient()

  const onSubmit = (data) => {
    console.log(data)
    create(data, {
      onSuccess: (res) => {
        toast.success(`${data.name} Successfully created!`)
        queryClient.invalidateQueries('collections')
        reset()
      },
      onError: (err) => {
        console.log('create collection err: ', err)
      }
    })
  }

  return (
    <div className={styles.createCollectionContainer}>
      <h2>Create Collection</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          label='Name'
          variant='outlined'
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          className={styles.field}
        />
        <TextField
          label='Description'
          variant='outlined'
          multiline
          rows={4}
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
          className={styles.field}
        />
        <TextField
          label='Topic'
          variant='outlined'
          {...register('topic', { required: 'Topic is required' })}
          error={!!errors.topic}
          helperText={errors.topic?.message}
          className={styles.field}
        />
        <TextField
          label='Image URL'
          variant='outlined'
          {...register('image')}
          className={styles.field}
        />
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          className={styles.submitButton}
          loading={isLoading}
        >
          Create Collection
        </LoadingButton>
      </form>
    </div>
  )
}

export default CreateCollection
