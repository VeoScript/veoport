import Navbar from '~/components/navbar'
import MessengerCustomerChat from 'react-messenger-customer-chat'

export default function Layout ({ children }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen transition ease-in-out duration-700 overflow-y-auto bg-white dark:bg-[#232733]">
      <Navbar />
      <div className="flex w-full h-auto">
        <div className="hidden md:block">
          <MessengerCustomerChat
            pageId="101914628707986"
            appId="3871367752945149"
            shouldShowDialog="false"
          />
        </div>
        { children }
      </div>
    </div>
  )
}