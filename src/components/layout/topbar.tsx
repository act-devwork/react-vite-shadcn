import { Bell, CircleHelp, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopbarProps {
  onOpenNavigation: () => void
}

export function Topbar({ onOpenNavigation }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[#e8e6ed] bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={onOpenNavigation}>
        <Menu className="size-5" />
      </Button>
      <div className="relative hidden w-full max-w-[340px] sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#aaa6b2]" />
        <input
          aria-label="Search workspace"
          className="h-9 w-full rounded-xl border border-transparent bg-[#f4f3f7] pl-9 pr-3 text-xs text-[#3e3b46] placeholder:text-[#aaa6b2] focus:border-[#d8d4f9] focus:bg-white focus:outline-none"
          placeholder="Search projects, assets..."
        />
        <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-[#ddd9e3] bg-white px-1.5 py-0.5 text-[9px] text-[#96919e] md:block">⌘ K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Help"><CircleHelp className="size-[18px]" /></Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-[18px]" />
          <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#6d5dfc] ring-2 ring-white" />
        </Button>
        <div className="ml-2 hidden items-center gap-2 rounded-lg border border-[#e5e2eb] px-2.5 py-1.5 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-semibold text-[#625f69]">24 credits</span>
        </div>
      </div>
    </header>
  )
}
