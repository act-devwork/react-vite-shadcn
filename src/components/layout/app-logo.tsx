import { Sparkles } from 'lucide-react'

export function AppLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-[#6d5dfc] text-white shadow-sm shadow-[#6d5dfc]/30">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.45),transparent_38%)]" />
        <Sparkles className="relative size-[18px]" strokeWidth={2.4} />
      </span>
      {!compact && <span className="text-[19px] font-bold tracking-[-0.04em] text-[#23212c]">frameflow</span>}
    </div>
  )
}
