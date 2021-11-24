import Head from 'next/head'

export function MinimalPublicAdapter(props: {
  title: string | undefined
  description: string | undefined
  og?: {
    image?: string
    title?: string
    description?: string
  }
}) {
  const { description, title, og = {} } = props

  const ogTitle = og.title || title
  const ogDescription = og.description || description
  const ogImage = og.image
  return (
    <Head>
      {title !== undefined ? <title>{title}</title> : null}
      {ogImage !== undefined ? (
        <meta property="og:image" content={ogImage} />
      ) : null}
      {ogTitle !== undefined ? (
        <meta property="og:title" content={ogTitle} />
      ) : null}
      {description !== undefined ? (
        <meta name="description" content={description} />
      ) : null}
      {ogDescription !== undefined ? (
        <meta property="og:description" content={ogDescription} />
      ) : null}
    </Head>
  )
}
