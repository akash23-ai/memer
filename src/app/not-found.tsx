import Link from "next/link"
 
export default function NotFound() {
  return (
    <div className="bg-black min-h-screen h-full text-white flex flex-col items-center justify-center">
      <h2 className="text-6xl font-semibold mb-2">Not Found</h2>
      <p className="text-3xl mb-2">Could not find requested resource</p>
      <Link href="/" className="text-lg bg-blue-600 py-2 px-4 rounded-md font-medium">Return Home</Link>
    </div>
  )
}