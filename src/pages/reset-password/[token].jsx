import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import withSession from '~/lib/session'
import jwt from 'jwt-simple'

export default function ResetPassword({ token }) {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const secret = process.env.JWT_SECRET
  const decode = jwt.decode(token, secret)
  
  async function resetPassword(formData) {
    const password = formData.password
    const newpassword = formData.repassword
    const id = decode.userId

    if (password !== newpassword) {
      toast.error('The password did not match, try again.', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    await fetch('/api/auth/reset_password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        newpassword
      })
    })

    toast.success('Your password is successfully changed.', {
      style: {
        borderRadius: '10px',
        background: '#222222',
        color: '#fff',
      }
    })

    reset()
    router.push('/blog')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Layout>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <div className="flex flex-col items-center w-full max-w-[2400px] h-screen">
          <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-[#62A9FF]">VEO PORTAL</span>
              <span className="font-light text-sm">My daily blogs</span>
            </div>
            <span className="font-bold text-xl text-gray-400 dark:text-gray-300">Reset your password</span>
            <form onSubmit={handleSubmit(resetPassword)} className="flex flex-col items-center w-full max-w-xs space-y-2">
              <div className="form-control w-full">
                <input type="password" name="password" {...register("password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="New password" disabled={ isSubmitting } />
                { errors.password && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
              </div>
              <div className="form-control w-full">
                <input type="password" name="repassword" {...register("repassword", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Re-enter password" disabled={ isSubmitting } />
                { errors.repassword && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
              </div>
              {!isSubmitting && (
                <div className="form-control w-full">
                  <button
                    type="submit"
                    className="w-full px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80"
                  >
                    Reset
                  </button>
                </div>
              )}
              {isSubmitting && (
                <div className="form-control w-full">
                  <div
                    className="w-full px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
                  >
                    Wait...
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps = withSession(async function ({ req, query }) {
  const { token } = query
  const user_session = req.session.get('user')
  if (user_session) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      }
    }
  }
  return {
    props: {
      token
    }
  }
})