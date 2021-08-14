import { Dialog, Transition, Tab } from '@headlessui/react'
import { Fragment, useState } from 'react'
import SignIn from './AuthForms/signin'
import SignUp from './AuthForms/signup'

export default function Authenticate() {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="w-full max-w-[10rem] px-3 py-3 rounded-md transition ease-in-out duration-200 text-white bg-[#62A9FF] hover:bg-opacity-80 focus:outline-none"
        onClick={ openModal }  
      >
        Join to Portal
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left transition-all transform text-[#333] dark:text-white bg-white dark:bg-[#232733] shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-center w-full"
                >
                  <span className="font-bold text-lg">Join to Portal</span>
                  <button
                    type="button"
                    className="fixed top-5 right-5"
                    onClick={ closeModal }
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </Dialog.Title>
                <div className="flex flex-col w-full mt-5">
                  <Tab.Group>
                    <Tab.List className="flex flex-row items-center w-full">
                      <Tab
                        className={({ selected }) =>
                          selected ? 'w-full py-2 border-b-2 border-[#62A9FF]' : 'w-full py-2 border-none'
                        }
                      >
                        Sign In
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          selected ? 'w-full py-2 border-b-2 border-[#62A9FF]' : 'w-full py-2 border-none'
                        }
                      >
                        Create Account
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <SignIn
                          closeModal={closeModal}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <SignUp
                          closeModal={closeModal}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}