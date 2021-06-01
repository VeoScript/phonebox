import Link from 'next/link'

export default function Notelist() {
  return (
    <Link href="/notebook">
      <a className="relative py-5">
        <div className="flex flex-col w-full max-w-xs h-[23rem] bg-scheme-pale text-[#333] rounded-xl transition ease-in-out duration-300 transform hover:scale-95">
          <div className="relative">
            <div className="absolute w-full inset-0 -top-5 z-30">
              <div className="flex flex-row items-center justify-center w-full">
                <img className="w-10/12 h-48 rounded-lg bg-scheme-dark object-cover" src="https://i.pinimg.com/originals/1b/b8/e4/1bb8e4e2de89150ad125c8b663452f4a.jpg" alt="note-image" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute w-full inset-0 top-44 mt-5 z-10">
              <div className="flex flex-col w-full space-y-2 px-3">
                <span className="font-bold text-2xl">Title</span>
                <span className="font-normal text-sm line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iste necessitatibus asperiores unde. Alias, possimus. Dignissimos molestiae dolore sed officia mollitia labore amet, doloribus error atque perferendis suscipit accusamus tenetur.</span>
                <div className="w-full max-w-xs pt-5">
                  <span className="font-normal text-xs bg-scheme-sky text-scheme-mid px-2 py-1 rounded-full">Important</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}