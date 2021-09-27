import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '~/layouts/default'
import { socialLinks } from '~/static/navbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jerome Villaruel</title>
        <meta name="description" content="Jerome Vilaruel Web Portal" />
        <meta name="og:title" content="Jerome Villaruel (VEOSCRIPT) Official Website" />
        <meta name="og:description" content="Jerome Vilaruel Web Portal" />
        <meta name="og:url" content="https://www.jeromevillaruel.ml/" />
        <meta name="og:type" content="website" />
      </Head>
      <Layout>
        <div className="flex flex-col md:m-0 pb-10 justify-center items-center w-full">
          <div className="flex flex-col text-center space-y-1">
            <h1 className="name font-light md:text-5xl text-3xl text-[#333] dark:text-white tracking-wide uppercase">Jerome Villaruel</h1>
            <p className="typewriter font-extralight mx-auto tracking-wider md:text-lg text-xs text-[#333] dark:text-white uppercase">The odyssey of an aspiring web developer</p>
          </div>
          <div className="flex flex-col justify-center mx-auto items-center">
            <div className="my-5">
              <img
                className="w-52 h-52 rounded-full bg-gray-100 dark:bg-[#1E212D] object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/veoportfolio.appspot.com/o/53518789_359264474666074_8114702310443057152_n.jpg?alt=media&token=e23aa87c-789d-4d65-8120-792e4e359750"
                alt="Picture of the author"
              />
            </div>
            <div className="flex md:hidden justify-center mb-5">
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
          </div>
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="flex space-x-2">
              <Link href="/about">
                <a className="rounded-sm font-bold text-white text-center md:text-sm text-xs bg-gray-900 md:w-40 w-32 md:px-5 px-3 md:py-3 py-2 transition duration-300 hover:opacity-50">Know More</a>
              </Link>
              <Link href="/files/jeromevillaruel_resume.pdf">
                <a target="_blank" className="rounded-sm font-bold text-[#333] text-center md:text-sm text-xs bg-gray-200 md:w-40 w-32 md:px-5 px-3 md:py-3 py-2 transition duration-300 hover:bg-opacity-50">Resume</a>
              </Link>
            </div>
            <div className="flex flex-col items-center py-1 space-y-0.5">
              {/* <div className="flex font-medium md:text-lg text-sm">Welcome to my Landing Page ✈️</div> */}
              <div className="flex flex-col w-full md:max-w-lg max-w-xs  text-center md:text-base text-sm">
                <span>
                  "Let's keep it simple and focus on what matters. Don't let yourself be overwhelmed."
                  -Confucius
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
