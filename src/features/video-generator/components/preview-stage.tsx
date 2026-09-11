import { Expand, ImageIcon, Play, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PreviewStage({ aspectRatio }: { aspectRatio: '16:9' | '9:16' | '1:1' }) {
  const ratioClass = aspectRatio === '9:16' ? 'aspect-[9/16] h-[290px]' : aspectRatio === '1:1' ? 'aspect-square h-[260px]' : 'aspect-video w-full'

  return (
    <section className="rounded-2xl border border-[#e5e3eb] bg-white p-4 shadow-panel">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#302d38]">Preview</h2>
          <p className="mt-0.5 text-[11px] text-[#9995a0]">Your generated video will appear here</p>
        </div>
        <Button variant="ghost" size="icon" aria-label="Expand preview" className="size-8"><Expand className="size-4" /></Button>
      </div>
      <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-[#17161d] p-4">
        <div className={`${ratioClass} relative flex max-h-[300px] max-w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-[radial-gradient(circle_at_50%_25%,#393353_0%,#242130_38%,#17161d_72%)]`}>
          <div className="absolute left-[16%] top-[17%] size-24 rounded-full bg-[#715fff]/15 blur-2xl" />
          <div className="relative text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#a99eff]">
              <ImageIcon className="size-5" />
            </span>
            <p className="mt-3 text-xs font-medium text-white/55">Ready to create</p>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-lg bg-black/25 px-2.5 py-2 backdrop-blur-sm">
            <Play className="size-3.5 fill-white/60 text-white/60" />
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"><div className="h-full w-0 rounded-full bg-[#8d80ff]" /></div>
            <span className="text-[9px] text-white/45">00:00</span>
            <Volume2 className="size-3 text-white/45" />
          </div>
        </div>
      </div>
    </section>
  )
}
