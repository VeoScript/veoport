import Navbar from '~/components/navbar'

export default function Layout ({ children }) {
  return (
    <div className="flex flex-col justify-center min-w-full mx-auto w-full h-screen items-center transition ease-in-out duration-700 bg-white dark:bg-[#232733]">
      <Navbar />
      <div className="flex w-full h-auto">
        { children }
      </div>
    </div>
  )
}