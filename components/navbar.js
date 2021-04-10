import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import DarkModeToggle from "react-dark-mode-toggle"

export default function Navbar() {

  const { theme, setTheme } = useTheme()
  const toggleChange = () => theme === 'light' ? setTheme('dark') : setTheme('light')

  const router = useRouter();

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
  ];

  const socialLinks = [
    {
      icon: <svg className="w-4 h-4 fill-current text-[#1877F2] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
      href: 'https://www.facebook.com/veoscript/'
    },
    {
      icon: <svg className="w-4 h-4 fill-current text-[#1DA1F2] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
      href: 'https://twitter.com/VeoScript43'
    },
    {
      icon: <svg className="w-4 h-4 fill-current text-[#333] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
      href: 'https://github.com/VeoScript'
    },
    {
      icon: <svg className="w-4 h-4 fill-current text-[#0A66C2] dark:text-white transition duration-300 transform hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
      href: 'https://www.linkedin.com/in/jerome-villaruel-6464271aa/'
    }
  ];

  return (
    <>
      <nav className="fixed top-0 mx-auto w-full ">
        <div className="md:flex hidden justify-around py-2.5 shadow-sm bg-gray-50 dark:bg-[#2C3141]">
          <div className="flex justify-center w-full max-w-sm">
            <ul className="flex flex-row items-center space-x-3">
              {socialLinks.map(({ icon, href }, i) => (
                <li key={ i }>
                  <Link href={ href }>
                    <a target="_blank">{icon}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center w-full max-w-sm">
            {links.map(({ title, href }, i) => (
              <div key={ i }>
                <Link href={ href }>
                  <a className={`text-sm py-2 px-3 border-b-4 transition duration-300 ${router.pathname == href ? 'border-[#2C3141] dark:border-gray-50'  : "border-gray-50 dark:border-[#2C3141]"}`}>{ title }</a>
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
      </nav>
    </>
  )
}
