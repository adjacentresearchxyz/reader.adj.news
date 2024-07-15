// import { getSeoDescription, getContractOGProps } from 'common/contract-seo'
import { buildOgUrl } from '@utils/og'
import Head from 'next/head'

// export function ContractSEO(props: {
//   contract: Contract
//   /** Base64 encoded points */
//   points?: string
// }) {
//   const { contract, points } = props
//   const { question, creatorUsername, slug } = contract

//   const seoDesc = getSeoDescription(contract)
//   const ogCardProps = removeUndefinedProps({
//     ...getContractOGProps(contract),
//     points,
//   })

//   return (
//     <SEO
//       title={question}
//       description={seoDesc}
//       url={`/${creatorUsername}/${slug}`}
//       ogProps={{ props: ogCardProps, endpoint: 'market' }}
//     />
//   )
// }

export function SEO<P extends Record<string, string | undefined>>(props: {
  title: string
  description: string
  url?: string
  ogProps?: { props: P; endpoint: string }
  image?: string
}) {
  const { title, description, url, image, ogProps } = props

  const imageUrl =
    image ??
    (ogProps &&
      buildOgUrl((ogProps.props as any), ogProps?.endpoint))

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
