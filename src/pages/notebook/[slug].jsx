import Head from 'next/head'
import Layout from '~/layouts/default'
import Moment from 'react-moment'
import Sidebar from '~/components/sidebar'
import DeleteNotesModal from '~/components/notebook-modals/modal-delete-notes'
import UpdateNotesModal from '~/components/notebook-modals/modal-update-notes'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function NotebookSlug({ note, countAllNotes, countAllContacts }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{ note.title }</title>
      </Head>
      <Layout>
      <div className="flex flex-row justify-between w-full h-screen text-scheme-dark">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} countNotes={countAllNotes} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-5">
              <div className="flex flex-row items-center space-x-3">
                <button className="focus:outline-none" type="button" onClick={() => router.back()}>
                <svg className="w-6 h-6 text-scheme-dark transition ease-in-out duration-200 transform hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                </button>
                <span className="font-bold text-xl text-scheme-dark">{ note.title }</span>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <UpdateNotesModal getnote={ note } />
                <DeleteNotesModal getnote={ note } />
              </div>
            </div>
            <div className="flex flex-col w-full h-full overflow-y-auto">
              <div className="relative">
                <div className="absolute inset-0 w-full z-10">
                  <img className="w-full h-80 bg-scheme-dark object-cover" src={ note.image } alt={ note.title } />
                </div>
              </div>
              <div className="relative">
                <div className="absolute w-full inset-0 top-[17rem] z-10">
                  <div className="card flex flex-col w-full max-w-md px-5 py-3 ml-10 rounded-xl bg-opacity-95 bg-[#222] text-scheme-pale">
                    <span className="font-bold text-2xl">{ note.title }</span>
                    <div className="flex flex-col w-full space-y-1">
                      <span className="font-normal text-base">{ note.tag }</span>
                      <span className="font-light text-xs"><Moment date={ note.date } format='LLLL' /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute w-full inset-0 top-[21rem] px-5">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full px-8 py-5 pt-12 mb-10 rounded-xl font-normal text-lg text-justify shadow-xl border border-gray-400 text-[#222]">{ note.note }</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query
  const note = await prisma.notes.findFirst({
    where: {
      slug: slug
    }
  })
  const countAllNotes = await prisma.notes.count({
    select: {
      _all: true,
      id: true
    }
  })
  const countAllContacts = await prisma.contact.count({
    select: {
      _all: true,
      name: true
    }
  })
  return {
    props: {
      note,
      countAllNotes,
      countAllContacts
    }
  }
}