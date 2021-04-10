import Navbar from '../components/navbar'

export default function Layout ({ children }) {
  return (
    <div className="flex justify-center w-screen min-w-full">
      <Navbar />
      <div className="flex w-full h-auto">
        { children }
      </div>
    </div>
  )
}