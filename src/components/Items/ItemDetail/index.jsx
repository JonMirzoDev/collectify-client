import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Container,
  IconButton,
  Tooltip
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { useDeleteItemAdmin } from '../../../services/admin.service'
import useItemDetails from '../../../hooks/useItemDetails'
import Comments from './Comments'

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

  const { handleLikeClick, handleDeleteComment, onDelete } = useItemDetails({
    isAuth,
    isLiking,
    isDisliking,
    isDeletingComment,
    itemId,
    user,
    item,
    likeItem,
    dislikeItem,
    deleteComment,
    deleteItemAdmin,
    deleteItem
  })

  const commentProps = {
    isAuth,
    handleSubmit,
    onSubmit,
    register,
    comments,
    user,
    handleDeleteComment
  }

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

  if (error) {
    return <Typography variant='h6'>Error loading item details.</Typography>
  }

  return (
    <Container>
      <Box className={styles.itemView} marginTop={10}>
        <Typography variant='h4' gutterBottom className={styles.title}>
          Item Details
        </Typography>

        <Box className={styles.actions}>
          <Tooltip title='Like'>
            <IconButton
              onClick={(e) => handleLikeClick(e, item?.id, item?.likeStatus)}
            >
              {item?.likeStatus ? (
                <FavoriteIcon color='error' />
              ) : (
                <FavoriteBorderIcon />
              )}{' '}
              <Typography marginLeft={1}>{item?.likeCount}</Typography>
            </IconButton>
          </Tooltip>
          {user?.isAdmin ||
          (isAuth && item?.collection?.user?.id === user.id) ? (
            <>
              <Tooltip title='Edit'>
                <IconButton
                  onClick={() =>
                    navigate(
                      `/collections/${item.collectionId}/items/edit/${item.id}`
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton
                  onClick={() => onDelete(item.id)}
                  disabled={isDeleting}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </Box>

        <Card className={styles.card}>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {item.name}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              className={styles.description}
            >
              {item.description}
            </Typography>
            <Box className={styles.tags}>
              {item.tags.map((tag, index) => (
                <Chip key={index} label={tag} />
              ))}
            </Box>
            <Typography
              className={styles.author}
              variant='body2'
              color='textSecondary'
              onClick={() =>
                navigate(
                  `/users/${item?.collection?.user?.id}/${item?.collection?.user?.username}/${item?.collection?.user?.email}`
                )
              }
            >
              Author: {item?.collection?.user?.username}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Likes: {item?.likeCount}
            </Typography>
          </CardContent>
        </Card>

        <Comments {...commentProps} />
      </Box>
    </Container>
  )
}

export default ItemDetail
