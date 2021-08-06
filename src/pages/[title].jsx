import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import ProfileDisplay from '~/components/profile_display'
import EditBlog from '~/components/edit_blog'
import ReactionTriggerButton from '~/components/reaction_button'
import CommentBox from '~/components/comment_box'
import DeleteComment from '~/components/delete_comment'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'react-smooth-scrollbar'
import useSWR from 'swr'
import withSession from '~/lib/session'
import { useState } from 'react'
import { PrismaClient } from '@prisma/client'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function BlogContent({ title, all_users, online_user, get_blog_post_details, get_post_comments, get_post_likes }) {

  const initialData = get_post_comments

  const { data } = useSWR(`/api/comment/get_comments/${ title }`, fetcher, { 
    initialData,
    refreshInterval: 1000 
  })

  return (
    <>
      <Head>
        <title>{ title }</title>
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
                <div className="flex flex-col w-full p-6 space-y-5">
                  <div className="flex flex-row items-center justify-between w-full space-x-5">
                    <div className="flex flex-col w-full max-w-full space-y-3">
                      <div className="flex w-full">
                        <span className="font-bold text-3xl">{ title }</span>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center w-full space-x-2">
                          <img src={ get_blog_post_details.user.image } alt="creator" className="w-9 h-9 object-cover rounded-full bg-gray-400 dark:bg-[#151820]" />
                          <div className="flex flex-col">
                            <span className="font-normal text-[12px] text-[#62A9FF]">{ get_blog_post_details.user.name }</span>
                            <span className="font-light text-[10px] text-gray-400 -mt-1">{ get_blog_post_details.user.bio }</span>
                          </div>
                          <span className="font-light text-xs text-gray-400 pl-3">
                            <Moment date={ get_blog_post_details.date } format='LL' />  
                          </span>
                          <span className="text-xs text-gray-400">&bull;</span>
                          <span className="font-light text-xs text-gray-400">{ get_blog_post_details.tags }</span>
                        </div>
                        <div className="flex flex-row items-center justify-end w-full max-w-sm space-x-3">
                          {get_blog_post_details.published === 'published' && (
                            <>
                              <div className="flex flex-row items-center space-x-1">
                                <ReactionTriggerButton
                                  title={title}
                                  online_user={online_user}
                                  get_post_likes={get_post_likes}
                                />
                              </div>
                              <span className="text-xs text-gray-400">&bull;</span>
                            </>
                          )}
                          <Link href="/blog">
                            <a className="flex flex-row items-center space-x-2">
                              <svg className="w-4 h-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/>
                              </svg>
                              <span className="font-light text-xs text-gray-400">Blogs</span>
                            </a>
                          </Link>
                          {/* check if the logged in user is equal to the creator of the blog post if its true then this update button will display */}
                          {online_user && online_user.username === get_blog_post_details.user.username && (
                            <>
                              <span className="text-xs text-gray-400">&bull;</span>
                              <EditBlog
                                online_user={online_user}
                                get_blog_post_details={get_blog_post_details}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex w-full">
                      <img src={ get_blog_post_details.image } alt="blog_image" className="w-full h-full max-h-[24rem] object-cover object-center bg-gray-400 dark:bg-[#151820]" />
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="w-full bg-white bg-opacity-95 px-5 py-3">
                        <article className="font-sans text-xl text-[#333] prose lg:prose-xl">
                          <ReactMarkdown>
                            {!get_blog_post_details.content ? 'No content available' : get_blog_post_details.content}
                          </ReactMarkdown>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full py-3">
                    <div className="flex flex-row items-center w-full space-x-1">
                      <svg className="w-5 h-5 text-[#333] dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                      <span className="font-medium">Public Discussion</span>
                    </div>
                    <div className="flex flex-col w-full">
                      {/* check if there is logged in user then hide if there is no logged in user */}
                      {online_user && (
                        <CommentBox
                          online_user={online_user}
                          get_blog_post_details={get_blog_post_details}
                        />
                      )}
                      {/* check if there is no comments yet */}
                      {data.length == 0 && (
                        <div className="flex flex-row w-full mt-3">
                          <div className="font-bold text-xl text-gray-400">No comments yet</div>
                        </div>
                      )}
                      {/* display all comments */}
                      {data.map(({ id, comment, date, user }, i) => (
                        <div className="flex flex-col w-full mt-4" key={i}>
                          <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-row space-x-2">
                              <img className="w-10 h-10 object-cover rounded-full" src={ user.image } alt="commentor" />
                              <div className="flex flex-col">
                                <span className="font-normal text-[14px] text-[#333] dark:text-gray-300">{ user.name }</span>
                                <span className="font-light text-[11px] text-gray-400 -mt-1">{ user.bio }</span>
                                <span className="w-full max-w-md mt-2 text-xs whitespace-pre-wrap text-[#333] dark:text-gray-300">
                                  { comment }
                                </span>
                                <span className="font-light text-[11px] text-gray-400 mt-2">
                                  <Moment date={ date } format='LLLL' />
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center">
                              {/* check the logged in user if this is equal to the user that commented on the post, if its true then they can delete their own comment */}
                              {online_user && online_user.id === user.id && (
                                <DeleteComment 
                                  online_user={online_user}
                                  commentId={id}
                                />
                              )}
                            </div>
                          </div>
                          <span className="w-full mt-3 border-t border-[#333] dark:border-white opacity-25"></span>
                        </div>
                      ))}
                    </div>
                  </div>
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

  const { title } = query

  const user_session = req.session.get('user')
  
  const online_user = await prisma.user.findFirst({
    where: {
      username: `${ user_session ? user_session.username : '' }`
    }
  })

  const all_users = await prisma.user.findMany()

  const get_blog_post_details = await prisma.posts.findFirst({
    where: {
      title: title
    },
    select: {
      id: true,
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
          email: true,
          username: true,
          bio: true
        }
      }
    }
  })

  const get_post_comments = await prisma.comments.findMany({
    where: {
      postTitle: title
    },
    orderBy: [
      {
        id: 'desc'
      }
    ],
    select: {
      id: true,
      comment: true,
      date: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          bio: true
        }
      }
    }
  })

  const get_post_likes = await prisma.likes.findMany({
    where: {
      postTitle: title,
    },
    select: {
      id: true,
      postTitle: true,
      userId: true
    }
  })

  // redirect to blog page if the blog post is draft even if there is an user logged in... syempre di pwedeng makita yung post kase nga naka DRAFT.
  // it will display if the draft post is created by logged in user... syempre sa kanya yun sya may karapatan makakita.
  if (online_user && online_user.username !== get_blog_post_details.user.username && get_blog_post_details.published === 'draft') {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    }
  }

  // redirect to blog page if the blog post is draft and no user logged in...
  if (!online_user && get_blog_post_details.published === 'draft') {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    }
  }

  return {
    props: {
      title,
      all_users,
      online_user,
      get_blog_post_details,
      get_post_comments,
      get_post_likes
    }
  }
})