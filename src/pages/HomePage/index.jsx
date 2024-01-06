import { useSelector } from 'react-redux'

export default function HomePage() {
  const { token, user } = useSelector((store) => store.auth)
  return <div>HomePage</div>
}
