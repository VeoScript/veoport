import Head from 'next/head'
import Image from 'next/image'
import Layout from '~/layouts/default'

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center w-full max-w-[2400px] h-screen">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span>Recover your account</span>
          </div>
        </div>
      </Layout>
    </>
  )
}