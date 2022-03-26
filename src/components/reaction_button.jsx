import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ReactionTriggerButton({ slug, online_user, get_post_likes }) {

  const initialData = get_post_likes

  const { data } = useSWR(`/api/posts/reactions/get_reactions/${ slug }`, fetcher, { 
    initialData,
    refreshInterval: 1000 
  })

  //useState check if the post is liked
  const [like, setLike] = useState(false)

  const detectLiked = online_user ? data.some(liked => liked.userId === online_user.id) : false

  useEffect(() => {
    setLike(detectLiked)
  }, [detectLiked])

  //function for liking the post
  async function onLike(slug) {    
    const postSlug = slug
    const userId = online_user.id

    await fetch('/api/posts/reactions/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postSlug, userId })
    })
    setLike(true)
    return
  }

  //function for unliking the post
  async function onUnlike(slug) {    
    const postSlug = slug
    const userId = online_user.id

    await fetch('/api/posts/reactions/unlike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postSlug, userId })
    })
    setLike(false)
    return
  }

  return (
    <>
      {online_user && (
        <button className="outline-none" onClick={async () => {
          like ? await onUnlike(slug) : await onLike(slug)
          setLike(!like)
        }}>
          {like ? (
            <svg className="w-5 h-5 fill-current text-yellow-300 focus:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current text-gray-600 focus:text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9.417 0h6.958l-3.375 8h7l-13 16 4.375-11h-7.375z"/>
            </svg>
          )}
        </button>
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