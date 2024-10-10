// opengraph functions that run in static props or client-side, but not in the edge (in image creation)

export function buildOgUrl<P extends Record<string, string>>(
  id: string,
  domain?: string
) {
  // Change to localhost:3000 for local testing
  const url =
    `https://${domain ?? `reader.adj.news`}/api/og/?id=${id}`

  return url
}