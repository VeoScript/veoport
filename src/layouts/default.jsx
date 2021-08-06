import Navbar from '~/components/navbar'
import MessengerCustomerChat from 'react-messenger-customer-chat'

export default function Layout ({ children }) {
  return (
    <div className="font-poppins flex flex-col justify-center items-center w-full max-w-full h-screen transition ease-in-out duration-700 overflow-y-auto bg-white text-[#333] dark:bg-[#232733] dark:text-white">
      <Navbar />
      <div className="flex flex-row justify-center w-full max-w-full h-auto">
        { children }
        <MessengerCustomerChat
          pageId="101914628707986"
          appId="3871367752945149"
        />
      </div>
    </div>
  )
}