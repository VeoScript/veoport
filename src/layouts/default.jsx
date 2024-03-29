import Navbar from '~/components/navbar'
import MessengerCustomerChat from 'react-messenger-customer-chat'

export default function Layout ({ children }) {
  return (
    <div className="font-poppins flex flex-col justify-center items-center w-full max-w-full h-screen transition ease-in-out duration-700 overflow-y-auto bg-white text-[#333] dark:bg-[#232733] dark:text-white">
      <Navbar />
      <div className="flex flex-row justify-center w-full max-w-[1450px] h-auto">
        { children }
        <MessengerCustomerChat
          pageId={process.env.MESSENGER_PAGE_ID}
          appId={process.env.MESSENGER_APP_ID}
        />
      </div>
    </div>
  )
}
