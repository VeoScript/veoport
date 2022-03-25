import RichTextEditor from '~/lib/richtexteditor'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function CreateBlog({ online_user }) {
  
  const router = useRouter()

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    reset()
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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

  async function handleCreateBlog(formData) {
    const userId = parseInt(online_user.id)
    const image = formData.image
    const title = formData.title
    const tags = formData.tags
    const content = formData.content
    const status = formData.status

    if (!image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      document.getElementById('custom_toast').innerText = 'Invalid image url'
      return
    }

    const res = await fetch('/api/posts/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image,
        title,
        tags,
        content,
        status,
        userId
      })
    })   
    
    closeModal()
    router.replace('/blog')
  }

  return (
    <>
      <button
        type="button"
        className="w-full px-3 py-3 rounded-tl-2xl rounded-bl-lg rounded-tr-lg rounded-br-2xl border-2 border-[#62A9FF] text-[#333] dark:text-gray-200 hover:opacity-50 transition ease-in-out duration-200 focus:outline-none"
        onClick={ openModal }
      >
        Create Blog
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden align-middle text-left transition-all transform text-[#333] dark:text-white bg-white dark:bg-[#232733] shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-center w-full"
                >
                  <span className="font-bold text-lg">Create Blog</span>
                  <button
                    type="button"
                    className="fixed top-5 right-5"
                    onClick={ closeModal }
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </Dialog.Title>
                <form onSubmit={handleSubmit(handleCreateBlog)} className="flex flex-col w-full mt-5 space-y-1.5">
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
                    <div className="form-control flex flex-col space-y-1 bg-white dark:text-[#62A9FF] dark:bg-[#111319]">
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
                    </div>
                    <div className="form-control flex flex-row justify-end items-center w-full pt-0.5 space-x-1.5">
                      {!isSubmitting && (
                        <button
                          type="submit"
                          className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none"
                          disabled={ isSubmitting }
                        >
                          Create
                        </button>
                      )}
                      {isSubmitting && (
                        <div
                          className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white text-center bg-[#62A9FF] bg-opacity-50"
                        >
                          Creating...
                        </div>
                      )}
                      {!isSubmitting && (
                        <button
                          type="button"
                          className="w-full max-w-[8rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#4d4d4d] hover:bg-opacity-80 focus:outline-none"
                          disabled={ isSubmitting }
                          onClick={closeModal}
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}