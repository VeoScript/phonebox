import Link from 'next/link'

export default function ContactList() {
  return (
    <Link href="/home">
      <a className="flex flex-row items-center justify-between w-full border-b border-scheme-dark px-5 py-3 hover:opacity-80">
        <div className="flex flex-row items-center space-x-3">
          <img className="w-16 h-16 rounded-full object-cover" src="https://qph.fs.quoracdn.net/main-qimg-ac8d1e9b441cb7c6231bbdac1eeb28bf" alt="avatar" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-scheme-dark">Lisa Manoban</span>
            <span className="font-light text-sm text-scheme-dark">
              It always seems impossible until it is done.
            </span>
          </div>
        </div>
        <span className="font-semibold text-xl text-scheme-dark">09485549867</span>
      </a>
    </Link>
  )
}