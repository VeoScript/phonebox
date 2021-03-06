import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
import ContactList from '~/components/contact-list'
import CreateContactModal from '~/components/contact-modals/modal-create-contact'
import SearchContactFunction from '~/components/search-function/search-contact'
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
  const contacts = await prisma.contact.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ],
  })
  return {
    props: {
      data: contacts,
      countAllNotes,
      countAllContacts
    }
  }
}

export default function Phonebook({data, countAllNotes, countAllContacts}) {

  const check = data.map((id) => {
    return {
      id
    }
  })

  return (
    <>
      <Head>
        <title>Phonebox (Phonebook)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} countNotes={countAllNotes} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-5">
              <span className="font-bold text-xl text-scheme-dark">Phonebook</span>
              <SearchContactFunction contacts={data} />
              <CreateContactModal />
            </div>
            <div className={check[0] ? 'hidden' : 'flex flex-row items-center justify-center w-full h-full'}>
              <span className="font-bold text-5xl text-scheme-light">No contacts available...</span>
            </div>
            <div className="flex flex-col w-full overflow-y-auto">
              <ContactList contacts={data} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
