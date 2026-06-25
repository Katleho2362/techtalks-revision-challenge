import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRegistration } from '@/lib/mock-data'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const registerSchema = z.object({
  attendeeName: z.string().min(2, 'Name must be at least 2 characters'),
  attendeeEmail: z.string().email('Please enter a valid email'),
  talkId: z.number(),
})

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  talkId: number
}

export function RegisterForm({ talkId }: RegisterFormProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { talkId },
  })

  const mutation = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talks'] })
    },
  })

  const onSubmit = (values: RegisterFormValues) => {
    mutation.mutate(values)
  }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
    <input type="hidden" {...register('talkId', { valueAsNumber: true })} />

    <div>
      <Label htmlFor="attendeeName">Name</Label>
      <Input id="attendeeName" {...register('attendeeName')} />
      {errors.attendeeName && (
        <p className="text-red-600 text-sm">{errors.attendeeName.message}</p>
      )}
    </div>

    <div>
      <Label htmlFor="attendeeEmail">Email</Label>
      <Input id="attendeeEmail" {...register('attendeeEmail')} />
      {errors.attendeeEmail && (
        <p className="text-red-600 text-sm">{errors.attendeeEmail.message}</p>
      )}
    </div>

    {mutation.isError && (
      <p className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
        {mutation.error.message}
      </p>
    )}

    {mutation.isSuccess && (
      <p className="bg-green-100 text-green-800 p-3 rounded-md text-sm">
        You're registered! See you there.
      </p>
    )}

    <Button type="submit" disabled={isSubmitting || mutation.isPending}>
      {isSubmitting || mutation.isPending ? 'Registering…' : 'Register'}
    </Button>
  </form>
)
  
}