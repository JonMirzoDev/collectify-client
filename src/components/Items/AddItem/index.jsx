import { TextField, Box, Typography, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './style.module.scss'
import { LoadingButton } from '@mui/lab'
import { useCreateItem } from '../../../services/item.service'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

const AddItem = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { mutate: create, isLoading } = useCreateItem()

  const onSubmit = (data) => {
    const tagsArray = data.tags.split(',').map((tag) => tag.trim())
    if (id) {
      const itemData = {
        ...data,
        tags: tagsArray,
        collectionId: id
      }
      create(itemData, {
        onSuccess: (res) => {
          queryClient.invalidateQueries(`items-by-${id}`)
          toast.success('Successfully created!')
          reset()
          navigate(`/collections/${id}`)
        },
        onError: (err) => {
          console.log('item create err: ', err)
        }
      })
    }
  }

  return (
    <Box className={styles.addItem}>
      <Paper elevation={3} className={styles.formContainer}>
        <Typography variant='h5' component='h1' gutterBottom>
          Add New Item
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
          <TextField
            label='Item Name'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            {...register('name', { required: 'Item Name is required' })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
          <TextField
            label='Description'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            multiline
            rows={3}
            {...register('description', {
              required: 'Description is required'
            })}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
          <TextField
            label='Tags (comma separated)'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('tags', { required: 'Tags are required' })}
            error={!!errors.tags}
            helperText={
              errors.tags
                ? errors.tags.message
                : 'Enter tags separated by commas'
            }
          />
          <Box textAlign='center' marginTop={2}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              loading={isLoading}
            >
              Add Item
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AddItem
