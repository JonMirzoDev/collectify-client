/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import styles from './style.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/auth.service'
import { useDispatch } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { login, setUser } from '../../store/auth/auth.slice'

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutate, isLoading } = useLoginMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log('res: ', res)
        dispatch(login(res.access_token))
        dispatch(setUser(res.user))
        reset()
        navigate('/')
      },
      onError: (err) => {
        console.log('login err: ', err)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <TextField
        label='Email'
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
        type='submit'
        variant='contained'
        color='primary'
        loading={isLoading}
      >
        Login
      </LoadingButton>
      <Typography
        variant='body2'
        color='textSecondary'
        align='center'
        className={styles.signupPrompt}
      >
        Don't have an account?{' '}
        <Link to='/auth/register' className={styles.signupLink}>
          Sign Up
        </Link>{' '}
      </Typography>
    </form>
  )
}

export default Login
