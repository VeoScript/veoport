import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layouts/default'

export default function About() {
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
            <div className="mx-auto w-1/2">
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
                <div className="bg-gray-100 dark:bg-gray-900 px-5 py-3 rounded-full">
                  <div className="font-semibold text-lg ml-3">Specialty Pulp Manufacturing, Inc.</div>
                  <div className="font-light text-sm ml-3">
                    IT Coordinator
                    <span></span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 px-5 py-3 rounded-full">
                  <div className="font-semibold text-lg ml-3">Puregold Price Club, Inc.</div>
                  <div className="font-light text-sm ml-3">Graphic Artist</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start w-full max-w-lg">
              <h1>Mostly Used Languages</h1>
              <div className="flex flex-col">
                <div className="font-bold text-xl">
                  Southern Leyte State University
                  <div className="font-light text-sm">College</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}