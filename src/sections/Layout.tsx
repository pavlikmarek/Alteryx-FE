import Header from './Header'

export default function DashboardPage(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
