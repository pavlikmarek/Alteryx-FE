import type { NextPage } from 'next'

import { PageMeta } from '../utils/PageMeta'
import { MinimalPublicAdapter } from '../utils/MinimalPublicAdapter'
import withAuth from '../utils/withAuth'

import DashboardPage from '../sections/dashboard/DashboardPage'

const Dashboard: NextPage = () => {
  return (
    <>
      <PageMeta
        use={MinimalPublicAdapter}
        data={{
          title: undefined,
          description: undefined,
        }}
      />
      <DashboardPage />
    </>
  )
}

export default withAuth(Dashboard)
