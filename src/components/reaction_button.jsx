import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ReactionTriggerButton({ title, online_user, get_post_likes }) {

  const initialData = get_post_likes

  const { data } = useSWR(`/api/posts/reactions/get_reactions/${ title }`, fetcher, { 
    initialData,
    refreshInterval: 1000 
  })

  const detectLiked = online_user ? data.some(liked => liked.userId === online_user.id) : false

  //useState check if the post is liked
  const [like, setLike] = useState(detectLiked)

  //function for liking the post
  async function onLike(title) {    
    const postTitle = title
    const userId = online_user.id

    await fetch('/api/posts/reactions/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postTitle, userId })
    })
    setLike(true)
    return
  }

  //function for unliking the post
  async function onUnlike(title) {    
    const postTitle = title
    const userId = online_user.id

    await fetch('/api/posts/reactions/unlike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postTitle, userId })
    })
    setLike(false)
    return
  }

  return (
    <>
      {online_user && (
        <>
          {detectLiked && (
            <button className="focus:outline-none" type="button" onClick={async () => await onUnlike(title)}>
              <svg className="w-5 h-5 fill-current text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
              </svg>
            </button>
          )}
          {!detectLiked && (
            <button className="focus:outline-none" type="button" onClick={async () => await onLike(title)}>
              <svg className="w-5 h-5 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
              </svg>
            </button>
          )}
        </>
      )}
      {!online_user && (
        <svg className="w-5 h-5 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
        </svg>
      )}
      <span className="font-light text-xs text-gray-400">{ data.length } Volts</span>
    </>
  )
}