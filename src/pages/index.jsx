import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'

export default function Home() {
  return (
    <>
      <Head>
        <title>Phonebox</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center w-full">
          <div className="brand flex flex-row font-bold text-3xl">
            <span className="text-scheme-dark">Phone</span><span className="text-scheme-mid">box</span>
          </div>
          <div className="sub flex flex-row font-light text-base">
            <span className="text-scheme-dark">Alternative phonebook web application.</span>
          </div>
          <Link href="/home">
            <a className="mt-5 rounded-lg w-full max-w-sm px-5 py-3 font-bold text-center text-base text-scheme-sky bg-scheme-dark transition ease-in-out duration-300 transform hover:scale-95">
              Start
            </a>
          </Link>
        </div>
      </Layout>
    </>
  )
}
