import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  LineChart, LockKeyhole, Scale, ShieldCheck, Sun, Store, Warehouse,
} from 'lucide-react'

const steps: [string, string, LucideIcon][] = [
  ['Submit business information', 'Tell us about your property, operations and project goals.', Building2],
  ['Upload electricity bills', 'Add up to twelve bills and supporting property information.', FileBarChart],
  ['Receive preliminary assessment', 'Review indicative system, generation, savings and payback ranges.', BarChart3],
  ['Complete engineer inspection', 'An independent engineer verifies the site and technical constraints.', HardHat],
  ['Compare installer offers', 'Verified installers quote against one standard project specification.', Scale],
  ['Select and monitor', 'Choose the right proposal and follow progress through completion.', ClipboardCheck],
]

const categories: [string, LucideIcon][] = [
  ['Hotels', Hotel], ['Warehouses', Warehouse], ['Factories', Factory],
  ['Supermarkets', Store], ['Commercial buildings', Building2], ['High daytime loads', Zap]
]

const faqs = [
  ['Is Gefyron an installer?', 'No. Gefyron is designed as an independent intermediary coordinating assessment, specification and structured offer comparison.'],
  ['Are preliminary results guaranteed?', 'No. They are indicative ranges based on submitted information and do not replace an on-site engineering assessment or formal investment proposal.'],
  ['Why do installers quote the same specification?', 'A common technical specification makes pricing, equipment, warranties and included services easier to compare fairly.'],
  ['Does the lowest price always win?', 'No. The platform highlights value, technical quality, warranties, project timing and installer track record—not only price.'],
]

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-50 to-transparent" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
              <ShieldCheck size={16} /> Independent commercial solar comparison
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.04em] text-navy-950 sm:text-5xl lg:text-6xl">
              Find the right photovoltaic solution for your business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Upload your energy information, receive an independent assessment and compare offers from verified installers based on the same project requirements.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/assessment" className="btn-primary">Start Your Solar Assessment <ArrowRight size={18}/></Link>
              <a href="#how-it-works" className="btn-secondary">See How It Works</a>
              <button className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50">Join as an Installer</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              {['Verified installers', 'Comparable proposals', 'Role-based privacy'].map(item => <span key={item} className="flex items-center gap-2"><Check size={17} className="text-energy-600"/>{item}</span>)}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-energy-100 blur-3xl" />
            <div className="card relative overflow-hidden shadow-soft">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Sample assessment</p>
                  <h2 className="mt-1 font-bold text-navy-950">Attica Cold Storage S.A.</h2>
                </div>
                <span className="rounded-full bg-energy-50 px-3 py-1 text-xs font-bold text-energy-700">Ready for review</span>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div className="rounded-xl bg-navy-950 p-4 text-white sm:col-span-2">
                  <div className="flex justify-between text-sm text-slate-300"><span>Possible PV capacity</span><Sun size={18}/>
                  <p className="mt-2 text-3xl font-black">220–280 kWp</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-4/5 rounded-full bg-energy-500"/></div>
                </div>
                <Metric label="Annual generation" value="330–420 MWh" icon={<LineChart size={18}/>} />
                <Metric label="Self-consumption" value="70%–85%" icon={<Zap size={18}/>} />
                <Metric label="Offers received" value="3 comparable" icon={<Handshake size={18}/>} />
                <Metric label="Carbon reduction" value="145–185 t" icon={<Leaf size={18}/>} />
              </div>
              <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex items-center justify-between text-sm"><span className="font-semibold text-slate-600">Current stage</span><span className="font-bold text-brand-700">Offer comparison</span></div>
                <div className="mt-3 flex gap-2">{[1,2,3,4,5,6].map((n) => <span key={n} className={`h-2 flex-1 rounded-full ${n <= 5 ? 'bg-brand-600' : 'bg-slate-200'}`} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-8 text-white">
        <div className="container-page grid gap-6 text-center sm:grid-cols-3">
          <div><p className="text-3xl font-black">1</p><p className="mt-1 text-sm text-slate-300">Independent project specification</p></div>
          <div><p className="text-3xl font-black">3+</p><p className="mt-1 text-sm text-slate-300">Comparable installer proposals</p></div>
          <div><p className="text-3xl font-black">100%</p><p className="mt-1 text-sm text-slate-300">Business retains final decision</p></div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="section-kicker">How it works</p>
            <h2 className="section-title">A structured path from energy data to project delivery.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Gefyron replaces fragmented quotations with a coordinated process that begins with the business’s actual operating profile.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([title, text, Icon], i) => (
              <article key={title as string} className="card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon size={22}/></span>
                  <span className="text-sm font-black text-slate-300">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{title as string}</h3>
                <p className="mt-2 leading-7 text-slate-600">{text as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-kicker">Why comparison matters</p>
            <h2 className="section-title">Compare the project, not just the price.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Two offers can look similar while using different assumptions, equipment, warranty coverage and included services. Gefyron normalises the decision.</p>
            <div className="mt-8 grid gap-4">
              {[
                ['Same technical requirements', 'Every installer responds to a common specification prepared after engineering review.'],
                ['Clear trade-offs', 'Cost, generation, warranty, delivery time and services appear side by side.'],
                ['Independent summary', 'Strengths, weaknesses, risks and unanswered questions are explained without making the final choice for you.'],
              ].map(([title, text]) => <div key={title} className="flex gap-4"><span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-energy-50 text-energy-700"><Check size={18}/></span><div><h3 className="font-bold text-navy-950">{title}</h3><p className="mt-1 leading-7 text-slate-600">{text}</p></div></div>)}
            </div>
            <Link to="/offers" className="mt-8 inline-flex items-center gap-2 font-bold text-brand-700">View sample comparison <ChevronRight size={18}/></Link>
          </div>
          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 p-5"><p className="font-bold text-navy-950">Three offers. One common specification.</p></div>
            <div className="divide-y divide-slate-200">
              {[
                ['HelioWorks Energy', '€254,800', 'Best overall value', 92],
                ['Aegean Solar Projects', '€225,600', 'Lowest initial investment', 83],
                ['Solstice Engineering', '€289,500', 'Strongest warranty', 89],
              ].map(([name, price, label, score]) => <div key={name as string} className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-bold text-navy-950">{name as string}</h3><p className="mt-1 text-sm text-slate-500">{label as string}</p></div><p className="text-lg font-black text-navy-950">{price as string}</p></div><div className="mt-4 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-600" style={{width: `${score}%`}}/></div><span className="text-sm font-bold text-brand-700">{score as number}/100</span></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="text-center">
            <p className="section-kicker">Built for commercial demand</p>
            <h2 className="section-title">For businesses where electricity is a strategic cost.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map(([label, Icon]) => <div key={label as string} className="card flex min-h-36 flex-col items-center justify-center p-4 text-center"><span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon size={23}/></span><p className="mt-4 font-bold text-navy-950">{label as string}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.16em] text-energy-500">Trust and transparency</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Independent by design. Transparent in practice.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Installer verification, standard specifications, disclosed fees and role-based access help protect the credibility of every comparison.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [ShieldCheck, 'Verified installer status'], [Scale, 'Structured evaluation criteria'],
              [LockKeyhole, 'Sensitive data stays private'], [Handshake, 'Success fees disclosed'],
            ].map(([Icon, text]) => <div key={text as string} className="rounded-2xl border border-white/10 bg-white/5 p-5"><Icon className="text-energy-500"/><p className="mt-3 font-bold">{text as string}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="section-kicker">Frequently asked questions</p><h2 className="section-title">Clear answers before you begin.</h2></div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map(([q,a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy-950">{q}<span className="text-brand-600 transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-slate-600">{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-navy-950 p-8 text-white shadow-soft md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div><p className="text-sm font-bold uppercase tracking-widest text-brand-100">Start with your actual energy profile</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Make your next solar decision easier to understand.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-brand-100">Complete the guided assessment and explore a fully demonstrated commercial solar workflow.</p></div>
              <Link to="/assessment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-brand-700 hover:bg-brand-50">Start Solar Assessment <ArrowRight size={18}/></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Metric({label, value, icon}: {label:string; value:string; icon:React.ReactNode}) {
  return <div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between text-sm text-slate-500"><span>{label}</span><span className="text-brand-600">{icon}</span></div><p className="mt-2 text-xl font-black text-navy-950">{value}</p></div>
}
