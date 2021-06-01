import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
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
  return {
    props: {
      countAllContacts
    }
  }
}

export default function Phonebook({countAllContacts}) {
  return (
    <>
      <Head>
        <title>Phonebook (Notebook)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center w-full border-b border-scheme-mid px-3 py-5">
              <span className="font-bold text-xl text-scheme-dark">Notebook</span>
            </div>
            <div className="flex flex-col w-full overflow-y-auto">
              <h1>This is Notebook Page</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
