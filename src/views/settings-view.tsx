import { Bell, CreditCard, KeyRound, Palette, ShieldCheck, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const settingNav = [
  { label: 'Profile', icon: UserRound, active: true },
  { label: 'Appearance', icon: Palette },
  { label: 'Notifications', icon: Bell },
  { label: 'Security', icon: ShieldCheck },
  { label: 'API access', icon: KeyRound },
  { label: 'Billing', icon: CreditCard },
]

export function SettingsView() {
  return (
    <div className="mx-auto max-w-[1120px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mb-7"><h1 className="text-2xl font-bold tracking-[-0.03em] text-[#2e2b35]">Settings</h1><p className="mt-1 text-sm text-[#8b8792]">Manage your workspace preferences and account.</p></div>
      <div className="grid gap-5 md:grid-cols-[210px_minmax(0,1fr)]">
        <nav className="space-y-1">{settingNav.map((item) => <button key={item.label} className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-semibold transition ${item.active ? 'bg-[#eeeaff] text-[#5f52dc]' : 'text-[#77737e] hover:bg-white'}`}><item.icon className="size-4" />{item.label}</button>)}</nav>
        <Card className="p-5 sm:p-7">
          <div className="border-b border-[#ece9ef] pb-5"><h2 className="text-base font-bold text-[#34313c]">Profile information</h2><p className="mt-1 text-xs text-[#918d98]">Update the details used across your workspace.</p></div>
          <div className="flex flex-col gap-4 border-b border-[#ece9ef] py-6 sm:flex-row sm:items-center">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffc97b] to-[#ef745c] text-lg font-bold text-white">LN</div>
            <div><div className="flex gap-2"><Button variant="outline" size="sm">Change photo</Button><Button variant="ghost" size="sm">Remove</Button></div><p className="mt-2 text-[10px] text-[#9d99a3]">JPG, PNG or WEBP. Maximum 2 MB.</p></div>
          </div>
          <div className="grid gap-4 py-6 sm:grid-cols-2">
            <label className="text-xs font-semibold text-[#5f5b67]">First name<Input className="mt-2" defaultValue="Linh" /></label>
            <label className="text-xs font-semibold text-[#5f5b67]">Last name<Input className="mt-2" defaultValue="Nguyen" /></label>
            <label className="text-xs font-semibold text-[#5f5b67] sm:col-span-2">Email address<Input className="mt-2" defaultValue="linh@company.co" type="email" /></label>
            <label className="text-xs font-semibold text-[#5f5b67] sm:col-span-2">Role<Input className="mt-2" defaultValue="Creative Producer" /></label>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#ece9ef] pt-5"><Button variant="outline">Cancel</Button><Button>Save changes</Button></div>
        </Card>
      </div>
    </div>
  )
}
