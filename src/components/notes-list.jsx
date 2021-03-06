import Link from 'next/link'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

export default function Notelist({ notes }) {
  return (
    <>
      {notes.map(note => {
        return (
          <Link href={`/notebook/${ note.slug }`} key={ note.id }>
            <a className="flex flex-col w-full py-5">
              <div className="flex flex-col h-[25rem] bg-scheme-pale text-[#333] rounded-xl transition ease-in-out duration-300 transform hover:scale-95 hover:shadow-2xl">
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
                      <div className="flex flex-col w-full">
                        <span className="font-bold text-xl">{ note.title }</span>
                        <span className="font-light text-xs"><Moment date={ note.date } format='LLLL' /></span>
                      </div>
                      <div className="flex flex-col w-full space-y-3">
                        <span className="font-normal text-sm line-clamp-2">
                          <ReactMarkdown>{!note.note ? 'No article available' : note.note}</ReactMarkdown>  
                        </span>
                        <span className="font-normal text-xs text-scheme-light">Read More...</span>
                      </div>
                      <div className="w-full max-w-xs pt-2">
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