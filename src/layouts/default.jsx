
export default function Layout({children}) {
  return (
    <div className="font-poppins flex flex-row justify-center items-center w-full h-screen mx-auto overflow-hidden bg-scheme-sky">
      <div className="flex w-full h-auto">
        {children}
      </div>
    </div>
  )
}