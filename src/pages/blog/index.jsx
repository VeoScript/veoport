import { useState } from 'react'
import { motion } from 'framer-motion'
import Spinner from '~/lib/spinner'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import ProfileDisplay from '~/components/profile_display'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'react-smooth-scrollbar'
import useSWR from 'swr'
import withSession from '~/lib/session'
import prisma from '~/lib/prisma'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Blog({ all_users, online_user, get_published_posts }) {

  const initialData = get_published_posts

  const { data } = useSWR('/api/posts/get_posts', fetcher, { 
    initialData,
    refreshInterval: 1000 
  })

  // -- search blog section
  const [searchTerm, setSearchTerm] = useState('')
  const [isDisplay, setIsDisplay] = useState(false)

  function handleSearch(e) {
    setSearchTerm(e.target.value)
    if (!e.target.value) {
      setIsDisplay(false)
    } else {
      setIsDisplay(true)
    }
  }

  const search_results = !searchTerm ? data : data.filter(blog =>
    blog.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()
  ))
  // search blog section end --

  return (
    <>
      <Head>
        {!online_user && (
          <title>Blog</title>
        )}
        {online_user && (
          <title>Blog | { online_user.name }</title>
        )}
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center w-full max-w-[2400px] h-screen overflow-hidden text-[#333] dark:text-white">
          <div className="flex flex-row items-center justify-center w-full h-full overflow-hidden">
            <ProfileDisplay
              all_users={all_users}
              online_user={online_user}
            />
            <div className="flex flex-col w-full h-full overflow-hidden">
              <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-black border-opacity-10">
                <span>Discover and Browse</span>
                <input
                  type="text"
                  name="search_blogs"
                  className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-sm px-5 py-3 w-full max-w-xs rounded-md focus:outline-none"
                  placeholder="Search blog"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Scrollbar>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col w-full px-6 pt-3 pb-16 space-y-3"
                >
                  {!data && (
                    <div className="flex flex-row justify-center w-full">
                      <Spinner />
                    </div>
                  )}
                  {!isDisplay && (
                    <>
                      {data.map(({ image, title, content, date, tags, user, likes, comment }, i) => (
                        <Link href={`/${ title }`} key={i}>
                          <a className="flex flex-row items-center justify-between w-full h-full max-h-60 overflow-hidden border border-[#62A9FF]">
                            <div className="flex flex-col w-full max-w-full text-gray-600 dark:text-white mx-5 space-y-2">
                              <div className="flex flex-row items-center w-full space-x-2">
                                <img className="w-10 h-full max-h-10 object-cover rounded-full bg-gray-100 dark:bg-[#1E212D]" src={ user.image } alt="avatar" />
                                <div className="flex flex-col">
                                  <span className="font-medium text-sm">{ user.name }</span>
                                  <span className="font-normal text-xs text-gray-400">{ user.email }</span>
                                </div>
                              </div>
                              <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ title }</span>
                              <span className="font-light text-sm line-clamp-2">
                                <ReactMarkdown>
                                  {!content ? 'No content available' : content}
                                </ReactMarkdown> 
                              </span>
                              <div className="flex flex-row items-center text-gray-400 space-x-1">
                                <span className="font-medium text-[10px]"><Moment date={ date } format='LLLL' /></span>
                                <span>&bull;</span>
                                <span className="font-medium text-[10px]">{ tags }</span>
                              </div>
                              <div className="flex flex-row items-center text-gray-400 space-x-2">
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4 fill-current text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
                                  </svg>
                                  <span className="font-medium text-[10px]">{ likes.length }</span>
                                </div>
                                <span>&bull;</span>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4 text-[#555] dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                  </svg>
                                  <span className="font-medium text-[10px]">{ comment.length }</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row justify-end w-full max-w-lg h-full overflow-auto">
                              <img className="w-full max-w-sm h-[20rem] object-cover bg-gray-100 dark:bg-[#1E212D]" src={ image } alt="post_image" />
                            </div>
                          </a>
                        </Link>
                      ))}
                    </>
                  )}
                  {setIsDisplay && (
                    <>
                      {search_results.map(blog => (
                        <Link href={`/${ blog.title }`} key={blog.id}>
                          <a className={`${isDisplay ? 'flex' :'hidden'} flex-row items-center justify-between w-full h-full max-h-60 overflow-hidden border border-[#62A9FF]`}>
                            <div className="flex flex-col w-full max-w-full text-gray-600 dark:text-white mx-5 space-y-2">
                              <div className="flex flex-row items-center w-full space-x-2">
                                <img className="w-10 h-full max-h-10 object-cover rounded-full bg-gray-100 dark:bg-[#1E212D]" src={ blog.user.image } alt="avatar" />
                                <div className="flex flex-col">
                                  <span className="font-medium text-sm">{ blog.user.name }</span>
                                  <span className="font-normal text-xs text-gray-400">{ blog.user.email }</span>
                                </div>
                              </div>
                              <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ blog.title }</span>
                              <span className="font-light text-sm line-clamp-2">
                                <ReactMarkdown>
                                  {!blog.content ? 'No content available' : blog.content}
                                </ReactMarkdown> 
                              </span>
                              <div className="flex flex-row items-center text-gray-400 space-x-1">
                                <span className="font-medium text-[10px]"><Moment date={ blog.date } format='LLLL' /></span>
                                <span>&bull;</span>
                                <span className="font-medium text-[10px]">{ blog.tags }</span>
                              </div>
                              <div className="flex flex-row items-center text-gray-400 space-x-2">
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4 fill-current text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
                                  </svg>
                                  <span className="font-medium text-[10px]">{ blog.likes.length }</span>
                                </div>
                                <span>&bull;</span>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4 text-[#555] dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                  </svg>
                                  <span className="font-medium text-[10px]">{ blog.comment.length }</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row justify-end w-full max-w-lg h-full overflow-auto">
                              <img className="w-full max-w-sm h-[20rem] object-cover bg-gray-100 dark:bg-[#1E212D]" src={ blog.image } alt="post_image" />
                            </div>
                          </a>
                        </Link>
                      ))}
                    </>
                  )}
                </motion.div>
              </Scrollbar>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user_session = req.session.get('user')
  
  const online_user = await prisma.user.findFirst({
    where: {
      username: `${ user_session ? user_session.username : '' }`
    }
  })

  const all_users = await prisma.user.findMany()

  const get_published_posts = await prisma.posts.findMany({
    where: {
      published: 'published'
    },
    orderBy: [
      {
        date: 'desc'
      }
    ],
    select: {
      id: true,
      image: true,
      title: true,
      content: true,
      date: true,
      published: true,
      tags: true,
      likes: true,
      comment: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          username: true,
          bio: true
        }
      }
    }
  })

  return {
    props: {
      all_users,
      online_user,
      get_published_posts
    }
  }
})