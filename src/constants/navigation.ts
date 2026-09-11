import { Clapperboard, FolderOpen, Home, LayoutTemplate, Settings } from 'lucide-react'

export const primaryNavigation = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Create video', href: '/create', icon: Clapperboard },
  { label: 'Projects', href: '/projects', icon: FolderOpen },
  { label: 'Templates', href: '/templates', icon: LayoutTemplate },
] as const

export const secondaryNavigation = [{ label: 'Settings', href: '/settings', icon: Settings }] as const
