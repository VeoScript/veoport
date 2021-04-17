import Navbar from '~/components/navbar'
export default function Layout ({ children }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen transition ease-in-out duration-700 overflow-y-auto bg-white dark:bg-[#232733]">
      <Navbar />
      <div className="flex w-full h-auto">
        { children }
      </div>
    </div>
  )
}