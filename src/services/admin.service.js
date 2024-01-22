import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const adminService = {
  getUsers: async () => httpRequest.get('users'),
  delete: async (userId) => httpRequest.delete(`users/${userId}`),
  block: async (userId) => httpRequest.put(`users/${userId}/block`),
  unblock: async (userId) => httpRequest.put(`users/${userId}/unblock`),
  makeAddmin: async (userId) => httpRequest.put(`users/${userId}/admin`),
  removeAddmin: async (userId) =>
    httpRequest.put(`users/${userId}/admin/remove`),
  deleteCollection: async (collectionId) =>
    httpRequest.delete(`admin/collections/${collectionId}`),
  update: async (data) =>
    httpRequest.put(`admin/collections/${data.id}`, data.data),
  createItem: async (data) => httpRequest.post('admin/items', data),
  updateItem: async (data) =>
    httpRequest.put(`admin/items/${data.itemId}`, data.updatedData),
  deleteItem: async (itemId) => httpRequest.delete(`admin/items/${itemId}`)
}

export const useDeleteItemAdmin = (mutationSettings) => {
  return useMutation(adminService.deleteItem, mutationSettings)
}

export const useUpdateItemAdmin = (mutationSettings) => {
  return useMutation(adminService.updateItem, mutationSettings)
}

export const useCreateItemAdmin = (mutationSettings) => {
  return useMutation(adminService.createItem, mutationSettings)
}

export const useUpdateCollectionAdmin = (mutationSettings) => {
  return useMutation(adminService.update, mutationSettings)
}

export const useDeleteCollectionAdmin = (mutationSettings) => {
  return useMutation(adminService.deleteCollection, mutationSettings)
}

export const useGetUsers = (querySettings) => {
  return useQuery('get-users', adminService.getUsers, querySettings)
}

export const useDeleteUser = (mutationSettings) => {
  return useMutation(adminService.delete, mutationSettings)
}

export const useBlockUser = (mutationSettings) => {
  return useMutation(adminService.block, mutationSettings)
}

export const useUnblockUser = (mutationSettings) => {
  return useMutation(adminService.unblock, mutationSettings)
}

export const useMakeAdmin = (mutationSettings) => {
  return useMutation(adminService.makeAddmin, mutationSettings)
}

export const useRemoveAdmin = (mutationSettings) => {
  return useMutation(adminService.removeAddmin, mutationSettings)
}
