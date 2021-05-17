import Head from 'next/head'
import Layout from '~/layouts/default'

export default function Home() {
  return (
    <>
      <Head>
        <title>Phonebox</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-center w-full">
          <span>This is Phonebox</span>
        </div>
      </Layout>
    </>
  )
}
