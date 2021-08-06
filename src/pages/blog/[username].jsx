import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import ProfileDisplay from '~/components/profile_display'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'react-smooth-scrollbar'
import withSession from '~/lib/session'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import { PrismaClient } from '@prisma/client'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserBlogs({ all_users, online_user, user_published_posts, user_draft_posts }) {

  const router = useRouter()

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
            <div className="flex flex-col w-full h-full overflow-y-auto pb-10">
              <Scrollbar>
                <div className="flex flex-col w-full h-full p-6 space-y-5">
                  <Tab.Group>
                    <Tab.List className="flex flex-row items-center z-30 w-full">
                      <div className="flex flex-row w-full space-x-5">
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() => router.replace('/blog')}
                        >
                          <svg className="w-6 h-6 transition ease-in-out duration-200 hover:scale-95" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                          </svg>
                        </button>
                        <div className="flex flex-col w-full">
                          <span className="font-bold text-xl">{ online_user.name }</span>
                          <span className="font-light text-sm">My Blogs</span>
                        </div>
                      </div>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            'w-full max-w-[12rem] py-3 px-5 rounded-md transition ease-in-out duration-200',
                            selected
                              ? 'border-2 border-[#62A9FF] text-center text-[#333] dark:text-gray-200'
                              : 'border-none text-center text-[#333] dark:text-gray-200'
                          )
                        }
                      >
                        Published Posts
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            'w-full max-w-[12rem] py-3 px-5 rounded-md transition ease-in-out duration-200',
                            selected
                              ? 'border-2 border-[#62A9FF] text-center text-[#333] dark:text-gray-200'
                              : 'border-none text-center text-[#333] dark:text-gray-200'
                          )
                        }
                      >
                        Draft Posts
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="flex flex-col w-full space-y-5">
                          {user_published_posts.length == 0 && (
                            <div className="flex flex-row items-center justify-center w-full z-10 -mt-20 h-screen overflow-hidden">
                              <div className="flex flex-row items-center justify-center w-full h-full">
                                <div className="font-bold text-xl text-gray-400">No Published Posts</div>
                              </div>
                            </div>
                          )}
                          {user_published_posts.map(({ image, title, content, date, tags, user }, i) => (
                            <Link href={`/${ title }`} key={i}>
                              <a className="flex flex-row items-center justify-between w-full h-full max-h-60 overflow-hidden border border-[#62A9FF]">
                                <div className="flex flex-col w-full max-w-full text-gray-600 dark:text-white mx-5 space-y-2">
                                  <div className="flex flex-row items-center w-full space-x-2">
                                    <img className="w-10 h-full max-h-10 object-cover rounded-full bg-gray-400 dark:bg-[#151820]" src={ user.image } alt="avatar" />
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{ user.name }</span>
                                      <span className="font-normal text-xs text-gray-400">{ user.email }</span>
                                    </div>
                                  </div>
                                  <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ title }</span>
                                  <span className="font-light text-sm line-clamp-2">
                                    <ReactMarkdown>{!content ? 'No content available' : content}</ReactMarkdown> 
                                  </span>
                                  <div className="flex flex-row items-center text-gray-400 space-x-1">
                                    <span className="font-medium text-[10px]"><Moment date={ date } format='LLLL' /></span>
                                    <span>&bull;</span>
                                    <span className="font-medium text-[10px]">{ tags }</span>
                                  </div>
                                </div>
                                <div className="flex flex-row justify-end w-full max-w-lg h-full overflow-auto">
                                  <img className="w-full max-w-sm h-auto object-cover bg-gray-400 dark:bg-[#151820]" src={ image } alt="post_image" />
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="flex flex-col w-full space-y-5">
                          {user_draft_posts.length == 0 && (
                            <div className="flex flex-row items-center justify-center w-full z-10 -mt-20 h-screen overflow-hidden">
                              <div className="flex flex-row items-center justify-center w-full h-full">
                                <div className="font-bold text-xl text-gray-400">No Draft Posts</div>
                              </div>
                            </div>
                          )}
                          {user_draft_posts.map(({ image, title, content, date, tags, user }, i) => (
                            <Link href={`/${ title }`} key={i}>
                              <a className="flex flex-row items-center justify-between w-full h-full max-h-60 overflow-hidden border border-[#62A9FF]">
                                <div className="flex flex-col w-full max-w-full text-gray-600 dark:text-white mx-5 space-y-2">
                                  <div className="flex flex-row items-center w-full space-x-2">
                                    <img className="w-10 h-full max-h-10 object-cover rounded-full bg-gray-400 dark:bg-[#151820]" src={ user.image } alt="avatar" />
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{ user.name }</span>
                                      <span className="font-normal text-xs text-gray-400">{ user.email }</span>
                                    </div>
                                  </div>
                                  <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ title }</span>
                                  <span className="font-light text-sm line-clamp-2">
                                    <ReactMarkdown>{!content ? 'No content available' : content}</ReactMarkdown> 
                                  </span>
                                  <div className="flex flex-row items-center text-gray-400 space-x-1">
                                    <span className="font-medium text-[10px]"><Moment date={ date } format='LLLL' /></span>
                                    <span>&bull;</span>
                                    <span className="font-medium text-[10px]">{ tags }</span>
                                  </div>
                                </div>
                                <div className="flex flex-row justify-end w-full max-w-lg h-full overflow-auto">
                                  <img className="w-full max-w-sm h-auto object-cover bg-gray-400 dark:bg-[#151820]" src={ image } alt="post_image" />
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Scrollbar>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req, query }) {
  const prisma = new PrismaClient()

  const { username } = query

  const user_session = req.session.get('user')

  if (!user_session) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    }
  }

  if (user_session.username !== username) {
    return {
      redirect: {
        destination: `/blog/${ user_session.username }`,
        permanent: false,
      },
    }
  }
  
  const online_user = await prisma.user.findFirst({
    where: {
      username: `${ user_session ? user_session.username : '' }`
    }
  })

  const all_users = await prisma.user.findMany()

  const user_published_posts = await prisma.posts.findMany({
    where: {
      user: {
        username: username
      },
      published: 'published'
    },
    orderBy: [
      {
        date: 'desc'
      }
    ],
    select: {
      image: true,
      title: true,
      content: true,
      date: true,
      published: true,
      tags: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          email: true
        }
      }
    }
  })

  const user_draft_posts = await prisma.posts.findMany({
    where: {
      user: {
        username: username
      },
      published: 'draft'
    },
    orderBy: [
      {
        id: 'desc'
      }
    ],
    select: {
      image: true,
      title: true,
      content: true,
      date: true,
      published: true,
      tags: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          email: true
        }
      }
    }
  })

  return {
    props: {
      all_users,
      online_user,
      user_published_posts,
      user_draft_posts
    }
  }
})