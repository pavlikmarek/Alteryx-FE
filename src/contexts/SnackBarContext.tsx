import { useState, createContext, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'

type ContextState = {
  showSnackBar: (text: string, typeColor: AlertColor) => void
}

const contextDefaultValues: ContextState = {
  showSnackBar: () => {},
}

const SnackBarContext = createContext(contextDefaultValues)

export default function SnackBarProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [typeColor, setTypeColor] = useState<AlertColor>('info')

  const showSnackBar = (text: string, color: AlertColor) => {
    setMessage(text)
    setTypeColor(color)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTypeColor('info')
  }

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeColor}>
          {message}
        </Alert>
      </Snackbar>
      {props.children}
    </SnackBarContext.Provider>
  )
}

export const useSnackBar = (): ContextState => {
  const context = useContext(SnackBarContext)

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider')
  }

  return context
}
