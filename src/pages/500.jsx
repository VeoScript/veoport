import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>Internal Server Error</title>
      </Head>
      <div className="font-poppins flex flex-col justify-center items-center w-full max-w-full h-screen transition ease-in-out duration-700 overflow-y-auto bg-white text-[#333] dark:bg-[#232733] dark:text-white">
        <div className="flex flex-col items-center justify-center w-full max-w-xl space-y-5 p-10 rounded-xl text-center bg-[#f5f5f5] dark:bg-[#151820]">
          <h1 className="font-black text-8xl">500</h1>
          <h3 className="font-bold text-2xl text-[#62A9FF]">INTERNAL SERVER ERROR</h3>
          <p className="font-normal">
            The server has been deserted for a while. Please be patient or try again later. If you think something is broken, report a problem.
          </p>
          <div className="inline-flex items-center space-x-3">
            <Link href="/blog">
              <a className="w-[10rem] p-3 rounded-xl text-white bg-[#62A9FF] hover:bg-opacity-80">Return Blog</a>
            </Link>
            <Link href="https://github.com/VeoScript/veoport/issues" passHref={true}>
              <a target="_blank" className="w-[10rem] p-3 rounded-xl text-[#62A9FF] border border-[#62A9FF] hover:bg-white dark:hover:bg-[#232733]">Report Problem</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Custom500