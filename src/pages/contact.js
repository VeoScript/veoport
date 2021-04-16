import Head from 'next/head'
import Layout from '~/layouts/default'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { info } from '~/static/contact'

export default function Contact() {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()

  const onSubmit = (formData) => {
    
    return new Promise((resolve) => {

      console.log('Sending')

      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((res) => {
        console.log('Response Recieved')
        if(res.status === 200) {
          console.log('Response Succeeded!')
          toast.info('You email was successfully sent! Thank you for reaching out.')
          reset()
        }
        
      })
      setTimeout(() => {
        resolve
      }, 3000)
    })
  }

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout>
        <div className="flex justify-center items-center w-full h-screen overflow-y-auto py-10 space-x-0 space-y-5 md:space-x-5 md:space-y-0">
          <ToastContainer draggablePercent={60} />
          <div className="flex flex-col md:flex-row justify-around items-center max-width-xl px-10 py-10">
            <div className="w-full mx-auto md:w-2/5 md:space-y-3 space-y-1">
              <h1 className="md:text-4xl text-lg text-[#333] font-bold dark:text-white">Get in touch</h1>
              <p className="md:text-xl text-xs text-[#333] dark:text-white">If you got a project in mind, why not get in touch. Let's work together, I'm available for interesting freelance work projects.</p>
              <div className="flex flex-col space-y-1 md:space-y-3 py-5">
                {info.map(({ icon, content }, i) => (
                  <div className="flex flex-row items-center space-x-3" key={i}>
                    <div>{ icon }</div>
                    <div className="font-light text-xs md:font-normal md:text-base">{ content }</div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/5 mx-auto space-y-3">
              <div className="form-control">
                <input type="text" name="name" {...register("name", { required: true })} className="bg-gray-100 text-[#333] text-xs md:text-lg px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name" disabled={ isSubmitting } />
                { errors.name && <span className="font-medium text-xs tracking-wide text-red-500 mx-3">Name is required!</span> }
              </div>
              <div className="form-control">
                <input type="email" name="email" {...register("email", { required: true })} className="bg-gray-100 text-[#333] text-xs md:text-lg px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Email" disabled={ isSubmitting } />
                { errors.email && <span className="font-medium text-xs tracking-wide text-red-500 mx-3">Email is required!</span> }
              </div>
              <div className="form-control">
                <textarea name="message" {...register("message", { required: true })} className="bg-gray-100 text-[#333] text-xs md:text-lg px-3 py-2 md:px-5 md:py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Message here..." rows="3" disabled={ isSubmitting }></textarea>
                { errors.message && <span className="font-medium text-xs tracking-wide text-red-500 mx-3">Message is required!</span> }
              </div>
              <div className="form-control flex justify-end">
                <button type="submit" className="bg-[#62A9FF] text-white text-xs md:text-sm px-5 py-2 md:px-10 md:py-2 -mt-2 rounded-lg transition ease-in-out duration-200 transform hover:-translate-y-0.5 focus:outline-none">
                  { isSubmitting ? 'Loading' : 'Send' }
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}