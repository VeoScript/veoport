import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export default function ChangePassword({ online_user, closeModal }) {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleChangePassword(formData) {
    const id = online_user.id
    const old_password = formData.old_password
    const new_password = formData.new_password
    const repassword = formData.repassword

    if (old_password !== online_user.password) {
      toast.error('Old password did not match!', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    if (new_password !== repassword) {
      toast.error('Set password did not match.', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    await fetch('/api/account/change_password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        new_password
      })
    })
    reset()
    closeModal()
    router.replace('/blog')
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col w-full mt-5 space-y-1">
        <div className="flex flex-col justify-center w-full space-y-1">
          <div className="form-control flex flex-col w-full space-y-1">
            <input type="password" name="old_password" id="old_password" {...register("old_password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Old Password" disabled={ isSubmitting } />
            { errors.old_password && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
          </div>
          <div className="form-control flex flex-col w-full space-y-1">
            <input type="password" name="new_password" id="new_password" {...register("new_password", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="New Password" disabled={ isSubmitting } />
            { errors.new_password && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
          </div>
          <div className="form-control flex flex-col w-full space-y-1">
            <input type="password" name="repassword" id="repassword" {...register("repassword", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Re-enter Password" disabled={ isSubmitting } />
            { errors.repassword && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
          </div>
        </div>
        <div className="flex flex-row justify-end w-full pt-2">
          {!isSubmitting && (
            <button
              type="submit"
              className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none"
            >
              Change
            </button>
          )}
          {isSubmitting && (
            <div
              className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
            >
              Changing...
            </div>
          )}
        </div>
      </form>
    </>
  )
}