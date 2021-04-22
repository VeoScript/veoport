import Moment from 'react-moment'
import Head from 'next/head'
import Link from "next/link"
import { GraphQLClient } from "graphql-request"
import Layout from '~/layouts/default'
import ReactTooltip from 'react-tooltip'

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);

export async function getStaticProps({ params }) {
  const { post } = await graphcms.request(
    `
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        content{
          html
        }
        slug
        coverImage {
          id
          url
        }
        author {
          id
          name
        }
        comments {
          commentor
          comment
        }
        date
        tags
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(`
    {
      posts {
        id
        title
        content{
          html
        }
        slug
        coverImage {
          id
          url
        }
        author {
          id
          name
        }
        comments {
          commentor
          comment
        }
        date
        tags
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default function Post ({ post }) {
  const getComments = post.comments
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-center w-full h-screen text-[#333] dark:text-gray-300">
          <div className="pt-5 mb-20 mx-2 w-full">
            <div className="pb-16 rounded-xl">
              <div className="max-w-3xl shadow-lg rounded-lg mx-auto">
                <img className="h-80 rounded-t-lg flex-none w-full overflow-hidden object-cover bg-gray-300 dark:bg-gray-800" src={post.coverImage.url} alt={post.title} />
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
                            {post.title}
                          </div>
                          <div className="flex flex-col w-full font-normal text-xs text-[#0D8CD9] space-x-3">
                            {post.tags.join(',\n')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-flex-col text-sm md:text-base text-left md:text-justify space-y-1 w-full h-full normal-case px-3 pt-5 md:pt-8" dangerouslySetInnerHTML={{ __html: post.content.html}} />
                    <div className="flex flex-col items-start md:items-end justify-center pl-3 pt-10 text-sm space-y-1">
                      <p className="font-semibold text-base leading-none">{post.author.name}</p>
                      <p className="font-light text-sm text-gray-500 ml-0.5">
                        <Moment format="MMMM DD, YYYY">
                          {post.date}
                        </Moment>
                      </p>
                      <div className="block md:hidden -mt-3 max-w-lg ml-0.5">
                        <Link href="/blog">
                          <a className="text-xs transition ease-in-out duration-200 transform hover:underline">Back to blog</a>
                        </Link>
                      </div>
                      <div className="flex flex-col w-full pt-10 space-y-3">
                        <div className="flex flex-row items-center w-full space-x-2">
                          <h1 className="text-sm ml-3">Comment Section</h1>
                          <h5 className="text-xs font-light text-gray-500"><span>50</span>&nbsp;Comments</h5>
                        </div>
                        <div className="flex flex-row w-full">
                          <form className="hidden md:flex flex-row w-full">
                            <input className="max-w-xl px-5 py-3 bg-gray-200 dark:bg-gray-800 rounded-l-xl focus:outline-none" placeholder="Your Name" />
                            <textarea className="w-full px-5 py-3 bg-gray-200 dark:bg-gray-800 rounded-none border-l border-gray-400 focus:outline-none resize-none" placeholder="Comment" rows="1" />
                            <button  className="px-10 py-3 bg-gray-200 dark:bg-gray-800 rounded-r-xl border-l border-gray-400">
                              Go
                            </button>
                          </form>
                        </div>
                        <div className="flex flex-col justify-center w-full pl-3 pt-5">
                          <div className="flex flex-col justify-center space-y-3">
                            {getComments.map((comm, i) => {
                              return (
                                <div className="flex flex-row items-center space-x-3">
                                  <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                  <div className="flex flex-col" key={i}>
                                    <div className="font-bold text-sm">{comm.commentor}</div>
                                    <div className="font-normal text-xs">{comm.comment}</div>
                                  </div>
                                </div>
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
  );
};