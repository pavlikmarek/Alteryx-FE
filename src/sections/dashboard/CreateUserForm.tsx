import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useUsers } from '../../contexts/UserContext'

export default function DashboardPage() {
  const { signup } = useUsers()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const firstName = data.get('firstName') as string
    const lastName = data.get('lastName') as string
    const email = data.get('email') as string
    const password = data.get('password') as string
    if (firstName && lastName && email && password) {
      await signup({ firstName, lastName, email, password })
    }
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 2,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1rem',
      }}
    >
      <TextField
        required
        type="text"
        name="firstName"
        label="First Name"
        variant="outlined"
      />
      <TextField
        required
        type="text"
        name="lastName"
        label="Last Name"
        variant="outlined"
      />
      <TextField
        required
        type="text"
        name="email"
        label="Email Address"
        variant="outlined"
      />
      <TextField
        required
        type="password"
        name="password"
        label="Password"
        variant="outlined"
      />
      <Button variant="contained" type="submit">
        Create user
      </Button>
    </Box>
  )
}
