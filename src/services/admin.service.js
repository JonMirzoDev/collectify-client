import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const adminService = {
  getUsers: async () => httpRequest.get('users'),
  delete: async (userId) => httpRequest.delete(`users/${userId}`),
  block: async (userId) => httpRequest.put(`users/${userId}/block`),
  unblock: async (userId) => httpRequest.put(`users/${userId}/unblock`),
  makeAddmin: async (userId) => httpRequest.put(`users/${userId}/admin`),
  removeAddmin: async (userId) =>
    httpRequest.put(`users/${userId}/admin/remove`)
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
