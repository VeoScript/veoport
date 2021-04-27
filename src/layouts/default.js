import Navbar from '~/components/navbar'
import MessengerCustomerChat from 'react-messenger-customer-chat'

export default function Layout ({ children }) {
  return (
    <div className="font-sans flex flex-col justify-center items-center w-full h-screen transition ease-in-out duration-700 overflow-y-auto bg-white dark:bg-[#232733]">
      <Navbar />
      <div className="flex w-full h-auto">
        { children }
        {/**
         * This will insure that the 
         * feature show up only when the 
         * node environment is production
         */}
        {process.env.NODE_ENV === 'production' && (
          /**
           * Protect page ID
           * & APP ID inside the
           * Environement Variables
           * 1. Create file .env.local
           * 2. ADD these inside the file 
           *    - MESSENGER_PAGE_ID=YOUR-ACTUAL-VALUE-HERE
           *    - MESSENGER_APP_ID=YOUR-ACTUAL-VALUE-HERE
           * 
           * This helps to prevent the error
           * occured  during development!
           */
          <MessengerCustomerChat
            pageId={process.env.MESSENGER_PAGE_ID}
            appId={process.env.MESSENGER_APP_ID}
          />
        )}
      </div>
    </div>
  )
}