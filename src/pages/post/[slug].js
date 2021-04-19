import Moment from 'react-moment'
import Head from 'next/head'
import Link from "next/link"
import { GraphQLClient } from "graphql-request"
import Layout from '~/layouts/default'

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);

export async function getStaticProps({ params }) {
  const { post } = await graphcms.request(
    `
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        content{
          text
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
        date
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(`
    {
      posts {
        id
        title
        content{
          text
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
        date
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
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-center w-full h-screen text-[#333] dark:text-gray-300">
          <div className="pt-5 mb-96 mx-5 w-full">
            <div className="pb-20 rounded-xl">
              <div className="max-w-3xl shadow-lg rounded-lg mx-auto">
                <div
                  className="h-80 rounded-t-lg flex-none bg-cover text-center overflow-hidden"
                  style={{ backgroundImage: `url(${post.coverImage.url})` }}
                  title={post.title}
                />
                <div className="bg-gray-100 dark:bg-gray-900 rounded-b-lg p-4 flex flex-col items-end leading-normal">
                  <div className="mb-8 -space-y-2">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center space-x-3">
                        <div>
                          <Link href="/blog">
                            <a data-tooltip="Back">
                              <svg class="w-6 h-6 transition ease-in-out duration-300 transform hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </a>
                          </Link>
                        </div>
                        <div className="font-bold text-2xl">
                          {post.title}
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-semibold text-sm leading-none">{post.author.name}</p>
                        <p className="font-light text-right text-xs text-gray-500">
                          <Moment format="MMMM DD, YYYY">
                            {post.date}
                          </Moment>
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-justify pt-8">{post.content.text}</p>
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <div className="block md:hidden max-w-lg mx-auto">
                      <Link href="/blog">
                        <a className="flex flex-row max-w-xl items-center text-white text-xs rounded-md bg-[#62A9FF] px-3 py-2 transition ease-in-out duration-200 transform hover:-translate-y-0.5">Back to all posts...</a>
                      </Link>
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