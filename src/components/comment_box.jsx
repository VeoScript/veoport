import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function CommentBox({ online_user, get_blog_post_details }) {

  const defaultValues = {
    comment_box: ''
  }

  const { register, handleSubmit, reset, setValue, setError, formState: { isSubmitting } } = useForm({ defaultValues })

  useEffect(() => {
    register('comment_box', { required: true })
  }, [register])

  async function handleComment(formData) {
    const postTitle = get_blog_post_details.title
    const userId = parseInt(online_user.id)
    const comment = formData.comment_box

    if(document.getElementById('comment_box_id').innerText.trim().length == 0 || comment === ''){
      setError('comment_box')
      return
    }

    await fetch('/api/comment/create_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment,
        postTitle,
        userId
      })
    })

    reset()
    comment_box_id.innerText = ''
    document.getElementById('comment_box_id').focus()
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(handleComment)()
    }
  }

  return (
    <div className="flex flex-row items-center w-full mt-4 space-x-2">
      <img className="w-10 h-10 object-cover rounded-full bg-gray-100 dark:bg-[#1E212D]" src={ online_user.image } alt="commentor" />
      <form onSubmit={handleSubmit(handleComment)} className="flex flex-row items-center justify-between w-full px-4 py-1.5 rounded-md bg-gray-100 dark:bg-[#262B37]">
        <div
          contentEditable
          id="comment_box_id"
          className={`${ isSubmitting ? 'hidden' : 'block' } w-full h-full max-h-[5rem] overflow-y-auto whitespace-pre-wrap text-xs cursor-text focus:outline-none font-light py-2`}
          placeholder="Comment here..."
          onInput={(e) => setValue('comment_box', e.currentTarget.textContent, { shouldValidate: true })}
          onKeyPress={handleKeyPress}
        />
        <span className={`${ isSubmitting ? 'block' : 'hidden' } w-full h-full max-h-[5rem] overflow-y-auto whitespace-pre-wrap text-xs cursor-text focus:outline-none font-light py-2`}>
          Commenting...
        </span>
        <div className="flex flex-row items-center justify-end space-x-3">
          {isSubmitting
            ?
            <LoadingButton />
            :
            <button type="submit" className="flex flex-row justify-end w-full text-[#272727] dark:text-white transition ease-in-out duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
              </svg>
            </button>
          }
        </div>
      </form>
    </div>
  )
}

function LoadingButton() {
  return (
    <div className="flex">
      <svg width="32px" height="32px" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" color="#62A9FF">
        <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
          <circle cx="22" cy="22" r="6">
            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="6">
            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="8">
            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </div>
  )
}