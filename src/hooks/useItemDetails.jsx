import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useItemDetails = ({
  isAuth = false,
  isLiking = false,
  isDisliking = false,
  isDeletingComment = false,
  itemId,
  user,
  item,
  likeItem,
  dislikeItem,
  deleteComment,
  deleteItemAdmin,
  deleteItem
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLikeClick = (e, itemId, isLiked) => {
    e.stopPropagation()
    if (!isAuth) {
      navigate('/auth/login')
    }
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
  return {
    handleLikeClick,
    handleDeleteComment,
    onDelete
  }
}

export default useItemDetails
