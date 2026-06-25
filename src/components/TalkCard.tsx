import { Talk } from '@/types'
import { TopicBadge } from '@/components/TopicBadge'
import { Card, CardContent } from '@/components/ui/card'

interface TalkCardProps {
  talk: Talk
}

export function TalkCard({ talk }: TalkCardProps) {
  const formattedDate = new Date(talk.scheduledAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const spotsLeft = talk.capacity - talk.registrationCount
  const isNearlyFull = spotsLeft <= 5 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  return (
    <Card className="group relative overflow-hidden border-border/60 transition-all hover:border-border hover:shadow-md">
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <TopicBadge topic={talk.topic} />
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {talk.duration} min
          </span>
        </div>

        <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
          {talk.title}
        </h3>

        <p className="text-sm text-muted-foreground">{talk.speaker}</p>

        <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground border-t border-border/60 pt-3">
          <div className="flex items-center justify-between">
            <span>{talk.location}</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={
                isFull
                  ? 'font-medium text-red-600'
                  : isNearlyFull
                  ? 'font-medium text-orange-600'
                  : ''
              }
            >
              {talk.registrationCount} / {talk.capacity} registered
            </span>
            {isFull && <span className="font-medium text-red-600">Full</span>}
            {isNearlyFull && (
              <span className="font-medium text-orange-600">
                {spotsLeft} left
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
