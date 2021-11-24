export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type CreateUser = Omit<User, '_id'>

export type EditUser = Partial<User>
