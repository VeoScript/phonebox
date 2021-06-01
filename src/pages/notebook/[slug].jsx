import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
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