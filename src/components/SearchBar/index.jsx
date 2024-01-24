import { useForm } from 'react-hook-form'
import { CircularProgress, InputBase, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import styles from './style.module.scss'
import { useSearchItems } from '../../services/item.service'
import useDebounce from '../../hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const SearchBar = () => {
  const { register, watch, setValue } = useForm()
  const navigate = useNavigate()
  const searchTerm = watch('searchTerm')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { data: searchResults, isFetching } = useSearchItems({
    query: debouncedSearchTerm
  })
  const [isSearchActive, setIsSearchActive] = useState(true)

  console.log('results: ', searchResults, debouncedSearchTerm)

  const handleItemClick = (id) => {
    setIsSearchActive(false)
    setValue('searchTerm', '')
    navigate(`/items/${id}`)
  }

  useEffect(() => {
    if (searchTerm?.length > 0) {
      setIsSearchActive(true)
    }
  }, [searchTerm])

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder='Search...'
        {...register('searchTerm')}
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput
        }}
        inputProps={{
          'aria-label': 'search'
        }}
      />
      {isSearchActive && searchResults && searchResults.length > 0 && (
        <div className={styles.results}>
          <Typography
            color='#8b8b8b'
            padding={1}
            fontWeight={600}
            fontSize={18}
          >
            Items
          </Typography>
          {searchResults.map((result) => (
            <div
              key={result.id}
              className={styles.resultItem}
              onClick={() => handleItemClick(result.id)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress color='secondary' size={24} />
        </div>
      )}
    </div>
  )
}

export default SearchBar
