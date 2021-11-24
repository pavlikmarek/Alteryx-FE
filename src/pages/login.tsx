import type { NextPage } from 'next'

import { PageMeta } from '../utils/PageMeta'
import { MinimalPublicAdapter } from '../utils/MinimalPublicAdapter'

import LoginPage from '../sections/login/LoginPage'

const Login: NextPage = () => {
  return (
    <>
      <PageMeta
        use={MinimalPublicAdapter}
        data={{
          title: undefined,
          description: undefined,
        }}
      />
      <LoginPage />
    </>
  )
}

export default Login
