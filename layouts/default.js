import Navbar from '../components/navbar'

export default function Layout ({ children }) {
  return (
    <div className="flex flex-col justify-center">
      <Navbar />
      <div className="flex justify-center w-full h-screen items-center bg-white dark:bg-[#232733]">
        { children }
      </div>
    </div>
  )
}