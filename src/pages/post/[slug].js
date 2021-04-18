import Moment from 'react-moment'
import { fetchAPI } from '~/lib/strapi/api'
import Layout from '~/layouts/default'
import Images from '~/components/images'
import Image from 'next/image'
import Seo from '~/components/seo'
import { getStrapiMedia } from '~/lib/strapi/media' 
import { useRouter } from 'next/router'

export default function Post({ article }) {
  const router = useRouter()
  const imageUrl = getStrapiMedia(article.image)
  
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  else {
    return (
      <Layout>
        <Seo seo={seo} />
        <div className="flex flex-col justify-center w-full h-screen" data-src={imageUrl} data-srcset={imageUrl}>
          <h1>{article.title}</h1>
          <Image 
            src={imageUrl}
            alt={article.name}
            width={500}
            height={300}
            layout="intrinsic"
            loading="lazy"
          />
        </div>
        <div>
          {article.content}
        </div>
        <div>
          {article.author.picture && (
            <Images image={article.author.picture} />
          )}
        </div>
        <div>
          <p>By {article.author.name}</p>
          <p>
            <Moment format="DD, MMMM YYYY - hh:mm A">
              {article.created_at}
            </Moment>
          </p>
        </div>
      </Layout>
    )
  }
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles')

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug
      }
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}&status=published`)

  return {
    props: { 
      article: articles[0],
     },
    revalidate: 1,
  }
}
