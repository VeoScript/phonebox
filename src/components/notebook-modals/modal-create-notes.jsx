import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function MyModal() {
  const defaultValues = {
    image: '',
    title: '',
    slug: '',
    note: '',
    date: new Date(),
    tag: ''
  }
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm({ defaultValues })
  const router = useRouter()

  function refreshData() {
    router.replace(router.asPath)
  }

  async function createContact(formData) {
    const response = await fetch('/api/notebook/create-notebook', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    console.log(formData)
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
          className="px-4 py-2 text-sm font-medium text-white bg-scheme-dark rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Take A Note
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
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
                <div className="flex flex-row items-center justify-between w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Take a new note...
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
                  <div className="flex flex-row w-full space-x-2">
                    <div className="flex flex-col w-full space-y-2">
                      <div className="form-control">
                        <input type="text" name="image" {...register("image", { required: true })} className="bg-gray-100 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Image URL" disabled={ isSubmitting } />
                        { errors.image && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Image URL is required!</span> }
                      </div>
                      <div className="form-control">
                        <input type="text" name="title" {...register("title", { required: true })} className="bg-gray-100 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Title" disabled={ isSubmitting } />
                        { errors.title && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Title is required!</span> }
                      </div>
                      <div className="form-control">
                        <input type="text" name="slug" {...register("slug", { required: true })} className="bg-gray-100 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Slug" disabled={ isSubmitting } />
                        { errors.slug && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Slug is required!</span> }
                      </div>
                      <div className="form-control">
                        <textarea type="text" name="note" {...register("note", { required: true })} className="bg-gray-100 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" rows="5" placeholder="Take a note..." disabled={ isSubmitting } />
                        { errors.note && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Note is required!</span> }
                      </div>
                      <div className="form-control hidden">
                        <input type="text" name="date" {...register("date", { required: true })} className="bg-gray-100 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Date" disabled={ isSubmitting } />
                      </div>
                      <div className="form-control">
                        <input type="text" name="tag" {...register("tag", { required: true })} className="bg-gray-100 text-[#333] text-base px-5 py-3 w-full rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="Tag" disabled={ isSubmitting } />
                        { errors.tag && <span className="font-medium text-xs tracking-wide text-red-500 mx-1">Tag is required!</span> }
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-end w-full">
                    <button type="submit" className="w-full max-w-[8rem] bg-scheme-dark text-white text-base text-center px-5 py-3 rounded-lg hover:bg-opacity-90 focus:outline-none">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}