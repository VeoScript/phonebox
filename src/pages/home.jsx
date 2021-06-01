import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Home({ countAllNotes, countAllContacts }) {
  return (
    <>
      <Head>
        <title>Phonebox (Home)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} countNotes={countAllNotes} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-6">
              <span className="font-bold text-xl text-scheme-dark">Home</span>
            </div>
            <div className="flex flex-row items-center justify-center w-full h-full text-[#333]">
              <span>This is Homepage</span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
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
  return {
    props: {
      countAllContacts,
      countAllNotes
    }
  }
}
