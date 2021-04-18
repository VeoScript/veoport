import Layout from '~/layouts/default'
import { fetchAPI } from '~/lib/strapi/api'
import Posts from '~/components/posts'

export default function Others({ articles, homepage }) {
  return (
    <Layout>
      <div className="flex flex-col items-center px-5 md:p-0 h-screen w-full">
        <div className="pb-20">
          <div className="flex flex-col py-5">
            <h1 className="font-bold text-lg">Jerome Villaruel</h1>
            <p className="font-light text-sm">{ homepage.hero.title }</p>
          </div>
          <div className="flex space-y-5">
            <Posts articles={articles} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI('/articles?status=published'),
    fetchAPI('/categories'),
    fetchAPI('/homepage')
  ])
  return {
    props: { articles, categories, homepage },
    revalidate: 1
  }
}