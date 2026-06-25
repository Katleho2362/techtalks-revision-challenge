"use client"

import { useState } from 'react'
import { fetchTalks } from '@/lib/mock-data'
import { useQuery } from '@tanstack/react-query'
import { TalkCard } from '@/components/TalkCard'
import { TalkTopic } from '@/types'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { RegisterForm } from '@/components/RegisterForm'

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<TalkTopic | 'All'>('All')

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['talks'],
    queryFn: fetchTalks,
  })

  const filteredTalks =
    selectedTopic === 'All'
      ? data ?? []
      : (data ?? []).filter((talk) => talk.topic === selectedTopic)

  const topics: (TalkTopic | 'All')[] = ['All', 'Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-2 mb-6 flex-wrap">
        {topics.map((topic) => (
          <Button
            key={topic}
            variant={selectedTopic === topic ? 'default' : 'outline'}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>

      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      )}

      {isError && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md">
          {error.message}
        </div>
      )}

      {!isPending && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTalks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Test Registration</h2>
        <RegisterForm talkId={1} />
      </div>
    </main>
  )
}