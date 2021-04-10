import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../layouts/default'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jerome Villaruel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col md:m-0 -mt-5 justify-center mx-auto w-full h-screen items-center bg-white dark:bg-[#232733]">
          <div className="flex flex-col text-center space-y-3">
            <h1 className="name font-light md:text-5xl text-3xl text-[#333] dark:text-white tracking-wide uppercase">Jerome Villaruel</h1>
            <p className="typewriter font-extralight mx-auto tracking-wider md:text-lg text-xs text-[#333] dark:text-white uppercase">The odyssey of an aspiring web developer</p>
          </div>
          <div className="flex flex-col justify-center mx-auto items-center">
            <div className="my-5">
              <Image 
                className="rounded-full bg-gray-900 object-cover"
                src="/pro.jpg"
                alt="Picture of the author"
                width={150}
                height={150}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="flex space-x-2">
              <Link href="about">
                <a className="rounded-full font-bold text-white text-center md:text-sm text-xs bg-gray-900 md:w-40 w-32 md:px-5 px-3 md:py-3 py-2 transition duration-300 transform hover:-translate-y-1">Know More</a>
              </Link>
              <Link href="/">
                <a className="rounded-full font-bold text-[#222] text-center md:text-sm text-xs bg-gray-300 md:w-40 w-32 md:px-5 px-3 md:py-3 py-2 transition duration-300 transform hover:-translate-y-1">Resume</a>
              </Link>
            </div>
            <div className="flex font-medium md:text-lg text-sm">Welcome to my Landing Page ✈️</div>
            <div className="flex w-full md:max-w-lg max-w-xs  text-center md:text-sm text-xs">
              I'm an IT and asiping Web Developer with an art & design background. I'm available for interesting freelance work projects.
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
