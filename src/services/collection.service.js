import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const collectionService = {
  // register: async (data) => httpRequest.post('users/register', data)
  getCollections: async () => httpRequest.get('collections')
}

export const useCollectionsQuery = (querySettings) => {
  return useQuery(
    'collections',
    collectionService.getCollections,
    querySettings
  )
}

// export const useRegisterMutation = (mutationSettings) => {
//   return useMutation(collectionService.register, mutationSettings)
// }
