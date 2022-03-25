import Head from 'next/head'
import RichTextEditor from '~/lib/richtexteditor'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { Fragment, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import withSession from '~/lib/session'
import prisma from '~/lib/prisma'

const EditBlogPage = ({ online_user, get_blog_post_details }) => {
  const defaultValues = {
    image: get_blog_post_details.image,
    title: get_blog_post_details.title,
    tags: get_blog_post_details.tags,
    content: get_blog_post_details.content,
    status: get_blog_post_details.published
  }

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  const router = useRouter()
  
  const handleImageUpload = (file) => new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('image', file)

    fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    })

    .then((response) => response.json())
    .then((result) => resolve(result.data.url))
    .catch(() => reject(new Error('Upload failed')))
  })

  async function handleEditBlog(formData) {
    const userId = parseInt(online_user.id)
    const postId = parseInt(get_blog_post_details.id)
    const image = formData.image
    const title = formData.title
    const tags = formData.tags
    const content = formData.content
    const status = formData.status

    if (!image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      document.getElementById('custom_toast').innerText = 'Invalid image url'
      return
    }

    await fetch('/api/posts/update_post', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image,
        title,
        tags,
        content,
        status,
        userId,
        postId
      })
    })
    reset()
    router.push(`/${formData.title}`)

    toast.success('Updated Successfully. Thank you for your blogging.', {
      style: {
        borderRadius: '10px',
        background: '#222222',
        color: '#fff',
      }
    })
  }

  return (
    <Fragment>
      <Head>
        <title>Edit Blog ({ get_blog_post_details.title })</title>
      </Head>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <div className="inline-flex justify-center w-full max-full h-screen overflow-y-auto align-middle text-left transition-all transform text-[#333] dark:text-white bg-white dark:bg-[#232733]">
        <div className="flex flex-col items-center w-full max-w-3xl p-10">
          <div className="flex flex-row items-center justify-center w-full">
            <span className="font-bold text-lg">Edit Blog</span>
          </div>
          <form onSubmit={handleSubmit(handleEditBlog)} className="flex flex-col w-full mt-5 pb-10 space-y-1.5">
            <div className="flex flex-col w-full space-y-2">
              <div className="form-control flex flex-col space-y-1">
                <label htmlFor="image" className="font-normal text-xs text-gray-400 ml-2">Image URL</label>
                <input type="text" name="image" id="image" {...register("image", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Image URL" disabled={ isSubmitting } />
                { errors.image && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
                <span id="custom_toast" className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1"></span>
              </div>
              <div className="form-control flex flex-col space-y-1">
                <label htmlFor="title" className="font-normal text-xs text-gray-400 ml-2">Title</label>
                <input type="text" name="title" id="title" {...register("title", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Title" disabled={ isSubmitting } />
                { errors.title && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
              </div>
              <div className="form-control flex flex-col space-y-1">
                <label htmlFor="tags" className="font-normal text-xs text-gray-400 ml-2">Tags</label>
                <input type="text" name="tags" id="tags" {...register("tags", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Tags" disabled={ isSubmitting } />
                { errors.tags && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
              </div>
              <div className="form-control flex flex-col space-y-1">
                <label htmlFor="status" className="font-normal text-xs text-gray-400 ml-2">Status</label>
                <select
                  id="status"
                  className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("status", { required: true })}
                  disabled={isSubmitting}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Publish</option>
                </select>
                { errors.title && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
              </div>
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, onBlur, value } }) => (
                  <RichTextEditor
                    classNames={{
                      root: 'border border-[#B6B6B6] dark:border-[#111319] bg-white text-lg text-[#333] dark:bg-[#222632] dark:text-white',
                      toolbar: 'border-b border-[#B6B6B6] dark:border-[#111319] bg-gray-50 text-[#333] dark:bg-[#111319] dark:text-white',
                      toolbarControl: 'border border-[#B6B6B6] dark:border-[#111319] bg-white text-[#333] dark:bg-[#222632] dark:text-white'
                    }}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    onImageUpload={handleImageUpload}
                  />
                )}
              />
              <div className="form-control flex flex-row justify-end items-center w-full pt-0.5 space-x-1.5">
                {!isSubmitting && (
                  <button
                    type="submit"
                    className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none"
                    disabled={ isSubmitting }
                  >
                    Update
                  </button>
                )}
                {isSubmitting && (
                  <div
                    className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
                  >
                    Updating...
                  </div>
                )}
                {!isSubmitting && (
                  <button
                    type="button"
                    className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#4d4d4d] hover:bg-opacity-80 focus:outline-none"
                    disabled={ isSubmitting }
                    onClick={() => router.push(`/${get_blog_post_details.title}`)}
                  >
                    Cancel
                  </button>
                )}
                {isSubmitting && (
                  <div
                    className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#4d4d4d] bg-opacity-50"
                  >
                    Cancel
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export const getServerSideProps = withSession(async function ({ req, query }) {
  const { title } = query

  const user_session = req.session.get('user')
  
  const online_user = await prisma.user.findFirst({
    where: {
      username: `${ user_session ? user_session.username : '' }`
    }
  })

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
      online_user,
      get_blog_post_details,
      get_post_comments,
      get_post_likes
    }
  }
})

export default EditBlogPage