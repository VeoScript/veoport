import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export default function SignUp({ closeModal }) {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleSignUp(formData) {
    const image = formData.image
    const password = formData.password
    const repassword = formData.repassword

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

    if (!image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      document.getElementById('custom_toast').innerText = 'Invalid image url'
      return
    }

    await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(formData)
    }).then(async (res) => {
      if (res.ok) {
        reset()
        closeModal()
        router.replace(router.asPath)
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
      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col w-full mt-5 space-y-1">
        <div className="form-control">
          <input type="text" name="image" {...register("image", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Avatar URL" disabled={ isSubmitting } />
          { errors.image && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Avatar is required!</span> }
          <span id="custom_toast" className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2"></span>
        </div>
        <div className="form-control">
          <input type="text" name="name" {...register("name", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name" disabled={ isSubmitting } />
          { errors.name && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Name is required!</span> }
        </div>
        <div className="form-control">
          <input type="text" name="email" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid Email" } })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Email" disabled={ isSubmitting } />
          { errors.email && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">{errors.email.message || 'Email is required!'}</span> }
        </div>
        <div className="form-control">
          <input type="text" name="username" {...register("username", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Username" disabled={ isSubmitting } />
          { errors.username && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Username is required!</span> }
        </div>
        <div className="form-control">
          <input type="password" name="password" {...register("password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Password" disabled={ isSubmitting } />
          { errors.password && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Password is required!</span> }
        </div>
        <div className="form-control">
          <input type="password" name="repassword" {...register("repassword", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Re-enter Password" disabled={ isSubmitting } />
          { errors.repassword && <span className="font-light text-xs tracking-wide text-gray-600 dark:text-gray-400 mx-2">Re-enter password is required!</span> }
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