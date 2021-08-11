import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import Scrollbar from 'react-smooth-scrollbar'
import { projects } from '~/static/portfolio'

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center w-full max-w-[2400px] h-screen overflow-y-auto">
          <Scrollbar>
            <div className="flex flex-col items-center w-full px-5 pt-5 pb-20">
              <div className="flex flex-col items-center w-full max-w-4xl space-y-3">
                <div className="flex flex-col text-center p-0 md:pl-3 w-full space-y-2">
                  <h1 className="font-bold text-2xl text-left">Portfolio</h1>
                  <p className="text-left md:text-justify text-base max-w-4xl">
                    From Desktop and Mobile development to Web Components and UX design, check out my latest projects. <br />
                    If you want to collaborate just <Link href="contact"><a className="text-[#62A9FF]">get in touch</a></Link>.
                  </p>
                </div>
                {projects.map(({ name, image, description, link, demo }, i) => (
                  <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full max-h-auto md:max-h-60 overflow-hidden border border-gray-300 dark:border-gray-700" key={i}>
                    <div className="flex flex-col w-full max-w-full md:max-w-sm text-gray-600 dark:text-white px-5 py-3 space-y-2">
                      <span className="font-semibold uppercase text-lg text-[#62A9FF]">{ name }</span>
                      <span className="font-light text-sm">
                        { description }
                      </span>
                      <div className="flex flex-row items-center text-center text-sm text-gray-400 pt-3 space-x-1">
                        <Link href={ link }>
                          <a target="_blank" className="w-full max-w-[8rem] px-3 py-2 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none">
                            Source Code
                          </a>
                        </Link>
                        <Link href={ demo }>
                          <a target="_blank" className={`${demo == '/' ? 'hidden' : 'block'} w-full max-w-[8rem] px-3 py-2 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none`}>
                            Demo
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end w-full max-w-full md:max-w-lg">
                      <img className="w-full max-w-full md:max-w-sm h-[15rem] md:h-[16rem] object-cover bg-gray-100 dark:bg-[#1E212D]" src={ image } alt="post_image" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Scrollbar>
        </div>
      </Layout>
    </>
  )
}