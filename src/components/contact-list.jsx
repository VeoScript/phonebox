import Link from 'next/link'

export default function ContactList({contacts}) {
  return (
    <>
      {contacts.map(contact => {
        return (
          <Link href={`/phonebook/${contact.slug}`} key={contact.id}>
            <a className="flex flex-row items-center justify-between w-full border-b border-scheme-dark px-5 py-3 hover:opacity-80">
              <div className="flex flex-row items-center space-x-3">
                <img className="w-16 h-16 rounded-full object-cover" src={contact.avatar_url} alt="avatar" />
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-scheme-dark">{contact.name}</span>
                  <span className="font-light text-base text-scheme-dark">{contact.relationship}</span>
                </div>
              </div>
              <span className="font-semibold text-base text-scheme-dark">{contact.phone}</span>
            </a>
          </Link>
        )
      })}
    </>
  )
}
