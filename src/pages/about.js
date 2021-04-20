import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import { experience, skills, technologies } from '~/static/about'

export default function About() {
  
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout>
        <div className="hidden md:flex pb-10 h-screen w-full">
          <div className="flex flex-col justify-center items-center h-full w-full px-5">
          <div className="flex flex-row justify-between w-full max-w-5xl space-x-10 space-y-2">
            <div className="flex justify-start mx-auto md:mt-0 mt-8 w-1/2">
              <img className="w-full h-72 rounded-sm bg-gray-900 object-cover text-white" src="/me.jpg" alt="Picture of Jerome Villaruel" />
            </div>
            <div className="mx-auto md:w-1/2 w-full space-y-5">
              <div className="space-y-1">
                <h1 className="font-bold text-lg">About Me</h1>
                <p className="text-justify text-sm">
                  Hello! My name is Jerome Villaruel better known as Veoscript, I'm a developer based Philippines. I create stunning & functional websites for small businesses remotely and I know how to set up LAN connection or other network services for your business.
                  I'm hardworking  and work on my own initiative and available for interesting freelance work projects.
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-bold text-lg">Technologies</h1>
                <div className="flex flex-row text-sm space-x-3 pt-2">
                  {technologies.map(({ name, icon }, i) => (
                    <div data-tooltip={ name } className={`${ name }`} key={i}>{ icon }</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full max-w-5xl my-3 border border-gray-100 dark:border-gray-700" />
          <div className="flex flex-row justify-between w-full max-w-5xl space-x-10">
            <div className="flex flex-col justify-start w-full max-w-lg space-y-3">
              <h1 className="font-bold text-lg">Skills</h1>
              <div className="flex flex-col space-y-3">
                {skills.map(({ category, percentage, width }, i) => (
                  <div className="percentage space-y-1" key={i}>
                    <div className="flex flex-row justify-between">
                      <span className="font-light text-xs">{ category }</span>
                      <span className="font-light text-xs">{ percentage }</span>
                    </div>
                    <div className="relative w-full h-5 rounded-full bg-gray-300 dark:bg-gray-600">
                      <span className={`absolute h-5 rounded-full bg-[#62A9FF] ${ width }`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-start w-full max-w-lg space-y-3">
              <h1 className="font-bold text-lg ml-3">Work Experience</h1>
              <div className="flex flex-col space-y-1.5">
                {experience.map(({ company, icon, website, position, hired }, i) => (
                  <div className="flex flex-row items-center justify-between border border-gray-300 dark:border-gray-700 px-5 py-3 rounded-full" key={i}>
                    <div className="flex flex-row items-center">
                      <div>
                        <img className="w-10 h-10" src={icon} />
                      </div>
                      <div className="flex flex-col justify-start">
                        <div className="font-semibold text-base ml-3">
                          { company }
                        </div>
                        <div className="font-light text-sm ml-3">
                          { position }
                          <span className="px-2 rounded-full font-semibold text-xs">- { hired }</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <Link href={ website }>
                        <a target="_blank">
                          <svg className="w-5 h-5 text-[#333] dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="md:hidden flex flex-col pb-10 justify-center items-center h-screen w-full">
          <div className="flex flex-col items-center my-5 w-full h-full overflow-y-auto">
            <div className="mx-3">
              <img className="w-full h-72 rounded-sm bg-gray-900 object-cover text-white" src="/me.jpg" alt="Picture of Jerome Villaruel" />
            </div>
            <div className="mx-3 my-3">
              <h1 className="font-normal text-sm my-2">About Me</h1>
              <p className="font-light text-justify text-xs">
                Hello! My name is Jerome Villaruel better known as Veoscript, I'm a developer based Philippines. I create stunning & functional websites for small businesses remotely and I know how to set up LAN connection or other network services for your business.
                I'm hardworking  and work on my own initiative and available for interesting freelance work projects.
              </p>
              <h1 className="font-normal text-sm my-3">Technologies</h1>
              <div className="flex flex-row space-x-3">
                {technologies.map(({ name, icon }, i) => (
                  <div className={`${ name }`} key={i}>{ icon }</div>
                ))}
              </div>
            </div>
            <hr className="w-11/12 my-1 border border-gray-100 dark:border-gray-700" />
            <div className="mx-auto my-3 w-full space-y-3">
              <h1 className="font-normal text-sm mx-3">Skills</h1>
              {skills.map(({ category, percentage, width }, i) => (
                <div className="percentage mx-3 space-y-1" key={i}>
                  <div className="flex flex-row justify-between">
                    <span className="font-light text-xs">{ category }</span>
                    <span className="font-light text-xs">{ percentage }</span>
                  </div>
                  <div className="relative w-full h-5 rounded-full bg-gray-300 dark:bg-gray-500">
                    <span className={`absolute h-5 rounded-full bg-[#62A9FF] ${ width }`}></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col mt-3 mb-5 mx-auto w-full space-y-3">
              <h1 className="font-normal text-sm mx-3">Work Experience</h1>
              {experience.map(({ company, icon, website, position, hired }, i) => (
                <div className="flex flex-row items-center justify-between px-5 py-1" key={i}>
                  <div className="flex flex-row items-center space-x-2">
                    <div>
                      <img className="w-10 h-10" src={icon} />
                    </div>
                    <div className="flex flex-col justify-start space-y-1">
                      <div className="font-semibold text-xs md:text-base ml-3">
                        { company }
                      </div>
                      <div className="font-light text-xs md:text-sm ml-3">
                        { position }
                      </div>
                      <span className="ml-1 px-2 text-gray-400 rounded-full font-normal text-xs">{ hired }</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <Link href={ website }>
                      <a target="_blank">
                        <svg className="w-5 h-5 text-[#333] dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}