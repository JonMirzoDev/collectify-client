import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TextField, Box, Typography, Paper } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import styles from './style.module.scss'
import { useItem, useUpdateItem } from '../../../services/item.service'

const EditItem = () => {
  const { itemId, collectionId } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: item, isLoading: isLoadingItem } = useItem({ itemId })
  const { mutate: updateItem, isLoading: isUpdating } = useUpdateItem()
  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    if (item) {
      setValue('name', item.name)
      setValue('description', item.description)
      setValue('tags', item.tags.join(', '))
    }
  }, [item, setValue])

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      tags: data.tags.split(',').map((tag) => tag.trim())
    }

    updateItem(
      { itemId, updatedData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`items-by-${collectionId}`)
          queryClient.invalidateQueries(`item-${itemId}`)
          toast.success('Item updated successfully!')
          navigate(`/collections/${collectionId}`)
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`)
        }
      }
    )
  }

  if (isLoadingItem) return <Box>Loading...</Box>

  return (
    <Box className={styles.editItem}>
      <Paper elevation={3} className={styles.formContainer}>
        <Typography variant='h5' component='h1' gutterBottom>
          Edit Item
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
          <TextField
            label='Item Name'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            {...register('name')}
          />
          <TextField
            label='Description'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            multiline
            rows={3}
            {...register('description')}
          />
          <TextField
            label='Tags (comma separated)'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('tags')}
          />
          <Box textAlign='center' marginTop={2}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              loading={isUpdating}
            >
              Update Item
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default EditItem
