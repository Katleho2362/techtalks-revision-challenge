import { Talk } from '@/types'
import { TopicBadge } from '@/components/TopicBadge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface TalkCardProps {
  talk: Talk
}

export function TalkCard({ talk }: TalkCardProps) {
  const formattedDate = new Date(talk.scheduledAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Card className="flex flex-col gap-2 p-4">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">{talk.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1 text-sm text-gray-600">
        <p>Speaker: {talk.speaker}</p>
        <TopicBadge topic={talk.topic} />
        <p>{talk.duration} min</p>
        <p>{talk.location}</p>
        <p>{formattedDate}</p>
        <p>{talk.registrationCount} / {talk.capacity} registered</p>
      </CardContent>
    </Card>
  )
}