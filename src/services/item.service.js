import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const itemService = {
  getItems: async (collectionId) =>
    httpRequest.get(`items?collectionId=${collectionId}`),
  getItem: async (itemId) => httpRequest.get(`items/${itemId}`),
  delete: async (itemId) => httpRequest.delete(`items/${itemId}`),
  create: async (data) => httpRequest.post('items', data),
  update: async (data) =>
    httpRequest.put(`items/${data.itemId}`, data.updatedData),
  search: async (query) => httpRequest.get(`items/search?query=${query}`)
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

export const useItem = ({ itemId }) => {
  return useQuery(`item-${itemId}`, () => itemService.getItem(itemId), {
    enabled: !!itemId
  })
}

export const useSearchItems = ({ query }) => {
  return useQuery(`search-items-${query}`, () => itemService.search(query), {
    enabled: !!query
  })
}

export const useCreateItem = (mutationSettings) => {
  return useMutation(itemService.create, mutationSettings)
}

export const useDeleteItem = (mutationSettings) => {
  return useMutation(itemService.delete, mutationSettings)
}

export const useUpdateItem = (mutationSettings) => {
  return useMutation(itemService.update, mutationSettings)
}
