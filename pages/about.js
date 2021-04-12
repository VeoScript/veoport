import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../layouts/default'

export default function About() {
  const experience = [
    {
      company: 'Specialty Pulp Manufacturing, Inc.',
      website: 'https://www.spmi-pulp.com/',
      position: 'IT Specialist',
      hired: 'February 2020 - Present'
    },
    {
      company: 'Puregold Price Club, Inc.',
      website: 'https://www.puregold.com.ph/',
      position: 'Graphic Artist',
      hired: 'August 2019 - December 2019'
    }
  ]
  const skills = [
    {
      category: 'Web Development',
      percentage: '95%',
      width: 'w-11/12'
    },
    {
      category: 'Software Development',
      percentage: '90%',
      width: 'w-10/12'
    },
    {
      category: 'Mobile App Development',
      percentage: '80%',
      width: 'w-9/12'
    },
    {
      category: 'Computer Networking',
      percentage: '100%',
      width: 'w-full'
    }
  ]
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout>
        <div className="hidden md:flex flex-col pb-10 mx-5 justify-center items-center w-full">
          <div className="flex flex-row justify-between w-full max-w-5xl space-x-3 space-y-2">
            <div className="flex justify-start mx-auto md:mt-0 mt-8 w-1/2">
              <Image
                className="bg-gray-900 object-cover text-white"
                src="/"
                alt="Picture of Jerome Villaruel"
                width={450}
                height={230}
              />
            </div>
            <div className="mx-auto md:w-1/2 w-full space-y-2">
              <h1 className="font-bold text-xl">About Me</h1>
              <p className="text-justify text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque cupiditate facilis delectus nisi possimus necessitatibus iusto obcaecati pariatur dolorum libero dolorem, tempora modi doloribus! Eos accusamus nemo expedita sapiente aperiam.
              </p>
            </div>
          </div>
          <hr className="w-full max-w-5xl my-5 border border-gray-300 dark:border-gray-700" />
          <div className="flex flex-row justify-between w-full max-w-5xl">
            <div className="flex flex-col justify-start w-full max-w-md space-y-3">
              <h1 className="text-lg ml-3">Work Experience</h1>
              <div className="flex flex-col space-y-2">
                {experience.map(({ company, website, position, hired }, i) => (
                  <div className="flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-900 px-5 py-3 rounded-full" key={i}>
                    <div className="flex flex-col justify-start">
                      <div className="font-semibold text-base ml-3">{ company }</div>
                      <div className="font-light text-sm ml-3">
                        { position }
                        <span className="ml-2 px-2 bg-gray-200 dark:bg-gray-800 text-[#333] dark:text-gray-300 rounded-full font-bold text-xs">{ hired }</span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <Link href={ website }>
                        <a target="_blank">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-start w-full max-w-lg space-y-3">
              <h1 className="text-lg ml-3">Skills</h1>
              <div className="flex flex-col space-y-3">
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
            </div>
          </div>
        </div>
        <div className="md:hidden flex flex-col pb-10 mx-3 justify-center items-start h-screen w-full">
          <div className="flex flex-col items-center my-5 w-full h-full overflow-y-auto">
            <div className="mx-3">
              <Image
                className="bg-gray-900 object-cover mx-auto text-white"
                src="/"
                alt="Picture of Jerome Villaruel"
                width={450}
                height={230}
              />
            </div>
            <div className="mx-3">
              <h1 className="font-normal text-sm">About Me</h1>
              <p className="font-light text-justify text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque cupiditate facilis delectus nisi possimus necessitatibus iusto obcaecati pariatur dolorum libero dolorem, tempora modi doloribus! Eos accusamus nemo expedita sapiente aperiam.
              </p>
            </div>
            <hr className="w-11/12 my-5 border border-gray-300 dark:border-gray-700" />
            <div className="mx-auto w-full space-y-3">
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
            <div className="flex flex-col mt-3 mx-auto w-full space-y-3">
              <h1 className="font-normal text-sm mx-3">Work Experience</h1>
              {experience.map(({ company, website, position, hired }, i) => (
                <div className="flex flex-row justify-between mx-3" key={i}>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{ company }</span>
                    <span className="font-light text-xs">{ position }</span>
                    <span className="font-thin text-xs">{ hired }</span>
                  </div>
                  <div className="flex flex-row items-center">
                    <Link href={ website }>
                      <a target="_blank">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
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