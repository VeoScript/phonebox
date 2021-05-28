import Link from 'next/link'
import { useState } from 'react'

export default function SearchFunction({contacts}) {
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

  const getContact = contacts.map(({name, slug}) => {
    return [
      name,
      slug
    ]
  })

  const results = !searchTerm ? getContact : getContact.filter(contact =>
    contact[0].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )
  
  return (
    <div className="flex flex-col w-full max-w-sm">
      <input
        className="w-full max-w-sm px-3 py-2 bg-scheme-pale text-[#333] text-sm rounded-md focus:outline-none"
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search" />

      <div className={`w-full h-full ${isOpen ? 'relative' : 'hidden'}`}>
        <div className="absolute w-full h-auto max-h-80 overflow-y-auto mt-2 rounded-md bg-scheme-dark bg-opacity-75 text-white z-50">
          <div className="flex flex-row w-full bg-opacity-75">
            <ul className="flex flex-col w-full max-w-sm">
              {results.map(contact => {
                console.log(contact)
                return (
                  <li className="flex flex-row items-center w-full border-b border-scheme-light">
                    <Link href={`/phonebook/${contact[1]}`}>
                      <a className="text-lg w-full px-3 py-2 hover:bg-scheme-mid">{contact[0]}</a>
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