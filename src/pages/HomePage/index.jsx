import { useSelector } from 'react-redux'
import CollectionList from '../collections/CollectionList'
import styles from './style.module.scss' // Import your styles
import { useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import {
  useGetAllItems,
  useGetAllTags,
  useSearchItems
} from '../../services/item.service'
import LatestItems from '../../components/Items/LatestItems'
import { useState } from 'react'

export default function HomePage() {
  const { token, user } = useSelector((store) => store.auth)
  const [tab, setTab] = useState('top_collections')
  const [query, setQuery] = useState('')
  const { data: itemTags, isLoading: isTagsLoading } = useGetAllTags()
  const { data: allItems, isLoading: isAllItemsLoading } = useGetAllItems()
  const { data: tagClickResults, isLoading: isTagClickLoading } =
    useSearchItems({ query })
  const latestItems = query ? tagClickResults : allItems?.slice(0, 6)
  const isLoading = query ? isTagClickLoading : isAllItemsLoading

  const navigate = useNavigate()

  const handleTagClick = (tag) => {
    setQuery(tag)
    setTab('latest_items')
  }

  return (
    <div className={styles.homePageContainer}>
      <Container>
        <div className={styles.welcomeMessage}>
          Welcome to Collectify,{' '}
          <span
            onClick={() =>
              navigate(`/users/${user.id}/${user.username}/${user.email}`)
            }
          >
            {user ? user.username : 'Guest'}
          </span>
        </div>
        <Box
          display='flex'
          gap={3}
          borderBottom='1px solid #b3b3b3'
          width='max-content'
        >
          <p
            style={{
              cursor: 'pointer',
              fontWeight: tab === 'top_collections' && 600
            }}
            onClick={() => setTab('top_collections')}
          >
            Top Collections
          </p>
          <p
            style={{
              cursor: 'pointer',
              fontWeight: tab === 'latest_items' && 600
            }}
            onClick={() => setTab('latest_items')}
          >
            Latest items
          </p>
        </Box>
        {tab === 'top_collections' && <CollectionList userId={user?.id} />}
        {tab === 'latest_items' && (
          <LatestItems
            latestItems={latestItems}
            isLoading={isLoading}
            query={query}
          />
        )}
        {itemTags?.length > 0 && (
          <Box display='flex' gap={3} flexDirection='column' marginTop={3}>
            <h4>Item tags</h4>
            {itemTags.map((itemTag, c) => (
              <p
                key={c}
                style={{ cursor: 'pointer' }}
                onClick={() => handleTagClick(itemTag)}
              >
                {' '}
                {itemTag}
              </p>
            ))}
          </Box>
        )}
      </Container>
    </div>
  )
}
