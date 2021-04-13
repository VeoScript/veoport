import Head from 'next/head'
import Layout from '~/layouts/default'
import { info } from '~/static/contact'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout>
        <div className="flex flex-col md:flex-row pb-10 mx-5 space-x-0 space-y-5 md:space-x-5 md:space-y-0 justify-around items-center w-full">
          <div className="w-full md:w-2/5 md:space-y-3 space-y-1">
            <h1 class="md:text-4xl text-xl text-[#333] font-bold dark:text-white">Get in touch</h1>
            <p class="md:text-xl text-base text-[#333] dark:text-white">If you got a project in mind, why not get in touch. Let's work together, I'm available for interesting freelance work projects.</p>
            <div className="flex flex-col space-y-1 md:space-y-3 py-5">
              {info.map(({ icon, content }, i) => (
                <div className="flex flex-row items-center space-x-5" key={i}>
                  <div>{ icon }</div>
                  <div>{ content }</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 space-y-3">
            <div className="form-control">
              <input className="bg-gray-100 text-[#333] px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none" type="text" placeholder="Name" />
            </div>
            <div className="form-control">
              <input className="bg-gray-100 text-[#333] px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none" type="email" placeholder="Email" />
            </div>
            <div className="form-control">
              <textarea className="bg-gray-100 text-[#333] px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none" placeholder="Message here..." rows="3"></textarea>
            </div>
            <div className="form-control flex justify-end">
              <button className="bg-[#62A9FF] text-white px-5 py-2 md:px-10 md:py-3 -mt-2 rounded-lg transition ease-in-out duration-700 transform hover:scale-90 focus:outline-none">Send</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}