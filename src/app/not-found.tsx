import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center py-[13%] justify-center gap-4'>
      <h2>Not Found</h2>
      <p>This page is under development</p>
      <Link href="/" className='text-semibold border px-4 py-1 rounded-lg'>Return Home</Link>
    </div>
  )
}