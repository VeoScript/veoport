import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import DarkModeToggle from 'react-dark-mode-toggle'

export default function Navbar() {

  const { theme, setTheme } = useTheme()
  const toggleChange = () => theme === 'light' ? setTheme('dark') : setTheme('light')
  const router = useRouter()

  const links = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Portfolio',
      href: '/portfolio'
    },
    {
      title: 'Contact',
      href: '/contact'
    },
    {
      title: 'Others',
      href: '/others'
    }
  ]

  const socialLinks = [
    {
      icon: <svg className="w-5 h-5 fill-current text-[#1877F2] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
      href: 'https://www.facebook.com/veoscript/'
    },
    {
      icon: <svg className="w-5 h-5 fill-current text-[#1DA1F2] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
      href: 'https://twitter.com/VeoScript43'
    },
    {
      icon: <svg className="w-5 h-5 fill-current text-[#333] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
      href: 'https://github.com/VeoScript'
    }
  ]

  return (
    <nav className="fixed bottom-0 mx-auto w-full">
      <div className="md:flex hidden justify-between py-2.5 shadow-inner bg-gray-100 dark:bg-[#2C3141]">
        <div className="flex justify-center w-full max-w-sm">
          <ul className="flex flex-row items-center space-x-5">
            {socialLinks.map(({ icon, href }, i) => (
              <li key={i}>
                <Link href={ href }>
                  <a target="_blank">{icon}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center w-full max-w-sm">
          {links.map(({ title, href }, i) => (
            <div key={i}>
              <Link href={ href }>
                <a className={`text-sm font-extralight tracking-tight py-2 px-8 border-b-4 transition duration-300 capitalize ${router.pathname == href ? 'border-[#2C3141] dark:border-gray-100'  : "border-gray-100 dark:border-[#2C3141]"}`}>{ title }</a>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full max-w-sm">
          <DarkModeToggle
            className="w-5 h-5 focus:outline-none"
            onChange={toggleChange}
            checked={theme === 'light' ? false : true}
            size={50}
          />
        </div>
      </div>
      <div className="flex md:hidden justify-around shadow-sm bg-gray-50 dark:bg-[#2C3141]">
        <ul className="flex flex-row w-full justify-around items-center">
          <li className={`flex justify-center py-3 w-full ${router.pathname == '/' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/">
              <a>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              </a>
            </Link>
          </li>
          <li className={`flex justify-center py-3 w-full ${router.pathname == '/portfolio' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/portfolio">
              <a>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
              </a>
            </Link>
          </li>
          <li className="flex flex-row justify-center items-center w-full">
            <DarkModeToggle
              className="w-5 h-5 focus:outline-none"
              onChange={toggleChange}
              checked={theme === 'light' ? false : true}
              size={50}
            />
          </li>
          <li className={`flex justify-center py-3 w-full ${router.pathname == '/contact' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/contact">
              <a>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              </a>
            </Link>
          </li>
          <li className={`flex justify-center py-3 w-full ${router.pathname == '/others' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/others">
              <a>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
