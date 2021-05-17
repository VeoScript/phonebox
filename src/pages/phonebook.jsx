import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
import ContactList from '~/components/contact-list'
import { useForm } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Phonebook() {
  return (
    <>
      <Head>
        <title>Phonebook (Contact List)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-5">
              <span className="font-bold text-xl text-scheme-dark">Contact List</span>
              <MyModal />
            </div>
            <div className="flex flex-col w-full overflow-y-auto">
              <ContactList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

function MyModal() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()

  const createContact = async (formData) => {
    try{
      console.log(formData)
      reset()
    } catch (err) {
      console.error(err)
    }
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
          className="px-4 py-2 text-sm font-medium text-white bg-scheme-dark rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create New
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-row justify-between w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New Contact
                  </Dialog.Title>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
                <form onSubmit={handleSubmit(createContact)} className="flex flex-col w-full mt-5 space-y-2">
                  <div className="form-control">
                    <input type="text" name="name" {...register("name", { required: true })} className="bg-gray-50 50 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name" disabled={ isSubmitting } />
                    { errors.name && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Name is required!</span> }
                  </div>
                  <div className="form-control">
                    <input type="text" name="description" {...register("description", { required: true })} className="bg-gray-50 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Description" disabled={ isSubmitting } />
                    { errors.description && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Description is required!</span> }
                  </div>
                  <div className="form-control">
                    <input type="text" name="phone" {...register("phone", { required: true })} className="bg-gray-50 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Phone" disabled={ isSubmitting } />
                    { errors.phone && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Phone is required!</span> }
                  </div>
                  <div className="flex flex-row w-full space-x-2">
                    <div className="form-control w-full">
                      <input type="text" name="avatar_url" {...register("avatar_url", { required: true })} className="bg-gray-50 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Avatar URL" disabled={ isSubmitting } />
                      { errors.avatar_url && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Avatar URL is required!</span> }
                    </div>
                    <div className="form-control w-full">
                      <input type="text" name="slug" {...register("slug", { required: true })} className="bg-gray-50 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Slug" disabled={ isSubmitting } />
                      { errors.slug && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Slug is required!</span> }
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-scheme-dark text-white text-base text-center px-5 py-3 rounded-lg hover:bg-opacity-90 focus:outline-none">
                    Create
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
