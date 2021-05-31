import Link from 'next/link'

 export default function Sidebar({getCount}) {
   return (
    <>
      <div className="flex flex-col w-full">
        <div className="brand flex flex-row font-bold text-3xl">
          <span className="text-scheme-dark">Phone</span><span className="text-scheme-mid">box</span>
        </div>
        <div className="sub flex flex-row font-light text-base">
          <span className="text-scheme-dark">Alternative phonebook web application.</span>
        </div>
      </div>
      <div className="flex flex-col w-full mt-5 space-y-1">
        <Link href="/home">
          <a className="rounded-lg w-full max-w-sm px-5 py-3 font-bold text-left text-base text-scheme-sky bg-scheme-dark transition ease-in-out duration-300 transform hover:scale-95">
            Home
          </a>
        </Link>
        <Link href="/phonebook">
          <a className="rounded-lg w-full max-w-sm px-5 py-3 font-bold text-left text-base text-scheme-sky bg-scheme-dark transition ease-in-out duration-300 transform hover:scale-95">
            Phonebook
          </a>
        </Link>
        <Link href="/notebook">
          <a className="rounded-lg w-full max-w-sm px-5 py-3 font-bold text-left text-base text-scheme-sky bg-scheme-dark transition ease-in-out duration-300 transform hover:scale-95">
            Notebook
          </a>
        </Link>
      </div>
      <div className="flex flex-col w-full mt-5 space-y-1">
        <div className="flex flex-row items-center justify-between w-full rounded-lg px-5 py-3 bg-scheme-dark">
          <div className="flex flex-col">
            <div className="font-bold text-base text-scheme-sky">Contacts</div>
            <div className="font-light text-xs text-scheme-sky">How many contacts do you have?</div>
          </div>
          <div className="font-bold text-5xl rounded-lg text-scheme-dark bg-scheme-sky px-5 py-3">
            {getCount.name}
          </div>  
        </div>
        <div className="flex flex-row items-center justify-between w-full rounded-lg px-5 py-3 bg-scheme-dark">
          <div className="flex flex-col">
            <div className="font-bold text-base text-scheme-sky">Notes</div>
            <div className="font-light text-xs text-scheme-sky">How many notes do you have?</div>
          </div>
          <div className="font-bold text-5xl rounded-lg text-scheme-dark bg-scheme-sky px-5 py-3">
            {/* getCountNotes */}
            0
          </div>  
        </div>
      </div>
    </>
   )
 }
