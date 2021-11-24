import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import { User } from '../../types'
import { useUsers } from '../../contexts/UserContext'

export function EditUserDialog(props: {
  user: User
  setUser: (user: User | null) => void
}) {
  const { setUser, user } = props

  const { edit } = useUsers()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const firstName = data.get('firstName') as string
    const lastName = data.get('lastName') as string
    const email = data.get('email') as string
    const password = data.get('password') as string
    if (firstName && lastName && email) {
      await edit(user._id, { firstName, lastName, email, password })
    }
  }

  return (
    <Dialog onClose={() => setUser(null)} open={!!user}>
      <DialogTitle
        sx={{
          backgroundColor: 'primary.main',
          color: 'common.white',
          textAlign: 'center',
        }}
      >{`${user?.firstName} ${user?.lastName}`}</DialogTitle>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 2,
          width: '100%',
          display: 'grid',
          gridGap: '1rem',
          minWidth: '600px',
          padding: 1,
        }}
      >
        <TextField
          fullWidth
          type="text"
          label="First Name"
          name="firstName"
          variant="outlined"
          defaultValue={user?.firstName}
        />
        <TextField
          fullWidth
          type="text"
          label="Last Name"
          name="lastName"
          variant="outlined"
          defaultValue={user?.lastName}
        />
        <TextField
          fullWidth
          type="text"
          label="Email Address"
          name="email"
          variant="outlined"
          defaultValue={user?.email}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          variant="outlined"
        />
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => setUser(null)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update user
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
