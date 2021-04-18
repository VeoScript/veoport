import { getStrapiMedia } from '~/lib/strapi/media'
import Image from 'next/image'

export default function Images({ image }) {
  const imageUrl = getStrapiMedia(image)
  return (
    <>
      <Image 
        className="object-cover"
        src={imageUrl}
        alt={image.alternativeText || image.name}
        width={500}
        height={300}
        layout="intrinsic"
        loading="lazy"
      />
    </>
  )
}