import { useForm } from 'react-hook-form'

export default function Comments ({ postID }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()
  const onSubmit = async ({ comment, commentor }) => {
    try {
      const response = await fetch('/api/comment-trigger', {
        method: 'POST',
        body: JSON.stringify({ postID, comment, commentor })
      })
      console.log(JSON.stringify({ postID, comment, commentor }))
      reset()
      if (!response.ok)
        throw new Error(`Something went wrong submitting the form. Try to comment again.`)  
    } catch (err) {
      console.log(err)
    }

    try {
      const response = await fetch('/api/comment-stage', {
        method: 'POST',
        body: JSON.stringify({ postID })
      })
      console.log(JSON.stringify({ postID }))
      reset()
      if (!response.ok)
        throw new Error(`Something went wrong publishing comment. Try to comment again.`)  
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} >
        <div className="flex flex-row items-center w-full space-x-2">
          <h1 className="text-sm ml-3">Comment Section</h1>
          <h5 className="text-xs font-light text-gray-500"><span>50</span>&nbsp;Comments</h5>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row w-full space-y-1 md:space-y-0">
            <div className="flex flex-col w-full md:w-8/12 space-y-1">
              <input type="text" name="commentor" {...register("commentor", { required: true })} className="px-5 py-3 text-xs md:text-sm bg-gray-200 dark:bg-gray-800 rounded-none md:rounded-l-xl focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Your Name" disabled={ isSubmitting } />
              { errors.commentor && <span className="font-light md:font-medium text-xs tracking-wide text-red-600 mx-3">Name is required</span> }
            </div>
            <div className="flex flex-col w-full md:w-11/12 space-y-1">
              <textarea type="text" name="comment" {...register("comment", { required: true })} className="px-5 py-3 text-xs md:text-sm bg-gray-200 dark:bg-gray-800 rounded-none border-l border-transparent md:border-gray-400 focus:outline-none resize-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Comment" rows="1" disabled={ isSubmitting } />
              { errors.comment && <span className="font-light md:font-medium text-xs tracking-wide text-red-600 mx-3">Comment is required</span> }
            </div>
            <div className="flex flex-col items-end md:items-start w-full md:w-3/12">
              <button type="submit" className="px-10 py-3 text-xs md:text-sm bg-gray-200 dark:bg-gray-800 rounded-none md:rounded-r-xl border-l border-transparent md:border-gray-400 focus:outline-none" disabled={ isSubmitting }>
                { isSubmitting ? <LoadingButton /> : 'Go' }
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

function LoadingButton () {
  return (
    <div className="flex items-center text-xs space-x-3">
      <svg className="w-5 h-5 fill-current text-[#333] dark:text-white" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color="#000000">
        <g transform="translate(1 1)" fillRule="evenodd">
          <circle cx="5" cy="50" r="5">
            <animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"></animate></circle>
          <circle cx="27" cy="5" r="5">
            <animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="49" cy="50" r="5">
            <animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
      <span>Wait...</span>
    </div>
  )
}