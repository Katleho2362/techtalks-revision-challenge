import { notFound } from 'next/navigation'
import { fetchTalkById } from '@/lib/mock-data'
import { TopicBadge } from '@/components/TopicBadge'
import { RegisterForm } from '@/components/RegisterForm'

export default async function TalkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const talk = await fetchTalkById(Number(id))

  if (!talk) notFound()

  const formattedDate = new Date(talk.scheduledAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">{talk.title}</h1>
      <TopicBadge topic={talk.topic} />
      <p className="mt-4 text-gray-700">{talk.description}</p>
      <div className="mt-4 flex flex-col gap-1 text-sm text-gray-600">
        <p>Speaker: {talk.speaker}</p>
        <p>{talk.duration} min</p>
        <p>{talk.location}</p>
        <p>{formattedDate}</p>
        <p>{talk.registrationCount} / {talk.capacity} registered</p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        <RegisterForm talkId={talk.id} />
      </div>
    </main>
  )
}