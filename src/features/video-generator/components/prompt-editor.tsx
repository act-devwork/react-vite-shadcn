import { Image, Sparkles, WandSparkles } from 'lucide-react'
import { useState } from 'react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import type { GenerationFormValues } from '../schemas/generation.schema'
import { MediaDropzone } from './media-dropzone'

interface PromptEditorProps {
  register: UseFormRegister<GenerationFormValues>
  watch: UseFormWatch<GenerationFormValues>
  setValue: UseFormSetValue<GenerationFormValues>
  error?: string
}

export function PromptEditor({ register, watch, setValue, error }: PromptEditorProps) {
  const [tab, setTab] = useState<'prompt' | 'media'>('prompt')
  const prompt = watch('prompt')

  const enhancePrompt = () => {
    const base = prompt.trim() || 'A calm ocean at sunrise'
    setValue(
      'prompt',
      `${base}. Cinematic composition, natural motion, soft volumetric lighting, nuanced textures, smooth camera movement, high visual consistency.`,
      { shouldValidate: true },
    )
  }

  return (
    <section className="rounded-2xl border border-[#e5e3eb] bg-white shadow-panel">
      <div className="flex items-center justify-between border-b border-[#eceaf0] px-5 py-4">
        <div className="flex items-center gap-1 rounded-lg bg-[#f5f4f7] p-1">
          <button
            type="button"
            onClick={() => setTab('prompt')}
            className={cn('flex h-8 items-center gap-2 rounded-md px-3 text-xs font-semibold text-[#77737e]', tab === 'prompt' && 'bg-white text-[#302d38] shadow-sm')}
          >
            <Sparkles className="size-3.5" /> Prompt
          </button>
          <button
            type="button"
            onClick={() => setTab('media')}
            className={cn('flex h-8 items-center gap-2 rounded-md px-3 text-xs font-semibold text-[#77737e]', tab === 'media' && 'bg-white text-[#302d38] shadow-sm')}
          >
            <Image className="size-3.5" /> Media
          </button>
        </div>
        <span className="hidden text-[11px] text-[#9c98a3] sm:inline">Describe one clear visual sequence</span>
      </div>

      <div className="p-5">
        {tab === 'prompt' ? (
          <div>
            <div className={cn('relative rounded-xl border bg-[#fbfafc] transition focus-within:border-[#8c80fc] focus-within:ring-2 focus-within:ring-[#8c80fc]/10', error ? 'border-red-300' : 'border-[#e0dde7]')}>
              <textarea
                {...register('prompt')}
                className="min-h-[210px] w-full resize-none bg-transparent px-4 py-4 text-[15px] leading-7 text-[#302d37] outline-none placeholder:text-[#aaa6b1]"
                placeholder="A cinematic aerial shot sweeps across a quiet coastal town at golden hour..."
              />
              <div className="flex items-center justify-between border-t border-[#ebe8ef] px-3 py-2.5">
                <Button variant="secondary" size="sm" onClick={enhancePrompt}>
                  <WandSparkles className="size-3.5" /> Enhance prompt
                </Button>
                <span className={cn('text-[11px] text-[#a09ca7]', prompt.length > 1900 && 'text-amber-600')}>{prompt.length} / 2,000</span>
              </div>
            </div>
            {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Cinematic', 'Slow motion', 'Golden hour', 'Product shot'].map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => setValue('prompt', `${prompt}${prompt ? ', ' : ''}${suggestion.toLowerCase()}`, { shouldValidate: true })}
                  className="rounded-full border border-[#e4e1e9] px-3 py-1.5 text-[11px] font-medium text-[#77727e] transition hover:border-[#cfc9f8] hover:bg-[#f7f5ff] hover:text-[#6255df]"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <MediaDropzone />
        )}
      </div>
    </section>
  )
}
