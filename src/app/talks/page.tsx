import Link from 'next/link'
import { fetchTalks } from '@/lib/mock-data'
import { TalkCard } from '@/components/TalkCard'

export default async function TalksPage() {
  const talks = await fetchTalks()

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">All Talks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {talks.map((talk) => (
          <Link key={talk.id} href={`/talks/${talk.id}`}>
            <TalkCard talk={talk} />
          </Link>
        ))}
      </div>
    </main>
  )
}