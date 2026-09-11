import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundView() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 text-center">
      <div><p className="text-sm font-bold text-[#6d5dfc]">404</p><h1 className="mt-3 text-3xl font-bold text-[#2d2a34]">This frame is missing.</h1><p className="mt-3 text-sm text-[#8b8792]">The page may have moved or no longer exists.</p><Link to="/"><Button className="mt-6"><ArrowLeft className="size-4" /> Back home</Button></Link></div>
    </div>
  )
}
