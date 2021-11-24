import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import config from '../config'
import { useSnackBar } from '../contexts/SnackBarContext'
import { User, CreateUser } from '../types'

type LoginData = {
  email: string
  password: string
}

type ContextState = {
  isAuthenticated: boolean
  user: User | null
  error: string | null
  login: (data: LoginData) => void
  signup: (data: CreateUser) => void
  logout: () => void
}

const contextDefaultValues: ContextState = {
  isAuthenticated: false,
  user: null,
  error: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
}

const AuthContext = createContext<ContextState>(contextDefaultValues)

export default function AuthProvider(props: { children: React.ReactNode }) {
  const { showSnackBar } = useSnackBar()
  const [cookies, setCookies] = useCookies()
  const [error, setError] = useState<ContextState['error']>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.access_token)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const { BE_URL } = config

  const login = async (data: LoginData) => {
    try {
      const res = await axios.post(
        `${BE_URL}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      )

      if (res.status !== 200) {
        showSnackBar(res.data?.err || 'Error while login', 'error')
        return
      }
      setIsAuthenticated(true)
      setError(null)
    } catch (err) {
      showSnackBar('Error while login', 'error')
      console.error(err)
    }
  }

  const signup = async (data: CreateUser) => {
    try {
      const res = await axios.post(`${BE_URL}/api/user`, data)
      if (res.status !== 200) {
        setError(res.data?.err || 'Error while signup')
        return
      }
      showSnackBar('Accound created. You can login now.', 'success')
      router.push('/login')
    } catch (err) {
      showSnackBar('Error while signup', 'error')
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      const res = await axios.get(`${BE_URL}/api/auth/logout`, {
        withCredentials: true,
      })
      if (res.status !== 200) {
        setError(res.data?.err || 'Error while signup')
        return
      }
      setIsAuthenticated(false)
      setUser(null)
      router.push('/login')
    } catch (err) {
      showSnackBar('Error while logout', 'error')
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/auth/me`, {
          withCredentials: true,
        })
        if (res.status !== 200 || !res.data) {
          showSnackBar('Error while getting user info', 'error')
          return
        }
        setUser(res.data.data)
      } catch (err) {
        showSnackBar('Error while getting user info', 'error')
        console.error(err)
      }
    }
    if (!user && isAuthenticated) {
      fetchMe()
    }
  }, [user, isAuthenticated, showSnackBar])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        login,
        signup,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth(): ContextState {
  return React.useContext(AuthContext)
}
