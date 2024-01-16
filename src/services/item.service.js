import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const itemService = {
  getItems: async (collectionId) =>
    httpRequest.get(`items?collectionId=${collectionId}`)
  // update: async (data) => httpRequest.put(`collections/${data.id}`, data.data)
}

export const useItems = ({ collectionId }) => {
  return useQuery(
    `items-by-${collectionId}`,
    () => itemService.getItems(collectionId),
    {
      enabled: !!collectionId
    }
  )
}

// export const useUpdateCollection = (mutationSettings) => {
//   return useMutation(itemService.update, mutationSettings)
// }
