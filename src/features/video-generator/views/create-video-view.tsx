import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, CheckCircle2, Cloud, MoreHorizontal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { videoService } from '@/services/video.service'
import { useGenerationStore } from '@/stores/use-generation-store'
import type { VideoGenerationPayload } from '@/types/video'
import { GenerationSettings } from '../components/generation-settings'
import { PreviewStage } from '../components/preview-stage'
import { PromptEditor } from '../components/prompt-editor'
import { generationSchema, type GenerationFormValues } from '../schemas/generation.schema'

const defaultValues: GenerationFormValues = {
  projectName: 'Untitled video',
  prompt: '',
  model: 'veo-3.1-fast',
  style: 'cinematic',
  aspectRatio: '16:9',
  duration: 8,
  resolution: '1080p',
}

export function CreateVideoView() {
  const addJob = useGenerationStore((state) => state.addJob)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GenerationFormValues>({ resolver: zodResolver(generationSchema), defaultValues })

  const mutation = useMutation({
    mutationFn: (payload: VideoGenerationPayload) => videoService.generate(payload),
    onSuccess: ({ jobId }, values) => {
      addJob({ id: jobId, projectName: values.projectName, progress: 0, status: 'queued' })
      toast.success('Video added to the generation queue')
    },
    onError: () => toast.error('Could not start this generation. Please try again.'),
  })

  const submit = (values: GenerationFormValues) => mutation.mutate(values)
  const aspectRatio = watch('aspectRatio')

  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto w-full max-w-[1460px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" aria-label="Back to home" className="grid size-9 shrink-0 place-items-center rounded-xl border border-[#e3e0e8] bg-white text-[#77727f] transition hover:bg-[#f4f3f7]">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <Input
              {...register('projectName')}
              aria-label="Project name"
              className="h-7 max-w-[280px] border-transparent bg-transparent px-1 text-lg font-bold tracking-[-0.02em] hover:border-[#dfdce6] focus:bg-white sm:text-xl"
            />
            <div className="mt-1 flex items-center gap-1.5 px-1 text-[10px] text-[#98949f]">
              <Cloud className="size-3" /> Saved just now
              {errors.projectName && <span className="text-red-500">· {errors.projectName.message}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm">Save draft</Button>
          <Button variant="ghost" size="icon" className="size-8" aria-label="More project actions"><MoreHorizontal className="size-4" /></Button>
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-[#dedafc] bg-gradient-to-r from-[#f3f1ff] via-[#faf9ff] to-[#fff8f3] px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-white text-[#6d5dfc] shadow-sm"><CheckCircle2 className="size-4" /></span>
              <div>
                <p className="text-xs font-semibold text-[#453f69]">Start with a focused scene</p>
                <p className="mt-1 text-[11px] leading-5 text-[#77718f]">Describe the subject, action, setting, lighting and camera movement. You can refine the result after the first generation.</p>
              </div>
            </div>
          </div>
          <PromptEditor register={register} watch={watch} setValue={setValue} error={errors.prompt?.message} />
          <PreviewStage aspectRatio={aspectRatio} />
        </div>
        <GenerationSettings register={register} watch={watch} setValue={setValue} isGenerating={mutation.isPending} />
      </div>
    </form>
  )
}
