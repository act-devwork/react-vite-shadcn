import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8f8fa]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-[244px]">
        <Topbar onOpenNavigation={() => setSidebarOpen(true)} />
        <main className="min-h-[calc(100vh-4rem)]"><Outlet /></main>
      </div>
    </div>
  )
}
