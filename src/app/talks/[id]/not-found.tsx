import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-2">Talk not found</h1>
      <p className="text-gray-600 mb-6">
        We couldn&apos;t find the talk you&apos;re looking for.
      </p>
      <Link href="/talks" className="text-blue-600 underline">
        Back to all talks
      </Link>
    </main>
  )
}