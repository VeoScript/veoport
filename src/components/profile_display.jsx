import { useRouter } from 'next/router'
import Link from 'next/link'
import Authenticate from '~/components/authenticate'
import CreateBlog from './create_blog'
import Settings from './Settings/settings'

export default function ProfileDisplay({ online_user }) {

  const router = useRouter()

  async function handleSignout() {
    await fetch('/api/auth/signout', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
      }
    })
    router.push(router.asPath)
  }

  return (
    <div className="hidden md:flex flex-col items-center w-full max-w-md h-full overflow-y-auto transition ease-in-out duration-300 bg-gray-100 dark:bg-[#262B37]">
      <div className="flex flex-col items-center w-full h-full px-10 py-10 space-y-5">
        <div className="flex flex-col w-full">
          <span className="font-bold text-2xl text-[#62A9FF]">VEO PORTAL</span>
          <span className="font-light text-sm">My daily blogs</span>
        </div>
        {!online_user && (
          <div className="flex flex-col w-full pt-5 space-y-3">
            <span className="text-xl">What's New?</span>
            <span className="font-light">
              My personal blogs and for everybody
              where export and undiscovered voices can share their writing on any topic.
            </span>
            <span className="font-light">
              Join to start sharing your thoughts and interact here in my portal.
            </span>
            <div className="flex items-center w-full space-x-2">
              <Authenticate />
            </div>
          </div>
        )}
        {online_user && (
          <div className="flex flex-col w-full pt-5 space-y-3 pb-20">
            <div className="flex flex-row items-center space-x-5">
              <img className="w-32 h-32 object-cover rounded-full ring-4 ring-[#62A9FF] bg-gray-100 dark:bg-[#1E212D]" src={ online_user.image } alt="user_profile" />
              <div className="flex flex-col">
                <span className="font-medium text-xl">{ online_user.name }</span>
                <span className="font-light text-xs text-gray-400">@{ online_user.username }</span>
                <span className="font-light text-sm text-[#333] dark:text-gray-200 mt-3">{ online_user.bio }</span>
                <div className="flex flex-row space-x-2 mt-2">
                  {online_user.facebook && (
                    <Link href={ online_user.facebook }>
                      <a target="_blank">
                        <Facebook />
                      </a>
                    </Link>
                  )}
                  {online_user.twitter && (
                    <Link href={ online_user.twitter }>
                      <a target="_blank">
                        <Twitter />
                      </a>
                    </Link>
                  )}
                  {online_user.github && (
                    <Link href={ online_user.github }>
                      <a target="_blank">
                        <Github />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2 pt-5">
              <CreateBlog
                online_user={online_user}
              />
              <Link href={`/blog/${ online_user.username }`}>
                <a className="w-full px-3 py-3 rounded-tl-2xl rounded-bl-lg rounded-tr-lg rounded-br-2xl border-2 border-[#62A9FF] text-center text-[#333] dark:text-gray-200 hover:opacity-50 transition ease-in-out duration-200 focus:outline-none">
                  My Blogs
                </a>
              </Link>
              <Settings
                online_user={online_user}
              />
              <button
                type="button"
                className="w-full px-3 py-3 rounded-tl-2xl rounded-bl-lg rounded-tr-lg rounded-br-2xl border-2 border-[#62A9FF] text-[#333] dark:text-gray-200 hover:opacity-50 transition ease-in-out duration-200 focus:outline-none"
                onClick={ handleSignout }
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Facebook() {
  return (
    <svg className="w-4 h-4 fill-current text-[#1877F2] dark:text-white transition duration-300 transform hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  )
}

function Twitter() {
  return (
    <svg className="w-4 h-4 fill-current text-[#1DA1F2] dark:text-white transition duration-300 transform hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  )
}

function Github() {
  return (
    <svg className="w-4 h-4 fill-current text-[#333] dark:text-white transition duration-300 transform hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}