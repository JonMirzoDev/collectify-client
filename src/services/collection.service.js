import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const collectionService = {
  create: async (data) => httpRequest.post('collections', data),
  getCollections: async () => httpRequest.get('collections'),
  getCollectionsByUser: async () => httpRequest.get('collections/user'),
  getCollection: async (id) => httpRequest.get(`collections/${id}`),
  delete: async (id) => httpRequest.delete(`collections/${id}`),
  update: async (data) => httpRequest.put(`collections/${data.id}`, data.data)
}

export const useCollectionsQuery = (querySettings) => {
  return useQuery(
    'collections',
    collectionService.getCollections,
    querySettings
  )
}

export const useCollectionsByUser = (querySettings) => {
  return useQuery(
    'collections-by-user',
    collectionService.getCollectionsByUser,
    querySettings
  )
}

export const useCollection = ({ id }) => {
  return useQuery(
    `collection-${id}`,
    () => collectionService.getCollection(id),
    {
      enabled: !!id
    }
  )
}

export const useCreateCollection = (mutationSettings) => {
  return useMutation(collectionService.create, mutationSettings)
}

export const useDeleteCollection = (mutationSettings) => {
  return useMutation(collectionService.delete, mutationSettings)
}

export const useUpdateCollection = (mutationSettings) => {
  return useMutation(collectionService.update, mutationSettings)
}
