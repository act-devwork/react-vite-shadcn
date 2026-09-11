import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Clapperboard, Grid2X2, List, MoreHorizontal, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { videoService } from '@/services/video.service'
import { cn } from '@/utils/cn'

const statusColor = {
  completed: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-slate-100 text-slate-600',
  generating: 'bg-amber-50 text-amber-700',
  queued: 'bg-blue-50 text-blue-700',
  failed: 'bg-red-50 text-red-700',
}

export function ProjectsView() {
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: videoService.listProjects })
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-[-0.03em] text-[#2e2b35]">Projects</h1><p className="mt-1 text-sm text-[#8b8792]">Manage drafts, generations and exported videos.</p></div>
        <Link to="/create"><Button><Plus className="size-4" /> New project</Button></Link>
      </div>
      <div className="mb-5 flex items-center gap-3">
        <div className="relative max-w-md flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#aaa6b1]" /><input className="h-10 w-full rounded-xl border border-[#e1dee7] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#8174fc]" placeholder="Search projects" /></div>
        <div className="ml-auto hidden rounded-xl border border-[#e1dee7] bg-white p-1 sm:flex"><button className="rounded-lg bg-[#f1efff] p-2 text-[#6658e4]"><Grid2X2 className="size-3.5" /></button><button className="rounded-lg p-2 text-[#9995a0]"><List className="size-3.5" /></button></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <Card key={index} className="p-2"><Skeleton className="aspect-video w-full" /><Skeleton className="mx-2 mt-3 h-4 w-1/2" /><Skeleton className="mx-2 mb-2 mt-2 h-3 w-1/3" /></Card>)
          : data?.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden p-2">
              <div className={cn('relative aspect-video rounded-xl bg-gradient-to-br', index === 0 ? 'from-[#292436] via-[#71564d] to-[#d19d6e]' : index === 1 ? 'from-[#1d3452] via-[#4d6a7e] to-[#b46e86]' : 'from-[#473529] via-[#906648] to-[#d1a678]')}>
                <span className="absolute left-2 top-2 rounded-full bg-black/35 px-2 py-1 text-[9px] font-medium text-white/90 backdrop-blur">{project.aspectRatio}</span>
                <span className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur"><Clapperboard className="size-3.5" /></span>
              </div>
              <div className="flex items-start gap-3 px-2 pb-2 pt-3">
                <div className="min-w-0 flex-1"><h2 className="truncate text-sm font-semibold text-[#393640]">{project.name}</h2><p className="mt-1 line-clamp-1 text-[11px] text-[#96919d]">{project.prompt}</p><div className="mt-2 flex items-center gap-2"><span className={cn('rounded-full px-2 py-1 text-[9px] font-semibold capitalize', statusColor[project.status])}>{project.status}</span><span className="text-[9px] text-[#aaa6b0]">{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span></div></div>
                <Button variant="ghost" size="icon" className="size-8" aria-label="Project actions"><MoreHorizontal className="size-4" /></Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}
