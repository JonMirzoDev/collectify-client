import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  ButtonGroup,
  Typography,
  Container,
  Tooltip
} from '@mui/material'
import {
  AdminPanelSettings,
  Block,
  Delete,
  LockOpen,
  RemoveCircleOutline,
  StarBorder
} from '@mui/icons-material'
import styles from './style.module.scss'
import { useUserActions } from '../../hooks/useUserActions'
import { useGetUsers } from '../../services/admin.service'

const actionButtons = [
  {
    action: 'deleteUser',
    icon: <Delete />,
    title: 'Delete',
    color: 'secondary',
    disabled: (user) => false
  },
  {
    action: 'blockUser',
    icon: <Block />,
    title: 'Block',
    color: 'error',
    disabled: (user) => user.isBlocked
  },
  {
    action: 'unblockUser',
    icon: <LockOpen />,
    title: 'Unblock',
    color: 'success',
    disabled: (user) => !user.isBlocked
  },
  {
    action: 'makeAdmin',
    icon: <AdminPanelSettings />,
    title: 'Make Admin',
    color: 'primary',
    disabled: (user) => user.isAdmin
  },
  {
    action: 'removeAdmin',
    icon: <RemoveCircleOutline />,
    title: 'Remove Admin',
    color: 'default',
    disabled: (user) => !user.isAdmin
  }
]

const AdminPage = () => {
  const { data: users } = useGetUsers()
  const { handleAction, isLoading } = useUserActions()

  return (
    <Container>
      <Typography
        fontSize={24}
        fontWeight={550}
        textAlign='center'
        marginTop={4}
        marginBottom={3}
        className={styles.title}
      >
        Admin Panel
      </Typography>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label='user management table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.username}
                  {user.isAdmin && (
                    <StarBorder fontSize='inherit' color='success' />
                  )}{' '}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <ButtonGroup variant='contained'>
                    {actionButtons.map((actionButton) => (
                      <Tooltip
                        title={actionButton.title}
                        placement='top'
                        key={actionButton.action}
                      >
                        <span>
                          <IconButton
                            color={actionButton.color}
                            onClick={() =>
                              handleAction(actionButton.action, user.id)
                            }
                            disabled={isLoading || actionButton.disabled(user)}
                          >
                            {actionButton.icon}
                          </IconButton>
                        </span>
                      </Tooltip>
                    ))}
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AdminPage
