import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
import ContactList from '~/components/contact-list'
import CreateContactModal from '~/components/contact-modals/modal-create-contact'
import SearchFunction from '~/components/search-function'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getServerSideProps(){
  const countAllContacts = await prisma.contact.count({
    select: {
      _all: true,
      name: true
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
      countAllContacts
    }
  }
}

export default function Phonebook({data, countAllContacts}) {
  return (
    <>
      <Head>
        <title>Phonebook (Contact List)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-5">
              <span className="font-bold text-xl text-scheme-dark">Phonebook</span>
              <SearchFunction contacts={data} />
              <CreateContactModal />
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
