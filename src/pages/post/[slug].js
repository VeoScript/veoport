import Moment from 'react-moment'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { GraphQLClient } from "graphql-request"
import { GET_BLOG_POSTS_SLUG_QUERY } from '~/graphql/queries'
import { GET_BLOG_POST_SLUG_QUERY } from '~/graphql/queries'
import Layout from '~/layouts/default'
import ReactTooltip from 'react-tooltip'
import CommentsSection from '~/components/commentview'
import CommentsDisplay from '~/components/commentdisplay'

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);

export async function getStaticProps({ params }) {
  const initialData = await graphcms.request(
    GET_BLOG_POSTS_SLUG_QUERY,
    {
      slug: params.slug,
    }
  )
  return {
    props: {
      initialData
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(GET_BLOG_POST_SLUG_QUERY)
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default function Post ({ initialData }) {
  const { data } = useSWR(GET_BLOG_POSTS_SLUG_QUERY, (query) => graphcms.request(query), {
    initialData,
    revalidateOnMount: true
  })
  const getComments = data.post.comments
  return (
    <>
      <Head>
        <title>{data.post.title}</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-center w-full h-screen text-[#333] dark:text-gray-300">
          <div className="pt-5 mb-20 mx-2 w-full">
            <div className="pb-16 rounded-xl">
              <div className="max-w-3xl shadow-lg rounded-lg mx-auto">
                <img className="h-80 rounded-t-lg flex-none w-full overflow-hidden object-cover bg-gray-300 dark:bg-gray-800" src={data.post.coverImage.url} alt={data.post.title} />
                <div className="bg-gray-100 dark:bg-gray-900 rounded-b-lg p-4 flex flex-col leading-normal">
                  <div className="mb-8 -space-y-2">
                    <div className="flex flex-col md:flex-row justify-start">
                      <div className="flex flex-row items-center space-x-3">
                        <div className="hidden md:block">
                          <ReactTooltip effect="solid" />
                          <Link href="/blog">
                            <a data-tip="Back to Blog">
                              <svg className="w-6 h-6 transition ease-in-out duration-300 transform hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                          </Link>
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-2xl">
                            {data.post.title}
                          </div>
                          <div className="flex flex-col w-full font-normal text-xs text-[#0D8CD9] space-x-3">
                            {data.post.tags.join(',\n')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-flex-col text-sm md:text-base text-left md:text-justify space-y-1 w-full h-full normal-case px-3 pt-5 md:pt-8" dangerouslySetInnerHTML={{ __html: data.post.content.html}} />
                    <div className="flex flex-col items-start md:items-end justify-center pl-3 pt-10 text-sm space-y-1">
                      <p className="font-semibold text-base leading-none">{data.post.author.name}</p>
                      <p className="font-light text-sm text-gray-500 ml-0.5">
                        <Moment format="MMMM DD, YYYY">
                          {data.post.date}
                        </Moment>
                      </p>
                      <div className="block md:hidden -mt-3 max-w-lg ml-0.5">
                        <Link href="/blog">
                          <a className="text-xs transition ease-in-out duration-200 transform hover:underline">Back to blog</a>
                        </Link>
                      </div>
                      <div className="flex flex-col w-full pt-10 -ml-2 space-y-3">
                        <CommentsSection postID={data.post.id} />
                        <div className="flex flex-col justify-center w-full pl-3 pt-5">
                          <div className="flex flex-col justify-center space-y-3">
                            {getComments.map((comm) => {
                              return (
                                <CommentsDisplay createdAt={comm.createdAt} comment={comm.comment} commentor={comm.commentor} />
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}