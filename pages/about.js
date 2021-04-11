import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layouts/default'

export default function About() {
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
      category: 'Networking',
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
        <div className="md:flex hidden flex-col md:m-0 -mt-5 justify-center mx-auto px-5 pt-5 w-full h-screen items-center bg-white dark:bg-[#232733]">
          <div className="flex flex-row w-full max-w-5xl space-x-2">
            <div className="mx-auto w-1/2">
              <Image
                className="bg-gray-900 object-cover"
                src="/"
                alt="Picture of Jerome Villaruel"
                width={450}
                height={230}
              />
            </div>
            <div className="mx-auto w-1/2 space-y-2">
              <h1 className="font-bold text-xl">About Me</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque cupiditate facilis delectus nisi possimus necessitatibus iusto obcaecati pariatur dolorum libero dolorem, tempora modi doloribus! Eos accusamus nemo expedita sapiente aperiam.
              </p>
            </div>
          </div>
          <hr className="w-full max-w-5xl my-5 border border-gray-300 dark:border-gray-700" />
          <div className="flex flex-row justify-between w-full max-w-5xl">
            <div className="flex flex-col justify-start w-full max-w-md space-y-3">
              <h1 className="text-lg ml-3">Work Experience</h1>
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-50 dark:bg-gray-900 px-5 py-3 rounded-full">
                  <div className="font-semibold text-lg ml-3">Specialty Pulp Manufacturing, Inc.</div>
                  <div className="font-light text-sm ml-3">
                    IT Coordinator
                    <span className="ml-2 px-2 bg-gray-100 dark:bg-gray-800 text-[#333] dark:text-gray-300 rounded-full font-bold text-xs">February 2020 - Present</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-5 py-3 rounded-full">
                  <div className="font-semibold text-lg ml-3">Puregold Price Club, Inc.</div>
                  <div className="font-light text-sm ml-3">
                    Graphic Artist
                    <span className="ml-2 px-2 bg-gray-100 dark:bg-gray-800 text-[#333] dark:text-gray-300 rounded-full font-bold text-xs">August 2019 - December 2019</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start w-full max-w-lg space-y-5">
              <h1 className="text-lg ml-3">Skills</h1>
              <div className="flex flex-col space-y-1">
                {skills.map(({ category, percentage, width }, i) => (
                  <div className="percentage mx-3 space-y-1" key={i}>
                    <div className="flex flex-row justify-between">
                      <span className="font-light text-sm">{ category }</span>
                      <span className="font-light text-sm">{ percentage }</span>
                    </div>
                    <div className="relative w-full h-5 rounded-full bg-gray-300 dark:bg-gray-600">
                      <span className={`absolute h-5 rounded-full bg-yellow-300 ${ width }`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}