import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import ProfileDisplay from '~/components/profile_display'
import MenuDisplay from '~/components/menu_display'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'react-smooth-scrollbar'
import withSession from '~/lib/session'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import prisma from '~/lib/prisma'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserBlogs({ online_user, user_published_posts, user_draft_posts }) {

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
              online_user={online_user}
            />
            <MenuDisplay
              online_user={online_user}
            />
            <div className="flex flex-col w-full h-full overflow-y-auto pb-10">
              <Scrollbar>
                <div className="flex flex-col w-full h-full p-6 space-y-5">
                  <Tab.Group>
                    <Tab.List className="flex flex-col md:flex-row items-center z-30 w-full">
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
                      <div className="flex flex-row items-center justify-center md:justify-end w-full mt-5 md:mt-0">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full max-w-full md:max-w-[12rem] text-xs md:text-base py-3 px-5 rounded-md transition ease-in-out duration-200',
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
                              'w-full max-w-full md:max-w-[12rem] text-xs md:text-base py-3 px-5 rounded-md transition ease-in-out duration-200',
                              selected
                                ? 'border-2 border-[#62A9FF] text-center text-[#333] dark:text-gray-200'
                                : 'border-none text-center text-[#333] dark:text-gray-200'
                            )
                          }
                        >
                          Draft Posts
                        </Tab>
                      </div>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="flex flex-col w-full space-y-3">
                          {user_published_posts.length == 0 && (
                            <div className="flex flex-row items-center justify-center w-full z-10 -mt-20 h-screen overflow-hidden">
                              <div className="flex flex-row items-center justify-center w-full h-full">
                                <div className="font-bold text-xl text-gray-400">No Published Posts</div>
                              </div>
                            </div>
                          )}
                          {user_published_posts.map(({ image, title, slug, content, date, tags, user, likes, comment }, i) => (
                            <Link href={`/${ slug }`} key={i}>
                              <a className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full max-h-auto md:max-h-60 overflow-hidden border border-gray-300 dark:border-gray-700">
                                <div className="flex flex-col w-full max-w-full md:max-w-sm text-gray-600 dark:text-white px-5 py-3 space-y-2">
                                  <div className="flex flex-row items-center w-full space-x-2">
                                    <img className="w-10 h-full max-h-10 object-cover rounded-full bg-gray-100 dark:bg-[#1E212D]" src={ user.image } alt="avatar" />
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{ user.name }</span>
                                      <span className="font-normal text-xs text-gray-400">{ user.email }</span>
                                    </div>
                                  </div>
                                  <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ title }</span>
                                  <span className="font-light text-sm line-clamp-2">
                                    <div dangerouslySetInnerHTML={{
                                      __html: !content || content === '<p><br></p>' ? 'No content available' : content
                                    }} />
                                  </span>
                                  <div className="flex flex-row items-center text-gray-400 space-x-1">
                                    <span className="font-medium text-[10px]">Updated <Moment date={ date } format='LL' /></span>
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
                                <div className="flex flex-row justify-end w-full max-w-full md:max-w-lg">
                                  <img className="w-full max-w-full md:max-w-sm h-[10rem] md:h-[20rem] object-cover bg-gray-100 dark:bg-[#1E212D]" src={ image } alt="post_image" />
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="flex flex-col w-full space-y-3">
                          {user_draft_posts.length == 0 && (
                            <div className="flex flex-row items-center justify-center w-full z-10 -mt-20 h-screen overflow-hidden">
                              <div className="flex flex-row items-center justify-center w-full h-full">
                                <div className="font-bold text-xl text-gray-400">No Draft Posts</div>
                              </div>
                            </div>
                          )}
                          {user_draft_posts.map(({ image, title, slug, content, date, tags, user }, i) => (
                            <Link href={`/${ slug }`} key={i}>
                              <a className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full max-h-auto md:max-h-60 overflow-hidden border border-gray-300 dark:border-gray-700">
                                <div className="flex flex-col w-full max-w-full md:max-w-sm text-gray-600 dark:text-white px-5 py-3 space-y-2">
                                  <div className="flex flex-row items-center w-full space-x-2">
                                    <img className="w-10 h-full max-h-10 object-cover rounded-full bg-gray-100 dark:bg-[#1E212D]" src={ user.image } alt="avatar" />
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{ user.name }</span>
                                      <span className="font-normal text-xs text-gray-400">{ user.email }</span>
                                    </div>
                                  </div>
                                  <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ title }</span>
                                  <span className="font-light text-sm line-clamp-2">
                                    <div dangerouslySetInnerHTML={{
                                      __html: !content || content === '<p><br></p>' ? 'No content available' : content
                                    }} />
                                  </span>
                                  <div className="flex flex-row items-center text-gray-400 space-x-1">
                                    <span className="font-medium text-[10px]">Updated <Moment date={ date } format='LL' /></span>
                                    <span>&bull;</span>
                                    <span className="font-medium text-[10px]">{ tags }</span>
                                  </div>
                                </div>
                                <div className="flex flex-row justify-end w-full max-w-full md:max-w-lg">
                                  <img className="w-full max-w-full md:max-w-sm h-[10rem] md:h-[20rem] object-cover bg-gray-100 dark:bg-[#1E212D]" src={ image } alt="post_image" />
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
      slug: true,
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
      slug: true,
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
      online_user,
      user_published_posts,
      user_draft_posts
    }
  }
})