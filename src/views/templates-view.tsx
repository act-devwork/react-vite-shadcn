import { ArrowUpRight, Search } from 'lucide-react'
import { Card } from '@/components/ui/card'

const templates = [
  { name: 'Editorial product', category: 'Marketing', color: 'from-[#29242f] via-[#765f57] to-[#d8a881]' },
  { name: 'Dreamy landscape', category: 'Cinematic', color: 'from-[#34495c] via-[#7893a0] to-[#d8b98c]' },
  { name: 'Kinetic typography', category: 'Social', color: 'from-[#362b75] via-[#855adc] to-[#e99ab8]' },
  { name: 'Minimal showcase', category: 'Product', color: 'from-[#c8cad1] via-[#ece6de] to-[#a69d94]' },
  { name: 'Neon city story', category: 'Cinematic', color: 'from-[#132a49] via-[#57438c] to-[#ce557d]' },
  { name: 'Organic motion', category: 'Brand', color: 'from-[#395f55] via-[#84a271] to-[#e2c278]' },
]

export function TemplatesView() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mb-7"><h1 className="text-2xl font-bold tracking-[-0.03em] text-[#2e2b35]">Templates</h1><p className="mt-1 text-sm text-[#8b8792]">Start faster with prompt and production presets.</p></div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#aaa6b1]" /><input className="h-10 w-full rounded-xl border border-[#e1dee7] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#8174fc]" placeholder="Search templates" /></div>
        <div className="flex gap-2 overflow-x-auto">{['All', 'Cinematic', 'Marketing', 'Social', 'Product'].map((category, index) => <button key={category} className={`rounded-full px-3 py-2 text-[11px] font-semibold ${index === 0 ? 'bg-[#6d5dfc] text-white' : 'border border-[#e1dee7] bg-white text-[#77737e]'}`}>{category}</button>)}</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.name} className="group cursor-pointer overflow-hidden p-2 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${template.color}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,.28),transparent_28%)]" />
              <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><ArrowUpRight className="size-4" /></span>
              <div className="absolute inset-x-4 bottom-4 h-px bg-white/30"><div className="h-px w-2/5 bg-white" /></div>
            </div>
            <div className="px-2 pb-2 pt-3"><p className="text-sm font-semibold text-[#383540]">{template.name}</p><p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#9a96a1]">{template.category}</p></div>
          </Card>
        ))}
      </div>
    </div>
  )
}
