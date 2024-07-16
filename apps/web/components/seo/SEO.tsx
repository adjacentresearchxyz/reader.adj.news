// import { getSeoDescription, getContractOGProps } from 'common/contract-seo'
import { buildOgUrl } from '@utils/og'
import Head from 'next/head'

export function SEO<P extends Record<string, string | undefined>>(props: {
  title: string
  description: string
  url?: string
  id?: string
  image?: string
}) {
  const { title, description, url, id, image } = props

  const imageUrl = (id && buildOgUrl(id))

  const absUrl = 'https://adj.news' + url

  return (
    <Head>
      <title>{title}</title>

      <meta
        property="og:title"
        name="twitter:title"
        content={title}
        key="title"
      />
      <meta name="description" content={description} key="description1" />
      <meta
        property="og:description"
        name="twitter:description"
        content={description}
        key="description2"
      />

      {url && <link rel="canonical" href={absUrl} />}

      {url && <meta property="og:url" content={absUrl} key="url" />}

      {/* {url && (
        <meta
          name="apple-itunes-app"
          content={'app-id=6444136749, app-argument=' + absUrl}
        />
      )} */}

      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} key="image1" />
          <meta name="twitter:card" content="summary_large_image" key="card" />
          <meta name="twitter:image" content={imageUrl} key="image2" />
        </>
      )}
    </Head>
  )
}
