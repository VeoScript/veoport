import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export default function SignUp({ all_users, closeModal }) {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleSignUp(formData) {
    const image = formData.avatar
    const name = formData.name
    const email = formData.email
    const username = formData.username
    const password = formData.password
    const repassword = formData.repassword

    const usernameExist = all_users.some(user => user.username === username)
    const emailExist = all_users.some(user => user.email === email)

    if (usernameExist || emailExist) {
      toast.error('This account is already exist.', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    if (password !== repassword) {
      toast.error('The password did not match, try again.', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image,
        name,
        email,
        username,
        password
      })
    })
    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col w-full mt-5 space-y-1">
        <div className="form-control">
          <input type="text" name="avatar" {...register("avatar", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Avatar URL" disabled={ isSubmitting } />
          { errors.avatar && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="form-control">
          <input type="text" name="name" {...register("name", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name" disabled={ isSubmitting } />
          { errors.name && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="form-control">
          <input type="email" name="email" {...register("email", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Email" disabled={ isSubmitting } />
          { errors.email && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="form-control">
          <input type="text" name="username" {...register("username", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Username" disabled={ isSubmitting } />
          { errors.username && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="form-control">
          <input type="password" name="password" {...register("password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Password" disabled={ isSubmitting } />
          { errors.password && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="form-control">
          <input type="password" name="repassword" {...register("repassword", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Re-enter Password" disabled={ isSubmitting } />
          { errors.repassword && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
        </div>
        <div className="flex flex-row justify-end w-full">
          {!isSubmitting && (
            <button
              type="submit"
              className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80"
            >
              Sign up
            </button>
          )}
           {isSubmitting && (
            <div
              className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
            >
              Signing up...
            </div>
          )}
        </div>
      </form>
    </>
  )
}