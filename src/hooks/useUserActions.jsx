import { useMutation, useQueryClient } from 'react-query'
import {
  useBlockUser,
  useDeleteUser,
  useMakeAdmin,
  useRemoveAdmin,
  useUnblockUser
} from '../services/admin.service'

export function useUserActions() {
  const queryClient = useQueryClient()
  const actions = {
    deleteUser: useDeleteUser(),
    blockUser: useBlockUser(),
    unblockUser: useUnblockUser(),
    makeAdmin: useMakeAdmin(),
    removeAdmin: useRemoveAdmin()
  }

  const handleAction = (action, userId) => {
    if (userId) {
      actions[action].mutate(userId, {
        onSuccess: () => {
          queryClient.invalidateQueries('get-users')
        }
      })
    }
  }

  const isLoading = Object.values(actions).some((action) => action.isLoading)

  return { handleAction, isLoading }
}
