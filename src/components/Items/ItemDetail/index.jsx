import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Container,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './style.module.scss'
import {
  useCreateComment,
  useDeleteComment,
  useDeleteItem,
  useDislikeItem,
  useGetCommentsByItem,
  useItem,
  useLikeItem
} from '../../../services/item.service'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { useDeleteItemAdmin } from '../../../services/admin.service'
import toast from 'react-hot-toast'

const ItemDetail = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuth, user } = useSelector((store) => store.auth)
  const { data: item, isLoading, error } = useItem({ itemId })
  const { mutate: likeItem, isLoading: isLiking } = useLikeItem()
  const { mutate: dislikeItem, isLoading: isDisliking } = useDislikeItem()
  const { mutate: deleteItem, isLoading: isDeleting } = useDeleteItem()
  const { mutate: deleteItemAdmin, isLoading: isDeletingAdmin } =
    useDeleteItemAdmin()
  const { mutate: deleteComment, isLoading: isDeletingComment } =
    useDeleteComment()
  const { data: comments, isLoading: isCommentsLoading } = useGetCommentsByItem(
    { itemId }
  )
  const { mutate: craeteComment, isLoading: isCreatingComment } =
    useCreateComment()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm()

  console.log('item: ', item)

  const onSubmit = (data) => {
    const commentData = { itemId, text: data.text }
    if (isAuth && !isCreatingComment) {
      craeteComment(commentData, {
        onSuccess: (res) => {
          reset()
          queryClient.invalidateQueries(`comments-by-${itemId}`)
        },
        onError: (err) => {
          console.log('create comment err: ', err)
        }
      })
    }
  }

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (isAuth && !isLiking && !isDisliking) {
      if (!isLiked) {
        likeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`item-${itemId}`)
          },
          onError: (err) => {
            console.log('like err: ', err)
          }
        })
      } else {
        dislikeItem(itemId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(`item-${itemId}`)
          },
          onError: (err) => {
            console.log('dislike err: ', err)
          }
        })
      }
    }
  }

  const handleDeleteComment = (commentId) => {
    if (isAuth && !isDeletingComment && commentId) {
      deleteComment(commentId, {
        onSuccess: (res) => {
          queryClient.invalidateQueries(`comments-by-${itemId}`)
        },
        onError: (err) => {
          console.log('delelte comment err: ', err)
        }
      })
    }
  }

  const onDelete = (itemId) => {
    if (itemId && item.collectionId) {
      if (user?.isAdmin) {
        deleteItemAdmin(itemId, {
          onSuccess: (res) => {
            toast.success('Item deleted successfully!')
            navigate(`/collections/${item.collectionId}`)
          },
          onError: (err) => {
            console.log('delete item err admin: ', err)
          }
        })
      } else {
        deleteItem(itemId, {
          onSuccess: (res) => {
            toast.success('Item deleted successfully!')
            navigate(`/collections/${item.collectionId}`)
          },
          onError: (err) => {
            console.log('delete item err: ', err)
            toast.error('Delete item error happened!')
          }
        })
      }
    }
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography variant='h6'>Error loading item details.</Typography>
  }

  return (
    <Container>
      <Box className={styles.itemView} marginTop={10}>
        <Typography
          marginBottom={2}
          textAlign='center'
          fontSize={36}
          fontWeight={540}
          fontFamily='fantasy'
        >
          Item details
        </Typography>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {item.name}
            </Typography>
            <Typography variant='body1'>{item.description}</Typography>
            <Typography variant='overline' display='block'>
              Tags:
            </Typography>
            {item.tags.map((tag, index) => (
              <Chip key={index} label={tag} className={styles.tag} />
            ))}

            <Box marginTop={3}>
              <p>author: {item?.collection?.user?.username}</p>
              <p>likeCount: {item?.likeCount}</p>
              <p>likeStatus: {item?.likeStatus && 'liked'}</p>
              <Box
                margin='10px 0'
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleLikeClick(e, item?.id, item?.likeStatus)}
              >
                likeIcon
              </Box>
            </Box>

            {((isAuth && item?.collection?.user?.id === user.id) ||
              user?.isAdmin) && (
              <Box display='flex' gap='15px'>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={() =>
                    navigate(
                      `/collections/${item.collectionId}/items/edit/${item.id}`
                    )
                  }
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
          </CardContent>
        </Card>

        <Box marginTop={4}>
          <h4>comments</h4>
          {isAuth ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                style={{ margin: 10, padding: 8 }}
                type='text'
                placeholder='create comment'
                {...register('text', { required: true })}
              />
              <button>add comment</button>
            </form>
          ) : (
            <p>Signin to add your comment</p>
          )}
          {comments?.map((comment) => (
            <Box key={comment.id} margin='20px'>
              {comment.text}
              {((isAuth && comment.userId === user.id) || user.isAdmin) && (
                <button
                  style={{ marginLeft: 30, cursor: 'pointer' }}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  delete
                </button>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default ItemDetail
