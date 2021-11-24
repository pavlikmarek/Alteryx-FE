import React, { createContext, useState } from 'react'
import axios from 'axios'

import config from '../config'
import { useSnackBar } from '../contexts/SnackBarContext'
import { User, CreateUser, EditUser } from '../types'

type ContextState = {
  users: User[] | null
  error: string | null
  fetchUsers: () => void
  signup: (user: CreateUser) => void
  deleteUser: (id: string) => void
  edit: (id: string, user: EditUser) => void
}

const contextDefaultValues: ContextState = {
  users: null,
  error: null,
  fetchUsers: () => {},
  signup: () => {},
  deleteUser: () => {},
  edit: () => {},
}

const UsersContext = createContext<ContextState>(contextDefaultValues)

export default function UserProvider(props: { children: React.ReactNode }) {
  const { showSnackBar } = useSnackBar()
  const [error, setError] = useState<ContextState['error']>(null)
  const [users, setUsers] = useState<ContextState['users']>(null)

  const { BE_URL } = config

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BE_URL}/api/user`, {
        withCredentials: true,
      })
      if (res.status !== 200 || !res.data) {
        showSnackBar(res.data?.err || 'Error while getting users', 'error')
        return
      }
      setUsers(res.data.data)
      setError(null)
    } catch (err) {
      showSnackBar('Error while getting users', 'error')
      console.error(err)
    }
  }

  const signup = async (data: CreateUser) => {
    try {
      const res = await axios.post(`${BE_URL}/api/user`, data)
      if (res.status !== 200) {
        showSnackBar(res.data?.err || 'Error while saving user', 'error')
        return
      }
      showSnackBar('User saved', 'success')
      fetchUsers()
    } catch (err) {
      showSnackBar('Error while saving user', 'error')
      console.error(err)
    }
  }

  const edit = async (id: string, data: EditUser) => {
    try {
      const res = await axios.put(
        `${BE_URL}/api/user/${id}`,
        data,
        {
          withCredentials: true,
        }
      )
      if (res.status !== 200) {
        showSnackBar(res.data?.err || 'Error while editing user', 'error')
        return
      }
      showSnackBar('User updated', 'success')
      fetchUsers()
    } catch (err) {
      showSnackBar('Error while editing user', 'error')
      console.error(err)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const res = await axios.delete(`${BE_URL}/api/user/${id}`, {
        withCredentials: true,
      })
      if (res.status !== 200) {
        showSnackBar(res.data?.err || 'Error while removing user', 'error')
        return
      }
      showSnackBar('User deleted', 'success')
      fetchUsers()
    } catch (err) {
      showSnackBar('Error while removing user', 'error')
      console.error(err)
    }
  }

  return (
    <UsersContext.Provider
      value={{
        error,
        users,
        fetchUsers,
        deleteUser,
        signup,
        edit,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  )
}

export function useUsers(): ContextState {
  return React.useContext(UsersContext)
}
