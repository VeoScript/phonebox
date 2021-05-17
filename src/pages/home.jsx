import Head from 'next/head'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Phonebox (Home)</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-6">
              <span className="font-bold text-xl text-scheme-dark">Home</span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}