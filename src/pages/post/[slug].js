import Moment from 'react-moment'
import { fetchAPI } from '~/lib/strapi/api'
import Layout from '~/layouts/default'
import Profiles from '~/components/profiles'
import Image from 'next/image'
import Seo from '~/components/seo'
import { getStrapiMedia } from '~/lib/strapi/media' 

export default function Post({ article }) {
  const imageUrl = getStrapiMedia(article.image)
  
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true
  }

  return (
    <Layout>
      <Seo seo={seo} />
        <div className="flex flex-col items-center justify-start h-screen w-full overflow-y-auto px-3 pt-5 pb-20 space-y-5">
          <div className="flex flex-row max-w-2xl mt-3 px-2.5">
            <div className="w-3/5">
              <Image 
                className="rounded-md"
                src={imageUrl}
                alt={article.name}
                width={500}
                height={300}
                layout="intrinsic"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-end justify-end w-2/5 space-y-0.5">
              <div className="flex flex-col md:flex-row items-center pb-5 space-x-2 space-y-2 md:space-y-0">
                <Profiles author={article.author.picture} />
                <div>
                  <p className="font-bold text-base">{article.author.name}</p>
                  <div className="font-light text-xs">
                    <Moment format="MMMM DD, YYYY - hh:mm A">
                      {article.created_at}
                    </Moment>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col max-w-2xl mt-3 px-2.5 space-y-2">
            <h1 className="font-bold text-xl">{article.title}</h1>
            <p className="text-justify">{article.content}</p>
          </div>
        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles')

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug
      }
    })),
    fallback: false
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
