import '../styles/globals.css'
import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Layout from '../sections/Layout'
import AuthProvider from '../contexts/AuthContext'
import UserProvider from '../contexts/UserContext'
import SnackBarProvider from '../contexts/SnackBarContext'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <CookiesProvider>
          <AuthProvider>
            <UserProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </AuthProvider>
        </CookiesProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}

export default MyApp
