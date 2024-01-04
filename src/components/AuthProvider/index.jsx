import { useSelector } from 'react-redux'
import PrivateRoutes from '../../routes/private'
import PublicRoutes from '../../routes/public'

const AuthProvider = () => {
  const { token } = useSelector((store) => store.auth)

  return token ? <PrivateRoutes /> : <PublicRoutes />
}

export default AuthProvider
