import Head from 'next/head'
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
                      <div className="flex flex-row w-full mt-10 px-5 text-scheme-sky space-x-3">
                        <div className="flex flex-col w-full max-w-sm  px-5 py-3 rounded-xl bg-scheme-mid space-y-5">
                          <span className="font-bold text-2xl">Intro</span>
                          <div className="flex flex-col w-full space-y-1">
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">{ contact.phone }</span>
                              <span className="font-light text-sm">Phone</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">phonebox@gmail.com</span>
                              <span className="font-light text-sm">Email</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">@tiktok</span>
                              <span className="font-light text-sm">Tiktok</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">@instagram</span>
                              <span className="font-light text-sm">Instagram</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">@facebook</span>
                              <span className="font-light text-sm">Facebook</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">@twitter</span>
                              <span className="font-light text-sm">Twitter</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-5 py-3 rounded-xl bg-scheme-mid space-y-5">
                          <span className="font-bold text-2xl">Basic Information</span>
                          <div className="flex flex-col w-full space-y-1">
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">Home Address</span>
                              <span className="font-light text-sm">Home Address</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">Birthday</span>
                              <span className="font-light text-sm">Birthday</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">Relationship</span>
                              <span className="font-light text-sm">Relationship</span>
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="font-bold text-xl text-scheme-pale">Anniversary</span>
                              <span className="font-light text-sm">Anniversary</span>
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
