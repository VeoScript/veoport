import Head from 'next/head'
import Layout from '~/layouts/default'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import { info } from '~/static/contact'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()
  const sendEmail = async ({ name, email, message }) => {
    try {
      const mail = await emailjs.send(
        process.env.GMAIL_SERVICE_ID,
        process.env.TEMPLATE_ID,
        { name, email, message },
        process.env.GMAIL_USER_ID
      )
      if (mail) {
        toast.info('You email was successfully sent! Thank you for reaching out.')
        reset()
      } else {
        toast.error('Something went wrong try again.')
        reset()
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-center items-center w-full max-w-[2400px] h-screen overflow-y-auto pb-10 space-x-0 space-y-5 md:space-x-5 md:space-y-0">
          <ToastContainer draggablePercent={60} />
          <div className="flex flex-col md:flex-row justify-around items-center w-full md:w-11/12 px-5 pb-10 md:px-10 md:py-10 space-y-3 md:space-y-0">
            <div className="w-full mx-auto md:w-2/5 md:space-y-3 space-y-1">
              <div className="md:hidden flex flex-col py-5">
                {info.map(({ icon, content }, i) => (
                  <div className="flex flex-row items-center space-x-3" key={i}>
                    <div>{ icon }</div>
                    <div className="font-light text-xs md:font-normal md:text-base">{ content }</div>
                  </div>
                ))}
              </div>
              <h1 className="md:text-4xl text-2xl text-[#333] font-bold dark:text-white">Get in touch</h1>
              <p className="md:text-xl text-base text-[#333] dark:text-white">If you got a project in mind, why not get in touch. Let's work together, I'm available for interesting freelance work projects.</p>
              <div className="hidden md:flex flex-col space-y-1 md:space-y-3 py-5">
                {info.map(({ icon, content }, i) => (
                  <div className="flex flex-row items-center space-x-3" key={i}>
                    <div>{ icon }</div>
                    <div className="font-light text-xs md:font-normal md:text-base">{ content }</div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit(sendEmail)} className="w-full md:w-2/5 mx-auto space-y-3">
              <div className="form-control">
                <input type="text" name="name" {...register("name", { required: true })} className="bg-gray-100 text-[#333] text-base md:text-lg px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name" disabled={ isSubmitting } />
                { errors.name && <span className="font-medium text-xs tracking-wide text-red-600 mx-1">Name is required!</span> }
              </div>
              <div className="form-control">
                <input type="email" name="email" {...register("email", { required: true })} className="bg-gray-100 text-[#333] text-base md:text-lg px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Email" disabled={ isSubmitting } />
                { errors.email && <span className="font-medium text-xs tracking-wide text-red-600 mx-1">Email is required!</span> }
              </div>
              <div className="form-control">
                <textarea name="message" {...register("message", { required: true })} className="bg-gray-100 text-[#333] text-base md:text-lg px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Message here..." rows="3" disabled={ isSubmitting }></textarea>
                { errors.message && <span className="font-medium text-xs tracking-wide text-red-600 mx-1">Message is required!</span> }
              </div>
              <div className="form-control flex flex-col items-start md:items-end">
                <motion.button
                  className="bg-[#62A9FF] text-white text-base md:text-sm px-5 py-2 md:px-5 md:py-2 -mt-2 rounded-lg transition ease-in-out duration-200 transform hover:-translate-y-0.5 focus:outline-none"
                  whileHover={{ y: -4 }}
                  disabled={ isSubmitting }
                >
                  { isSubmitting ? <LoadingButton /> : 'Send' }
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

function LoadingButton () {
  return (
    <div className="flex items-center text-xs space-x-3">
      <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color="#000000">
        <g transform="translate(1 1)" fillRule="evenodd">
          <circle cx="5" cy="50" r="5">
            <animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"></animate></circle>
          <circle cx="27" cy="5" r="5">
            <animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="49" cy="50" r="5">
            <animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
      <span>Sending...</span>
    </div>
  )
}