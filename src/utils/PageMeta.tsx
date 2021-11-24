export function PageMeta<T extends React.ComponentType<any>>(props: {
  use: T
  data: React.ComponentProps<T>
}) {
  const AdapterComponent = props.use
  return <AdapterComponent {...props.data} />
}
