/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Tooltip from '@mui/material/Tooltip'
import styles from './style.module.scss'

const Comments = ({
  isAuth,
  handleSubmit,
  onSubmit,
  register,
  comments,
  user,
  handleDeleteComment
}) => {
  return (
    <Box className={styles.commentsSection}>
      <Typography variant='h6' className={styles.commentsTitle}>
        Comments
      </Typography>

      {isAuth ? (
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          className={styles.commentForm}
        >
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Write a comment...'
            {...register('text', { required: true })}
            margin='normal'
          />
          <Button
            variant='contained'
            color='primary'
            endIcon={<SendIcon />}
            className={styles.addComment}
            type='submit'
          >
            Add Comment
          </Button>
        </Box>
      ) : (
        <Typography className={styles.signInPrompt}>
          Sign in to add your comment.
        </Typography>
      )}

      <List>
        {comments?.map((comment) => (
          <ListItem key={comment.id} className={styles.commentItem}>
            <ListItemText primary={comment.text} />
            {((isAuth && comment.userId === user.id) || user?.isAdmin) && (
              <Tooltip title='Delete' placement='right'>
                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Comments
