import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const itemService = {
  getItems: async (collectionId) =>
    httpRequest.get(`items?collectionId=${collectionId}`),
  create: async (data) => httpRequest.post('items', data)
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

export const useCreateItem = (mutationSettings) => {
  return useMutation(itemService.create, mutationSettings)
}
