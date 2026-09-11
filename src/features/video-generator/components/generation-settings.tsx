import { Check, ChevronDown, Gauge, Info, Sparkles, Zap } from 'lucide-react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import type { GenerationFormValues } from '../schemas/generation.schema'

interface GenerationSettingsProps {
  register: UseFormRegister<GenerationFormValues>
  watch: UseFormWatch<GenerationFormValues>
  setValue: UseFormSetValue<GenerationFormValues>
  isGenerating: boolean
}

const choiceClass = (active: boolean) => cn(
  'flex h-9 flex-1 items-center justify-center rounded-lg border text-xs font-semibold transition',
  active ? 'border-[#7d70f7] bg-[#f2f0ff] text-[#6154dd]' : 'border-[#e1dfe7] bg-white text-[#77737e] hover:border-[#c9c5d3]',
)

export function GenerationSettings({ register, watch, setValue, isGenerating }: GenerationSettingsProps) {
  const values = watch()

  return (
    <aside className="space-y-4 rounded-2xl border border-[#e5e3eb] bg-white p-5 shadow-panel xl:sticky xl:top-20">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#302d38]">Generation settings</h2>
        <button type="button" className="text-[11px] font-semibold text-[#6d5dfc] hover:text-[#5547d1]">Reset</button>
      </div>

      <div>
        <label className="mb-2 block text-[11px] font-semibold text-[#65616d]">AI model</label>
        <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-[#dedbe6] bg-white p-3 text-left transition hover:border-[#c9c4dc]">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#eae6ff] to-[#f7ecff] text-[#695be4]"><Sparkles className="size-4" /></span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-xs font-semibold text-[#36333e]">Veo 3.1 Fast <Badge>Recommended</Badge></span>
            <span className="mt-0.5 block text-[10px] text-[#9995a1]">Fast, expressive cinematic motion</span>
          </span>
          <ChevronDown className="size-4 text-[#9d99a4]" />
        </button>
        <input type="hidden" {...register('model')} />
      </div>

      <div>
        <label className="mb-2 block text-[11px] font-semibold text-[#65616d]">Visual style</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            ['Cinematic', 'from-[#342d4a] to-[#8a645c]'],
            ['Realistic', 'from-[#52757c] to-[#c5a875]'],
            ['Anime', 'from-[#6c65ad] to-[#e79cbe]'],
          ].map(([style, gradient]) => (
            <button
              key={style}
              type="button"
              onClick={() => setValue('style', style.toLowerCase())}
              className={cn('group relative overflow-hidden rounded-xl border p-1 transition', values.style === style.toLowerCase() ? 'border-[#786bf4] ring-2 ring-[#786bf4]/15' : 'border-[#e4e1e9]')}
            >
              <span className={`block h-12 rounded-lg bg-gradient-to-br ${gradient}`} />
              <span className="mt-1.5 block pb-0.5 text-[10px] font-semibold text-[#65616d]">{style}</span>
              {values.style === style.toLowerCase() && <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-[#6d5dfc] text-white"><Check className="size-2.5" /></span>}
            </button>
          ))}
        </div>
        <input type="hidden" {...register('style')} />
      </div>

      <div>
        <div className="mb-2 flex items-center gap-1.5"><label className="text-[11px] font-semibold text-[#65616d]">Aspect ratio</label><Info className="size-3 text-[#aba7b1]" /></div>
        <div className="flex gap-2">
          {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
            <button type="button" key={ratio} className={choiceClass(values.aspectRatio === ratio)} onClick={() => setValue('aspectRatio', ratio)}>{ratio}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[11px] font-semibold text-[#65616d]">Duration</label>
        <div className="flex gap-2">
          {([5, 8, 10] as const).map((duration) => (
            <button type="button" key={duration} className={choiceClass(values.duration === duration)} onClick={() => setValue('duration', duration)}>{duration}s</button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[11px] font-semibold text-[#65616d]">Resolution</label>
        <div className="flex gap-2">
          {(['720p', '1080p'] as const).map((resolution) => (
            <button type="button" key={resolution} className={choiceClass(values.resolution === resolution)} onClick={() => setValue('resolution', resolution)}>{resolution}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#f7f6fa] p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-medium text-[#77727e]"><Gauge className="size-3.5" /> Estimated generation</span>
          <span className="font-semibold text-[#45414d]">~2 min</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-medium text-[#77727e]"><Zap className="size-3.5" /> Credit cost</span>
          <span className="font-semibold text-[#45414d]">8 credits</span>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isGenerating}>
        {isGenerating ? <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Sparkles className="size-4" />}
        {isGenerating ? 'Starting generation...' : 'Generate video'}
      </Button>
      <p className="text-center text-[10px] text-[#aaa6b0]">You can safely leave this page after generation starts.</p>
    </aside>
  )
}
