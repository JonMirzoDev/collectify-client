import { useForm } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import styles from './style.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../services/auth.service'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/auth/auth.slice'
import { LoadingButton } from '@mui/lab'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate, isLoading } = useRegisterMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log('res: ', res)
        dispatch(setUser(res))
        toast.success('Successfully registered')
        navigate('/auth/login')
      },
      onError: (err) => {
        console.log('register err: ', err)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
      <TextField
        label='Username'
        variant='outlined'
        {...register('username', { required: true })}
        error={!!errors.username}
        helperText={errors.username?.message ? 'Username is required' : ''}
      />
      <TextField
        label='Email'
        type='email'
        variant='outlined'
        {...register('email', { required: true })}
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />
      <TextField
        label='Password'
        type='password'
        variant='outlined'
        {...register('password', { required: true })}
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
      />
      <LoadingButton
        loading={isLoading}
        type='submit'
        variant='contained'
        color='primary'
      >
        Register
      </LoadingButton>
      <Typography
        variant='body2'
        color='textSecondary'
        align='center'
        className={styles.loginPrompt}
      >
        Have an account?{' '}
        <Link to='/auth/login' className={styles.loginLink}>
          Login
        </Link>
      </Typography>
    </form>
  )
}

export default Register
