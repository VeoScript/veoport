import Navbar from '../components/navbar'

export default function Layout ({ children }) {
  return (
    <div className="flex flex-col justify-center w-full bg-white dark:bg-[#232733]">
      <Navbar />
      <div className="flex h-screen items-center">
        { children }
      </div>
    </div>
  )
}