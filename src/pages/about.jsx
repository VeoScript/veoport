import Head from 'next/head'
import Layout from '~/layouts/default'
import { experience, services } from '~/static/about'

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-start md:justify-center space-y-5 pt-6 md:pt-0 pb-10 h-screen w-full max-w-[2400px]">
          <div className="flex flex-col md:flex-row items-center justify-center w-full space-x-0 md:space-x-10 space-y-5 md:space-y-0">
            <div className="flex justify-center w-full max-w-full md:max-w-xs px-5">
              <img
                className="w-52 h-52 object-cover rounded-full bg-gray-100 dark:bg-[#1E212D]"
                src="https://firebasestorage.googleapis.com/v0/b/veoportfolio.appspot.com/o/53518789_359264474666074_8114702310443057152_n.jpg?alt=media&token=e23aa87c-789d-4d65-8120-792e4e359750"
                alt="veo"
              />
            </div>
            <div className="flex justify-center w-full max-w-full md:max-w-xl px-5">
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-xl text-[#333] dark:text-white">About Me</span>
                <p className="font-light text-sm">
                  Hello! My name is Jerome Villaruel better known as Veoscript,
                  I'm a developer based Philippines. I create stunning & functional websites for small businesses remotely using
                  React, Next JS, PostgreSQL, and MySQL and I can manage databases, network topologies or other network services for your business.
                  I'm hardworking and work on my own initiative, also available for interesting freelance work projects.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center w-full pt-3 md:pt-0 pb-20 md:pb-0 space-x-0 md:space-x-10 space-y-10 md:space-y-0">
            <div className="flex justify-start md:justify-center w-full max-w-full md:max-w-xs px-5 md:px-0">
              <div className="flex flex-col space-y-5">
                <span className="font-bold text-lg text-[#333] dark:text-white">Experience</span>
                {experience.map(({ company, icon, position, hired }, i) => (
                  <div className="flex flex-row items-center w-full space-x-2" key={i}>
                    <div className="flex">
                      <img className="w-8 h-8 object-center" src={icon} alt="company" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px]">{ company }</span>
                      <span className="font-light text-[12px]">{ position }</span>
                      <span className="font-light text-[10px]">{ hired }</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center w-full max-w-full md:max-w-xl px-5">
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-lg text-[#333] dark:text-white">Skills & Services</span>
                <div className="flex flex-col w-full space-y-2">
                  {services.map(({ icon, title, description }, i) => (
                    <div className="flex flex-row items-center w-full px-5 py-3 space-x-5 rounded-md border-2 border-[#62A9FF]" key={i}>
                      <div className="flex">
                        <span>{ icon }</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#62A9FF]">{ title }</span>
                        <span className="font-normal text-[12px]">{ description }</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}