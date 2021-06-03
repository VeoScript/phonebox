import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function DeleteContactModal({ getcontact }) {
  const { handleSubmit, reset } = useForm()
  const router = useRouter()

  function refreshData() {
    router.replace('/phonebook')
  }

  async function deleteContact() {
    const response = await fetch(`/api/phonebook/delete-contact/${getcontact.id}`, {
      method: 'DELETE',
    })
    reset()
    refreshData()
    closeModal()
    return await response.json()
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Delete Contact
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-row items-center justify-center w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Contact
                  </Dialog.Title>
                </div>
                <div  className="flex flex-col w-full mt-5 space-y-5">
                  <div className="flex flex-col w-full space-y-1">
                    <span className="font-normal text-base text-[#333]">Are you sure you want to delete <span className="font-bold">{ getcontact.name }</span>?</span>
                  </div>
                  <div className="flex flex-row justify-center w-full space-x-2">
                    <button type="button" onClick={handleSubmit(deleteContact)} className="w-full max-w-[10rem] bg-red-600 text-white text-base text-center px-5 py-3 rounded-lg hover:bg-opacity-90 focus:outline-none">
                      Delete
                    </button>
                    <button
                      type="button"
                      className="w-full max-w-[10rem] bg-scheme-sky text-[#333] text-base text-center px-5 py-3 rounded-lg hover:bg-opacity-90 focus:outline-none"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}