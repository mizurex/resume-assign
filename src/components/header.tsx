import { useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('isAuthed')
        navigate('/')
      }
    return (
        <header className="sticky top-0 z-10 bg-white/95  print:hidden w-[20vw] w-full">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between ">
          <div className="text-sm text-zinc-700 font-bold">Interactive Resume</div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 cursor-pointer"
              aria-label="Go to home"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 cursor-pointer"
              aria-label="Download resume"
            >
              Download
            </button>
            <button
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 cursor-pointer "
            onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </header>
    )
}