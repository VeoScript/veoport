import Navbar from '../components/navbar'

export default function Layout ({ children }) {
  return (
    <>
      <div className="flex flex-col justify-center min-w-full mx-auto w-full h-screen items-center bg-white dark:bg-[#232733]">
        <Navbar />
        <div className="flex w-full h-auto">
          { children }
        </div>
      </div>
    </>
  )
}