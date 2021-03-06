import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
import Noteslist from '~/components/notes-list'
import CreateNotesModal from '~/components/notebook-modals/modal-create-notes'
import SearchNotesFunction from '~/components/search-function/search-notes'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getServerSideProps(){
  const countAllContacts = await prisma.contact.count({
    select: {
      _all: true,
      name: true
    }
  })
  const countAllNotes = await prisma.notes.count({
    select: {
      _all: true,
      id: true
    }
  })
  const getNotes = await prisma.notes.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
  return {
    props: {
      getNotes,
      countAllNotes,
      countAllContacts
    }
  }
}

export default function Notebook({ getNotes, countAllNotes, countAllContacts }) {

  const check = getNotes.map((id) => {
    return {
      id
    }
  })

  return (
    <>
      <Head>
        <title>Phonebox (Notebook)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} countNotes={countAllNotes} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-5">
              <span className="font-bold text-xl text-scheme-dark">Notebook</span>
              <SearchNotesFunction notes={getNotes} />
              <CreateNotesModal />
            </div>
            <div className={check[0] ? 'hidden' : 'flex flex-row items-center justify-center w-full h-full mt-16'}>
              <span className="font-bold text-5xl text-scheme-light">Add some notes here...</span>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full overflow-y-auto p-10">
              <Noteslist notes={getNotes} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
