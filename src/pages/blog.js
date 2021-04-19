import Head from 'next/head'
import Layout from '~/layouts/default'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT)

export async function getStaticProps() {
  const { posts } = await graphcms.request(
    `
    query Posts() {
      posts(orderBy: date_DESC) {
        id
        title
        excerpt
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
  `
  );

  return {
    props: {
      posts
    }
  }
}

export default function Others({ posts }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center h-screen w-full pt-5 space-y-5">
          {posts.map((post) => {
            return (
              <div className="flex flex-row justify-start items-start rounded-md bg-gray-100 dark:bg-gray-900 w-1/2 h-96 space-x-2">
                <div className="flex w-full">
                  <img className="w-96 h-60 rounded-l-md object-cover" src={post.coverImage.url} alt={post.title} />
                </div>
                <div className="relative w-full my-5 px-14 space-y-1">
                  <div className="absolute top-0 left-0">
                    <h1 className="font-bold text-base">{post.title}</h1>
                    <p className="font-light text-sm">{post.excerpt}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-24 w-full">
                   <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col w-full">
                      <p>{post.author.name}</p>
                      <p className="font-ligth text-xs text-gray-500">{post.date}</p>
                    </div>
                    <div className="flex flex-row items-center justify-end px-5 w-full">
                      <Link as={`/post/${post.slug}`} href="/post/[slug]">
                        <a className="flex px-5 py-3 bg-[#62A9FF] rounded-full font-light text-xs transition ease-in-out duration-200 transform hover:-translate-y-0.5">
                          Read More...
                        </a>
                      </Link>
                    </div>
                   </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Layout>
    </>
  );
}
