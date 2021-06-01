import Link from 'next/link'
import { useState } from 'react'

export default function SearchContact({contacts}) {
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

  const getContact = contacts.map(({name, slug, avatar_url, id}) => {
    return [
      name,
      slug,
      avatar_url,
      id
    ]
  })

  const results = !searchTerm ? getContact : getContact.filter(contact =>
    contact[0].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
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
        <div className="absolute w-full h-auto max-h-80 overflow-y-auto mt-2 rounded-md bg-scheme-mid bg-opacity-95 text-white z-10">
          <div className="flex flex-row w-full bg-opacity-75">
            <ul className="flex flex-col w-full">
              {results.map(contact => {
                return (
                  <li className="flex flex-row items-center w-full border-b border-scheme-sky" key={contact[3]}>
                    <Link href={`/phonebook/${contact[1]}`}>
                      <a className="flex flex-row items-center w-full px-3 py-2 transition ease-in-out duration-200 hover:bg-scheme-dark space-x-3">
                        <img className="w-10 h-10 rounded-full object-cover" src={`${contact[2]}`} alt="avatar"/>
                        <span className="font-normal text-lg text-scheme-pale">{contact[0]}</span>
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