import Link from 'next/link'

export default function Notelist({ notes }) {
  return (
    <>
      {notes.map(note => {
        return (
          <Link href={`/notebook/${ note.slug }`}>
            <a className="flex flex-col w-full py-5">
              <div className="flex flex-col h-[23rem] bg-scheme-pale text-[#333] rounded-xl transition ease-in-out duration-300 transform hover:scale-95">
                <div className="relative">
                  <div className="absolute w-full inset-0 -top-5 z-30">
                    <div className="flex flex-row justify-center w-full">
                      <img className="w-10/12 h-48 rounded-lg bg-scheme-dark object-cover" src={ note.image } alt="note-image" />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute w-full inset-0 top-44 mt-5 z-10">
                    <div className="flex flex-col w-full space-y-2 px-3">
                      <span className="font-bold text-xl">{ note.title }</span>
                      <span className="font-light text-sm">{ note.date }</span>
                      <span className="font-normal text-sm line-clamp-3">{ note.note }</span>
                      <div className="w-full max-w-xs pt-5">
                        <span className="font-normal text-xs bg-scheme-sky text-scheme-mid px-2 py-1 rounded-full">{ note.tag }</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        )
      })}
    </>
  )
}