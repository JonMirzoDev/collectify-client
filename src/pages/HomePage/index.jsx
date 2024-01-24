import { useSelector } from 'react-redux'
import CollectionList from '../collections/CollectionList'
import LatestItems from '../../components/Items/LatestItems'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import {
  useGetAllItems,
  useGetAllTags,
  useSearchItems
} from '../../services/item.service'
import CollectionsIcon from '@mui/icons-material/Collections'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import { useState } from 'react'

export default function HomePage() {
  const { user } = useSelector((store) => store.auth)
  const [tab, setTab] = useState('top_collections')
  const [query, setQuery] = useState('')
  const { data: itemTags } = useGetAllTags()
  const { data: allItems } = useGetAllItems()
  const { data: tagClickResults, isLoading: isTagResultsLoading } =
    useSearchItems({ query })
  const latestItems = query ? tagClickResults : allItems?.slice(0, 6)

  const navigate = useNavigate()

  const handleTagClick = (tag) => {
    setQuery(tag)
    setTab('tag_results')
  }

  const handleTabClick = (tab) => {
    setQuery('')
    setTab(tab)
  }

  return (
    <div className={styles.homePageContainer}>
      <Container>
        <Box className={styles.mainContent}>
          <div className={styles.leftContent}>
            <div className={styles.welcomeMessage}>
              Welcome to Collectify{' '}
              <span
                onClick={() =>
                  navigate(`/users/${user.id}/${user.username}/${user.email}`)
                }
              >
                {user && user.username}
              </span>
            </div>
            <Box className={styles.tabSection}>
              <Button
                variant={tab === 'top_collections' ? 'contained' : 'outlined'}
                startIcon={<CollectionsIcon />}
                onClick={() => handleTabClick('top_collections')}
                className={tab === 'top_collections' ? styles.activeTab : ''}
              >
                Top Collections
              </Button>
              <Button
                variant={tab === 'latest_items' ? 'contained' : 'outlined'}
                startIcon={<NewReleasesIcon />}
                onClick={() => handleTabClick('latest_items')}
                className={tab === 'latest_items' ? styles.activeTab : ''}
              >
                Latest Items
              </Button>
              {query && (
                <Button
                  variant={tab === 'tag_results' ? 'contained' : 'outlined'}
                  onClick={() => setTab('tag_results')}
                  className={tab === 'tag_results' ? styles.activeTab : ''}
                >
                  Tag Results
                </Button>
              )}
            </Box>
            {tab === 'top_collections' && <CollectionList userId={user?.id} />}
            {tab === 'latest_items' && (
              <LatestItems latestItems={latestItems} query={query} />
            )}
            {tab === 'tag_results' && (
              <LatestItems
                latestItems={latestItems}
                isLoading={isTagResultsLoading}
              />
            )}
          </div>
          <Paper className={styles.tagCloud}>
            <Typography variant='h6' component='div'>
              Item Tags
            </Typography>
            <div className={styles.tags}>
              {itemTags?.map((itemTag, c) => (
                <span
                  key={c}
                  className={styles.tag}
                  onClick={() => handleTagClick(itemTag)}
                >
                  {itemTag}
                </span>
              ))}
            </div>
          </Paper>
        </Box>
      </Container>
    </div>
  )
}
