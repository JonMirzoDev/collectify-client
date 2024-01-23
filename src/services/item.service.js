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
  search: async (query) => httpRequest.get(`items/search?query=${query}`),
  getAllItems: async () => httpRequest.get('items/all'),
  getAllTags: async () => httpRequest.get('items/tags'),
  like: async (itemId) => httpRequest.post(`likes/${itemId}/like`),
  dislike: async (itemId) => httpRequest.post(`likes/${itemId}/dislike`),
  getComments: async (itemId) => httpRequest.get(`comments/item/${itemId}`),
  deleteComment: async (commentId) =>
    httpRequest.delete(`comments/${commentId}`),
  createComment: async (data) => httpRequest.post('comments', data)
}

export const useCreateComment = (mutationSettings) => {
  return useMutation(itemService.createComment, mutationSettings)
}

export const useDeleteComment = (mutationSettings) => {
  return useMutation(itemService.deleteComment, mutationSettings)
}

export const useGetCommentsByItem = ({ itemId }) => {
  return useQuery(
    `comments-by-${itemId}`,
    () => itemService.getComments(itemId),
    {
      enabled: !!itemId
    }
  )
}

export const useDislikeItem = (mutationSettings) => {
  return useMutation(itemService.dislike, mutationSettings)
}

export const useLikeItem = (mutationSettings) => {
  return useMutation(itemService.like, mutationSettings)
}

export const useGetAllTags = (querySettings) => {
  return useQuery('get-all-tags', itemService.getAllTags, querySettings)
}

export const useGetAllItems = (querySettings) => {
  return useQuery('get-all-items', itemService.getAllItems, querySettings)
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
