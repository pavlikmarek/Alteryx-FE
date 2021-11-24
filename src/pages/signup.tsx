import type { NextPage } from 'next'

import { PageMeta } from '../utils/PageMeta'
import { MinimalPublicAdapter } from '../utils/MinimalPublicAdapter'

import SignUpPage from '../sections/signup/SignUpPage'

const SignUp: NextPage = () => {
  return (
    <>
      <PageMeta
        use={MinimalPublicAdapter}
        data={{
          title: undefined,
          description: undefined,
        }}
      />
      <SignUpPage />
    </>
  )
}

export default SignUp
