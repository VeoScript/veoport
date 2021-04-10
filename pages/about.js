import Layout from '../layouts/default'

export default function About() {
  return (
    <>
      <Layout>
        <div className="flex flex-col md:m-0 -mt-5 justify-center mx-auto w-full h-screen items-center bg-white dark:bg-[#232733]">
          <div className="flex flex-row space-x-3">
            <p className="text-lg">THIS IS ABOUT PAGE</p>
            <span className="flex h-auto items-center font-bold text-xs text-[#333] rounded-full bg-yellow-300 px-3 py-1">Coming Soon.</span>
          </div>
        </div>
      </Layout>
    </>
  )
}