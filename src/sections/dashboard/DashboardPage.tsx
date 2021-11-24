import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import UsersList from './UsersList'
import CreateUserForm from './CreateUserForm'

export default function DashboardPage() {
  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          List of users
        </Typography>
        <CreateUserForm />
        <UsersList />
      </Box>
    </Container>
  )
}
