import Moment from 'react-moment'
import Head from 'next/head'
import Link from 'next/link'
import { GraphQLClient } from "graphql-request"
import Layout from '~/layouts/default'
import ReactTooltip from 'react-tooltip'
import CommentsSection from '~/components/Comments'

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
          id
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
          id
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
                        <CommentsSection postID={post.id} />
                        <div className="flex flex-col justify-center w-full pl-3 pt-5">
                          <div className="flex flex-col justify-center space-y-3">
                            {getComments.map((comm, i) => {
                              return (
                                <div>
                                  <div className="flex flex-row items-center space-x-3" key={i}>
                                    <div>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <div className="font-bold text-sm">{comm.commentor}</div>
                                      <div className="font-semibold text-gray-500 text-xs">{comm.comment}</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row mt-3 border-t border-gray-200 dark:border-gray-800"></div>
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