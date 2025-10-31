export const siteMeta = {
  siteName: "Artificial Consciousness Simulator",
  siteUrl: "https://artificial-consciousness-simulator.vercel.app",
  description:
    "Interactive simulator and education platform exploring Global Workspace, IIT, and Predictive Processing.",
  twitterHandle: "@acs_simulator",
}

export function buildMeta(opts?: Partial<{ title: string; description: string; image: string; url: string }>) {
  const title = opts?.title ? `${opts.title} • ${siteMeta.siteName}` : siteMeta.siteName
  const description = opts?.description ?? siteMeta.description
  const url = opts?.url ?? siteMeta.siteUrl
  const image = opts?.image ?? `${siteMeta.siteUrl}/placeholder.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteMeta.siteName,
      images: [{ url: image }],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      site: siteMeta.twitterHandle,
      creator: siteMeta.twitterHandle,
      title,
      description,
      images: [image],
    },
  }
}


