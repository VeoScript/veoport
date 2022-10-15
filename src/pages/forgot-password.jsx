import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import Layout from '~/layouts/default'
import withSession from '~/lib/session'
import emailjs from 'emailjs-com'
import jwt from 'jwt-simple'
import prisma from '~/lib/prisma'

export default function ForgotPassword({ all_users }) {
  
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function forgotPassword(formData) {
    try {
      const email = formData.email
      const checkUser = all_users.find(user => user.email === email)

      if (!checkUser) {
        toast.error('Email not found, try another shot!', {
          style: {
            borderRadius: '10px',
            background: '#222222',
            color: '#fff',
          }
        })
        reset()
        return
      }

      const payload = { userId: checkUser.id }
      const secret = process.env.JWT_SECRET
      const token = jwt.encode(payload, secret)

      const name = checkUser.name
      const message = 'To reset your password in Veo Portal go to this link'
      const link = `${process.env.DOMAIN}/reset-password/${token}`
      // const link = `http://localhost:3000/reset-password/${token}`

      const mail = await emailjs.send(
        process.env.RP_SERVICE_ID,
        process.env.RP_TEMPLATE_ID,
        { name, email, message, link },
        process.env.RP_USER_ID
      )

      if (mail) {
        toast.success('Check your email to reset your new password!', {
          style: {
            borderRadius: '10px',
            background: '#222222',
            color: '#fff',
          }
        })
        reset()
        router.push('/blog')
      } else {
        toast.error('Something went wrong try again.', {
          style: {
            borderRadius: '10px',
            background: '#222222',
            color: '#fff',
          }
        })
        reset()
      }

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>Forgot Password</title>
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
            <span className="font-bold text-xl text-gray-400 dark:text-gray-300">Recover your account</span>
            <form onSubmit={handleSubmit(forgotPassword)} className="flex flex-col items-center w-full max-w-xs space-y-2">
              <div className="form-control w-full">
                <input type="text" name="email" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid Email" } })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your email" disabled={ isSubmitting } />
                { errors.email && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">{errors.email.message || 'Email is required!'}</span> }
              </div>
              {!isSubmitting && (
                <div className="form-control w-full">
                  <button
                    type="submit"
                    className="w-full px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80"
                  >
                    Confirm
                  </button>
                </div>
              )}
              {isSubmitting && (
                <div className="form-control w-full">
                  <div
                    className="w-full px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
                  >
                    Sending...
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user_session = req.session.get('user')
  if (user_session) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      }
    }
  }
  const all_users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true
    }
  })
  return {
    props: {
      all_users
    }
  }
})