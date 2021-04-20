import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import DarkModeToggle from 'react-dark-mode-toggle'
import ReactTooltip from 'react-tooltip'
import { links, socialLinks } from '~/static/navbar'

export default function Navbar() {

  const { theme, setTheme } = useTheme()
  const toggleChange = () => theme === 'light' ? setTheme('dark') : setTheme('light')
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 mx-auto w-full z-50 bg-gray-100 border-t-2 border-gray-300 dark:border-gray-700 dark:bg-[#2C3141]">
      <div className="md:flex hidden justify-around mx-10 py-2.5 shadow-inner">
        <div className="flex justify-center">
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
        <div className="flex justify-center space-x-8">
          {links.map(({ title, href }, i) => (
            <div key={i}>
              <Link href={ href }>
                <a className={`text-sm font-light tracking-tight py-2 px-3 border-b-4 transition duration-300 capitalize ${router.pathname == href ? 'border-[#2C3141] dark:border-gray-100'  : "border-gray-100 dark:border-[#2C3141]"}`}>{ title }</a>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
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
          <ReactTooltip effect="solid" />
          <li data-tip="Home" className={`flex justify-center py-3 w-full ${router.pathname == '/' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/">
              <a>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              </a>
            </Link>
          </li>
          <li data-tip="Portfolio" className={`flex justify-center py-3 w-full ${router.pathname == '/portfolio' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
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
          <li data-tip="Contact" className={`flex justify-center py-3 w-full ${router.pathname == '/contact' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/contact">
              <a>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              </a>
            </Link>
          </li>
          <li data-tip="Blog" className={`flex justify-center py-3 w-full ${router.pathname == '/blog' ? 'bg-gray-200 dark:bg-gray-900'  : "bg-gray-50 dark:bg-[#2C3141]"}`}>
            <Link href="/blog">
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
