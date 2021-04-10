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
        <div className="flex flex-col justify-center w-full h-screen items-center bg-white dark:bg-[#232733]">
          <div className="flex flex-col text-center space-y-3">
            <h1 className="name font-light text-5xl text-[#333] dark:text-white tracking-wide uppercase">Jerome Villaruel</h1>
            <p className="typewriter font-extralight tracking-wider text-lg text-[#333] dark:text-white uppercase">The odyssey of an aspiring web developer</p>
          </div>
          <div className="flex flex-col justify-center mx-auto items-center">
            <div className="my-5">
              <Image 
                className="rounded-full bg-gray-900"
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
                <a className="rounded-sm text-white bg-gray-900 w-40 text-center px-5 py-3 transition duration-300 transform hover:-translate-y-1">Know More</a>
              </Link>
              <Link href="/">
                <a className="rounded-sm text-[#333] bg-gray-300 w-40 text-center px-5 py-3 transition duration-300 transform hover:-translate-y-1">Hire Me</a>
              </Link>
            </div>
            <div className="flex font-medium text-lg">Welcome to my Landing Page ✈️</div>
            <div className="flex w-full max-w-lg text-center text-sm">
              I'm an IT and asiping Web Developer with an art & design background. I'm available for interesting freelance work projects.
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
