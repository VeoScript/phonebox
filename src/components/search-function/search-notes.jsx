import Link from 'next/link'
import { useState } from 'react'

export default function SearchContact({notes}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = event => {
    setSearchTerm(event.target.value)
    if(!event.target.value){
      setIsOpen(false)
    }
    else{
      setIsOpen(true)
    }
  }

  const getNotes = notes.map(({id, title, slug}) => {
    return [
      id,
      title,
      slug
    ]
  })

  const results = !searchTerm ? getNotes : getNotes.filter(note =>
    note[1].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )
  
  return (
    <div className="flex flex-col w-full max-w-lg">
      <input
        className="w-full px-3 py-2 bg-scheme-pale text-[#333] text-sm rounded-md focus:outline-none"
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search" />

      <div className={`w-full h-full ${isOpen ? 'relative' : 'hidden'}`}>
        <div className="absolute w-full h-auto max-h-80 overflow-y-auto mt-2 rounded-md bg-scheme-mid bg-opacity-80 text-white z-10">
          <div className="flex flex-row w-full bg-opacity-75">
            <ul className="flex flex-col w-full">
              {results.map(note => {
                return (
                  <li className="flex flex-row items-center w-full border-b border-scheme-sky" key={note[0]}>
                    <Link href={`/notebook/${note[2]}`}>
                      <a className="flex flex-row items-center w-full px-3 py-2 transition ease-in-out duration-200 hover:bg-scheme-dark space-x-3">
                        <span className="font-normal text-lg text-scheme-pale">{note[1]}</span>
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div> 
  )
}