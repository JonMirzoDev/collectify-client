import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../../store'
import { logout } from '../../store/auth/auth.slice'

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 100000
})

const errorHandler = (error) => {
  console.log('errorrrrr: ', error)
  const message = error?.response?.data?.message || 'An error occurred'

  let toastStyle = {
    fontSize: '1.25rem',
    padding: '16px',
    marginTop: '2rem'
  }

  if (error?.response?.status === 401 || error?.response?.status === 403) {
    store.dispatch(logout())
  }

  if (message === "Cannot read properties of undefined (reading '0')") {
    toast.error('NO account found with this credentials', {
      style: toastStyle
    })
  } else {
    toast.error(message, {
      style: toastStyle
    })
  }

  return Promise.reject(error)
}

httpRequest.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpRequest.interceptors.response.use((response) => response.data, errorHandler)

export default httpRequest
