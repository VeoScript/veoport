import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function SignIn({ closeModal }) {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleSignIn(formData) {
    const username = formData.username
    const password = formData.password

    await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }).then(async (res) => {
      if (res.ok) {
        reset()
        closeModal()
        router.push(router.asPath)
        return
      }
      const response = await res.json()
      throw new Error(response.message)
    }).catch((e) => {
        toast.error(`${e.message}`, {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
    })
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
          { errors.username && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Username is required!</span> }
        </div>
        <div className="form-control">
          <input type="password" name="password" {...register("password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Password" disabled={ isSubmitting } />
          { errors.password && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Password is required!</span> }
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