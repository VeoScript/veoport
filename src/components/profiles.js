import { getStrapiMedia } from '~/lib/strapi/media'
import Image from 'next/image'

export default function Profiles({ author }) {
  const imageUrl = getStrapiMedia(author)
  return (
    <>
      <Image 
        className="rounded-full object-cover"
        src={imageUrl}
        alt={author.alternativeText || author.name}
        width={50}
        height={50}
        layout="intrinsic"
        loading="lazy"
      />
    </>
  )
}