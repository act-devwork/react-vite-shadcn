import { ChevronDown, Plus, Sparkle, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { primaryNavigation, secondaryNavigation } from '@/constants/navigation'
import { cn } from '@/utils/cn'
import { AppLogo } from './app-logo'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[244px] flex-col border-r border-[#e8e6ee] bg-white px-3.5 py-4 transition-transform duration-200 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-2 pb-6">
          <AppLogo />
          <button aria-label="Close navigation" className="rounded-lg p-2 text-[#777482] hover:bg-[#f4f3f7] lg:hidden" onClick={onClose}>
            <X className="size-4" />
          </button>
        </div>

        <button className="mb-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] text-sm font-semibold text-white shadow-sm shadow-[#6d5dfc]/20 transition hover:bg-[#5e4eeb]">
          <Plus className="size-4" />
          Create new
        </button>

        <nav aria-label="Primary navigation" className="space-y-1">
          {primaryNavigation.map((item) => (
            <NavLink
              end={item.href === '/'}
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#6f6c79] transition hover:bg-[#f6f5f8] hover:text-[#27252f]',
                  isActive && 'bg-[#f0efff] font-semibold text-[#5d50dc] hover:bg-[#eceaff] hover:text-[#5d50dc]',
                )
              }
            >
              <item.icon className="size-[18px]" strokeWidth={1.9} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#aaa7b1]">Workspace</div>
        <div className="mt-3 rounded-xl border border-[#e5e2ec] bg-[#faf9fc] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-[#e6e2ff] text-[#6153de]">
                <Sparkle className="size-3.5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-[#36333f]">Creative team</p>
                <p className="text-[10px] text-[#94909d]">Internal workspace</p>
              </div>
            </div>
            <ChevronDown className="size-3.5 text-[#9995a1]" />
          </div>
        </div>

        <div className="mt-auto">
          <nav aria-label="Secondary navigation" className="mb-3 space-y-1">
            {secondaryNavigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#6f6c79] transition hover:bg-[#f6f5f8] hover:text-[#27252f]',
                    isActive && 'bg-[#f0efff] font-semibold text-[#5d50dc]',
                  )
                }
              >
                <item.icon className="size-[18px]" strokeWidth={1.9} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2.5 border-t border-[#eeecf1] px-2 pt-4">
            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffc97b] to-[#ef745c] text-xs font-bold text-white">LN</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#34313d]">Linh Nguyen</p>
              <p className="truncate text-[10px] text-[#9995a1]">linh@company.co</p>
            </div>
            <ChevronDown className="size-3.5 text-[#9e9aa5]" />
          </div>
        </div>
      </aside>
    </>
  )
}
