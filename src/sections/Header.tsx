import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
          {user ? 'Users' : ''}
        </Typography>
        {user ? (
          <>
            <Typography variant="subtitle1" component="div">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Button
              onClick={() => logout()}
              variant="text"
              color="secondary"
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href={'/login'} passHref>
            <Button variant="text" color="secondary" sx={{ ml: 1 }}>
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
}
