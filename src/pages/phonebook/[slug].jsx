import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import Sidebar from '~/components/sidebar'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function PhoneBookSlug({ contact, countAllContacts }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{ contact.name }</title>
      </Head>
      <Layout>
        <div className="flex flex-row justify-between w-full h-screen text-scheme-dark">
          <div className="flex flex-col w-full max-w-sm h-auto border-r border-scheme-mid px-3 py-5">
            <Sidebar getCount={countAllContacts} />
          </div>
          <div className="flex flex-col w-full max-w-full h-auto">
            <div className="flex flex-row items-center justify-between w-full border-b border-scheme-mid px-3 py-5">
              <div className="flex flex-row items-center space-x-3">
                <button className="focus:outline-none" type="button" onClick={() => router.back()}>
                <svg className="w-6 h-6 text-scheme-dark transition ease-in-out duration-200 transform hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                </button>
                <span className="font-bold text-xl text-scheme-dark">{ contact.name }</span>
              </div>
              <div className="flex flex-row items-center">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-scheme-dark rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full h-full overflow-y-auto">
              <div className="relative">
                <div className="absolute w-full">
                  <img className="w-full h-48 bg-scheme-dark object-cover" src="https://c0.wallpaperflare.com/preview/546/793/162/aesthetics-grunge-vintage-retro.jpg" alt="coverphoto" />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 top-24">
                  <div className="flex flex-col w-full pb-5 space-y-5">
                    <div class="flex flex-row items-center justify-center w-full h-auto">
                      <img className="w-44 h-44 ring-4 ring-[#fff] rounded-full bg-scheme-dark object-cover" src={ contact.avatar_url } alt="contact_avatar" />
                    </div>
                    <div className="flex flex-col items-center w-full">
                      <span className="font-bold text-3xl">{ contact.name }</span>
                      <span className="font-light text-base">{ contact.description }</span>
                      <div className="flex flex-col w-full mt-5 px-5 text-scheme-sky space-y-10">
                        <div className="flex flex-row justify-center w-full space-x-3">
                          <Link href="/">
                            <a>
                              <FacebookIcon />
                            </a>
                          </Link>
                          <Link href="/">
                            <a>
                              <TwitterIcon />
                            </a>
                          </Link>
                          <Link href="/">
                            <a>
                              <InstagramIcon />
                            </a>
                          </Link>
                          <Link href="/">
                            <a>
                              <TiktokIcon />
                            </a>
                          </Link>
                          <Link href="/">
                            <a>
                              <YoutubeIcon />
                            </a>
                          </Link>
                        </div>
                        <div className="flex flex-row w-full space-x-2">
                          <div className="flex flex-col w-full max-w-sm space-y-2">
                            <div className="flex w-full px-5 py-3 rounded-lg bg-scheme-light text-scheme-dark">
                              <span className="font-bold text-xl">Intro</span>
                            </div>
                            <div className="flex w-full px-5 py-3 rounded-lg bg-scheme-light text-scheme-dark">
                              <span className="font-normal text-base">
                                You’re braver than you believe, and stronger than you seem, and smarter than you think.
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col w-full max-w-full space-y-2">
                            <div className="flex w-full px-5 py-3 rounded-lg bg-scheme-light text-scheme-dark">
                              <span className="font-bold text-xl">Basic Information</span>
                            </div>
                            <div className="flex flex-col w-full px-5 py-3 rounded-lg bg-scheme-light text-scheme-dark">
                              <div className="flex flex-col border-b border-scheme-dark py-3 w-full">
                                <span className="font-bold text-lg">Home Address</span>
                                <span className="font-normal text-sm">Home Address</span>
                              </div>
                              <div className="flex flex-col border-b border-scheme-dark py-3 w-full">
                                <span className="font-bold text-lg">Birthday</span>
                                <span className="font-normal text-sm">Birthday</span>
                              </div>
                              <div className="flex flex-col border-b border-scheme-dark py-3 w-full">
                                <span className="font-bold text-lg">Anniversary</span>
                                <span className="font-normal text-sm">Anniversary</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
  const contact = await prisma.contact.findFirst({
    where: {
      slug: slug
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
      contact,
      countAllContacts
    }
  }
}

function FacebookIcon() {
  return (
    <svg className="w-6 h-6 fill-current text-scheme-dark transition ease-in-out duration-300 transform hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-6 h-6 fill-current text-scheme-dark transition ease-in-out duration-300 transform hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg className="w-6 h-6 fill-current text-scheme-dark transition ease-in-out duration-300 transform hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  )
}

function TiktokIcon() {
  return (
    <svg className="w-6 h-6 fill-current text-scheme-dark transition ease-in-out duration-300 transform hover:scale-90" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>TikTok icon</title>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg className="w-6 h-6 fill-current text-scheme-dark transition ease-in-out duration-300 transform hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
  )
}
