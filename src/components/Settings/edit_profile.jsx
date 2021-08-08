import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export default function EditProfile({ online_user, closeModal }) {

  const router = useRouter()

  const defaultValues = {
    avatar: online_user.image,
    name: online_user.name,
    email: online_user.email,
    facebook: online_user.facebook,
    twitter: online_user.twitter,
    github: online_user.github,
    bio: online_user.bio
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  async function handleEditProfile(formData) {
    const id = online_user.id
    const image = formData.avatar
    const name = formData.name
    const email = formData.email
    const facebook = formData.facebook
    const twitter = formData.twitter
    const github = formData.github
    const bio = formData.bio

    await fetch('/api/account/edit_profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        image,
        name,
        email,
        facebook,
        twitter,
        github,
        bio
      })
    })
    reset(defaultValues)
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <form onSubmit={handleSubmit(handleEditProfile)} className="flex flex-col w-full mt-5 space-y-1">
      <div className="flex flex-col md:flex-row items-center w-full space-x-0 md:space-x-2 space-y-2 md:space-y-0">
        <div className="flex flex-col w-full space-y-2">
          <div className="form-control flex flex-col space-y-1">
            <label htmlFor="avatar" className="font-normal text-xs text-gray-400 ml-2">Avatar URL</label>
            <input type="text" name="avatar" id="avatar" {...register("avatar", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Avatar URL" disabled={ isSubmitting } />
            { errors.avatar && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
          </div>
          <div className="form-control flex flex-col space-y-1">
            <label htmlFor="name" className="font-normal text-xs text-gray-400 ml-2">Name</label>
            <input type="text" name="name" id="name" {...register("name", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name" disabled={ isSubmitting } />
            { errors.name && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
          </div> 
          <div className="form-control flex flex-col space-y-1">
            <label htmlFor="email" className="font-normal text-xs text-gray-400 ml-2">Email</label>
            <input type="email" name="email" id="email" {...register("email", { required: true })} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Email" disabled={ isSubmitting } />
            { errors.email && <span className="font-medium text-xs tracking-wide text-[#62A9FF] mx-1">Required</span> }
          </div> 
        </div>
        <div className="flex flex-col w-full space-y-2">
          <div className="form-control flex flex-col space-y-1">
            <label htmlFor="facebook" className="font-normal text-xs text-gray-400 ml-2">Facebook URL</label>
            <input type="text" name="facebook" id="facebook" {...register("facebook")} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Facebook URL" disabled={ isSubmitting } />
          </div>
          <div className="form-control flex flex-col space-y-1">
            <label htmlFor="twitter" className="font-normal text-xs text-gray-400 ml-2">Twitter URL</label>
            <input type="text" name="twitter" id="twitter" {...register("twitter")} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Twitter URL" disabled={ isSubmitting } />
          </div>
          <div className="form-control flex flex-col space-y-1">
            <label htmlFor="github" className="font-normal text-xs text-gray-400 ml-2">Github URL</label>
            <input type="text" name="github" id="github" {...register("github")} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Github URL" disabled={ isSubmitting } />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full">
        <div className="form-control flex flex-col w-full space-y-1">
          <label htmlFor="bio" className="font-normal text-xs text-gray-400 ml-2">Bio</label>
          <input type="text" name="bio" id="bio" {...register("bio")} className="bg-gray-100 text-[#333] dark:bg-[#111319] dark:text-white text-base px-5 py-3 w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Bio" disabled={ isSubmitting } />
        </div>
      </div>
      <div className="flex flex-row justify-end w-full pt-2">
        {!isSubmitting && (
          <button
            type="submit"
            className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none"
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
      </div>
    </form>
  )
}