import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Building2, Menu, ShieldCheck, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/assessment', label: 'Solar Assessment' },
  { to: '/results', label: 'Preliminary Results' },
  { to: '/offers', label: 'Compare Offers' },
]

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Gefyron home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Building2 size={22} />
      </span>
      <span>
        <span className="block text-xl font-black tracking-tight text-navy-950">Gefyron</span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">Commercial solar clarity</span>
      </span>
    </Link>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50 text-navy-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="container-page flex h-18 items-center justify-between py-3">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-navy-950'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-navy-950">Sign in</button>
            <Link to="/assessment" className="btn-primary !px-4 !py-2.5">Start Assessment</Link>
          </div>
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {links.map((item) => <NavLink onClick={() => setOpen(false)} key={item.to} to={item.to} className="rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-slate-100">{item.label}</NavLink>)}
              <Link onClick={() => setOpen(false)} to="/assessment" className="btn-primary mt-2">Start Assessment</Link>
            </div>
          </div>
        )}
      </header>
      <main><Outlet /></main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">One independent assessment. Multiple comparable offers. A better solar investment.</p>
          </div>
          <div>
            <h3 className="font-bold text-navy-950">Platform</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-600"><Link to="/assessment">Solar assessment</Link><Link to="/results">Sample results</Link><Link to="/offers">Offer comparison</Link></div>
          </div>
          <div>
            <h3 className="font-bold text-navy-950">Trust</h3>
            <p className="mt-3 flex gap-2 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-0.5 shrink-0 text-energy-600" size={18}/> Demo values are indicative. Final decisions require qualified engineering, financial and legal review.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
