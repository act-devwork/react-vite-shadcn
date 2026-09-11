import { ArrowRight, Clapperboard, Clock3, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const recentProjects = [
  { title: 'Autumn product reveal', status: 'Ready', duration: '00:08', palette: 'from-[#322b43] via-[#866559] to-[#d9ab75]' },
  { title: 'City after rain', status: 'Draft', duration: '00:05', palette: 'from-[#1f3555] via-[#425f7a] to-[#bc7990]' },
  { title: 'Coffee ritual', status: 'Generating', duration: '00:10', palette: 'from-[#433328] via-[#8a6244] to-[#d1a276]' },
]

export function HomeView() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-[#6d5dfc]">Thursday, September 10</p>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-[#292631] sm:text-[28px]">Create something remarkable.</h1>
          <p className="mt-2 text-sm text-[#817d88]">Turn an idea into a production-ready video in minutes.</p>
        </div>
        <Link to="/create"><Button><Sparkles className="size-4" /> New generation</Button></Link>
      </div>

      <section className="relative mb-8 overflow-hidden rounded-[24px] bg-[#24202f] p-6 text-white sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(123,103,255,.36),transparent_34%),radial-gradient(circle_at_93%_90%,rgba(255,159,122,.23),transparent_28%)]" />
        <div className="absolute -right-10 top-[-55px] size-56 rounded-full border border-white/10" />
        <div className="absolute -right-2 top-[-15px] size-44 rounded-full border border-white/10" />
        <div className="relative max-w-xl">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold text-[#d8d2ff] backdrop-blur-sm"><Clapperboard className="size-3" /> AI VIDEO STUDIO</span>
          <h2 className="text-balance text-2xl font-bold leading-tight tracking-[-0.035em] sm:text-[32px]">From first thought to final frame.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">Direct your next scene with text, reference imagery and production controls designed for creative teams.</p>
          <Link to="/create" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#332d42] transition hover:bg-[#f5f2ff]">Start creating <ArrowRight className="size-3.5" /></Link>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#322f39]">Recent projects</h2>
        <Link to="/projects" className="text-xs font-semibold text-[#6d5dfc] hover:text-[#5144ce]">View all</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {recentProjects.map((project, index) => (
          <Card key={project.title} className="group overflow-hidden border-[#e5e2eb] p-2 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${project.palette}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(255,255,255,.25),transparent_30%)]" />
              <button aria-label={`Play ${project.title}`} className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#403948] opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100"><Play className="ml-0.5 size-4 fill-current" /></button>
              <span className="absolute bottom-2 right-2 rounded-md bg-black/40 px-1.5 py-0.5 text-[9px] font-semibold text-white/90">{project.duration}</span>
            </div>
            <div className="flex items-center justify-between gap-3 px-2 pb-2 pt-3">
              <div className="min-w-0"><p className="truncate text-xs font-semibold text-[#3a3742]">{project.title}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-[#96929d]"><Clock3 className="size-3" /> {index + 1} day{index ? 's' : ''} ago</p></div>
              <span className="rounded-full bg-[#f3f2f6] px-2 py-1 text-[9px] font-semibold text-[#706c77]">{project.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
