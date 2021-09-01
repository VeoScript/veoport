import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import bcrypt from 'bcryptjs'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function SignIn({ closeModal }) {
  
  const { data: all_users } = useSWR('/api/auth/users', fetcher, {
    refreshInterval: 1000
  })

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleSignIn(formData) {
    const username = formData.username
    const password = formData.password

    const checkUser = all_users.find(user => user.username === username)

    if (!checkUser) {
      toast.error('This account is not registered!', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    const hashPassword = checkUser.password
    const matchPassword = await bcrypt.compare(password, hashPassword)

    if (!matchPassword) {
      toast.error('Incorrect password!', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username })
    })
    reset()
    closeModal()
    router.push(router.asPath)
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col w-full mt-5 space-y-1">
        <div className="form-control">
          <input type="text" name="username" {...register("username", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Username" disabled={ isSubmitting } />
          { errors.username && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="form-control">
          <input type="password" name="password" {...register("password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Password" disabled={ isSubmitting } />
          { errors.password && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <Link href="/forgot-password">
            <a className="font-light text-xs text-[#333] dark:text-gray-200 ml-3 hover:underline">Forgot Password?</a>
          </Link>
          {!isSubmitting && (
            <button
              type="submit"
              className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80"
            >
              Sign in
            </button>
          )}
          {isSubmitting && (
            <div
              className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
            >
              Signing in...
            </div>
          )}
        </div>
      </form>
    </>
  )
}