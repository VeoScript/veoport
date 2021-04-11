import Navbar from '../components/navbar'

export default function Layout ({ children }) {
  return (
    <>
      <div className="flex justify-center min-w-full">
        <Navbar />
        <div className="flex w-full h-auto">
          { children }
        </div>
      </div>
    </>
  )
}