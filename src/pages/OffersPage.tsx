import { useMemo, useState } from 'react'
import {
  AlertCircle, ArrowDownUp, Award, BatteryCharging, Building2, Check, ChevronDown,
  CircleDollarSign, Clock3, Download, FileText, Filter, Info, MessageSquare,
  ShieldCheck, Sparkles, Star, TrendingUp, Trophy, XCircle
} from 'lucide-react'
import { comparisonRows, offers, sampleProject, type Offer } from '../data/sample'

type SortKey = 'value'|'price'|'costPerKwp'|'generation'|'warranty'|'duration'|'rating'

export default function OffersPage() {
  const [sort, setSort] = useState<SortKey>('value')
  const [selected, setSelected] = useState<string[]>(offers.map(o=>o.id))
  const [mobileOffer, setMobileOffer] = useState(offers[0].id)

  const sorted = useMemo(() => {
    const data = offers.filter(o=>selected.includes(o.id))
    return [...data].sort((a,b)=>{
      if(sort==='price') return a.totalCost-b.totalCost
      if(sort==='costPerKwp') return a.costPerKwp-b.costPerKwp
      if(sort==='generation') return b.annualGeneration-a.annualGeneration
      if(sort==='rating') return b.rating-a.rating
      if(sort==='duration') return parseInt(a.duration)-parseInt(b.duration)
      if(sort==='warranty') return parseInt(b.installationWarranty)-parseInt(a.installationWarranty)
      return b.score-a.score
    })
  },[sort,selected])

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">3 verified proposals</span><span className="text-sm text-slate-500">Project GF-2026-0018</span></div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-navy-950 md:text-4xl">Compare installer offers</h1>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">Each proposal responds to the same demonstration project specification for {sampleProject.business}.</p>
            </div>
            <div className="flex gap-3"><button className="btn-secondary"><Download size={18}/> Export comparison</button><button className="btn-primary"><MessageSquare size={18}/> Ask Gefyron</button></div>
          </div>
        </div>
      </section>

      <div className="container-page mt-7">
        <section className="card p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="flex items-center gap-2"><Building2 size={17} className="text-brand-600"/>{sampleProject.type}</span>
              <span className="flex items-center gap-2"><TrendingUp size={17} className="text-brand-600"/>{sampleProject.systemRange}</span>
              <span className="flex items-center gap-2"><Clock3 size={17} className="text-brand-600"/>Target: within 9 months</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative"><span className="sr-only">Sort offers</span><ArrowDownUp className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={17}/><select value={sort} onChange={e=>setSort(e.target.value as SortKey)} className="input min-w-56 pl-10"><option value="value">Best overall value</option><option value="price">Lowest total cost</option><option value="costPerKwp">Lowest cost per kWp</option><option value="generation">Highest generation</option><option value="warranty">Longest warranty</option><option value="duration">Fastest completion</option><option value="rating">Highest installer rating</option></select></label>
              <button className="btn-secondary !py-2.5"><Filter size={17}/> Filters</button>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">{offers.map(o=><button key={o.id} onClick={()=>setSelected(selected.includes(o.id)?selected.filter(x=>x!==o.id):[...selected,o.id])} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${selected.includes(o.id)?'border-brand-200 bg-brand-50 text-brand-700':'border-slate-200 bg-white text-slate-400'}`}><span className={`grid h-4 w-4 place-items-center rounded border ${selected.includes(o.id)?'border-brand-600 bg-brand-600 text-white':'border-slate-300'}`}>{selected.includes(o.id)&&<Check size={11}/>}</span>{o.installer}</button>)}</div>
        </section>

        <section className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="grid" style={{gridTemplateColumns:`230px repeat(${Math.max(sorted.length,1)}, minmax(250px, 1fr))`}}>
            <div className="border-b border-r border-slate-200 bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Comparison criteria</p><p className="mt-3 text-sm leading-6 text-slate-600">All offers use a common project brief.</p></div>
            {sorted.map((offer,i)=><OfferHeader key={offer.id} offer={offer} first={i===0}/>) }
            {comparisonRows.map(([label,getValue],rowIndex)=><div className="contents" key={label}><div className={`border-r border-slate-200 px-5 py-4 text-sm font-semibold text-slate-600 ${rowIndex%2?'bg-slate-50/70':'bg-white'}`}>{label}</div>{sorted.map(offer=><div key={`${offer.id}-${label}`} className={`border-l-0 px-5 py-4 text-sm leading-6 text-navy-950 ${rowIndex%2?'bg-slate-50/70':'bg-white'}`}>{getValue(offer)}</div>)}</div>)}
            <div className="border-r border-t border-slate-200 bg-white p-5 font-bold text-navy-950">Actions</div>
            {sorted.map(offer=><div key={`${offer.id}-actions`} className="border-t border-slate-200 p-5"><button className="btn-primary w-full !py-2.5">Review proposal</button><button className="mt-2 w-full rounded-lg px-3 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50">Ask a question</button></div>)}
          </div>
        </section>

        <section className="mt-6 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-3">{sorted.map(o=><button key={o.id} onClick={()=>setMobileOffer(o.id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${mobileOffer===o.id?'bg-brand-600 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{o.installer}</button>)}</div>
          {sorted.filter(o=>o.id===mobileOffer).map(o=><MobileOffer key={o.id} offer={o}/>) }
          {sorted.length===0&&<div className="card p-8 text-center text-slate-600">Select at least one installer to compare.</div>}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-r from-brand-50 to-white p-6">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white"><Sparkles size={22}/></span><div><p className="text-sm font-bold uppercase tracking-widest text-brand-600">Independent comparison summary</p><h2 className="mt-1 text-2xl font-black text-navy-950">A balanced choice depends on your priorities.</h2></div></div>
            </div>
            <div className="p-6">
              <p className="leading-7 text-slate-600">Based on the demonstration data, <strong className="text-navy-950">HelioWorks Energy</strong> provides the strongest balance of price, production, warranties and delivery confidence. <strong className="text-navy-950">Aegean Solar Projects</strong> minimises initial investment, while <strong className="text-navy-950">Solstice Engineering</strong> offers the most comprehensive equipment and warranty package.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Recommendation icon={<Trophy/>} title="Best overall value" value="HelioWorks Energy" text="Strong balance across cost, warranty and project execution."/>
                <Recommendation icon={<CircleDollarSign/>} title="Lowest investment" value="Aegean Solar Projects" text="€29,200 below the next-lowest proposal."/>
                <Recommendation icon={<Award/>} title="Strongest warranty" value="Solstice Engineering" text="Premium coverage and five years of maintenance."/>
              </div>
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="flex gap-3"><AlertCircle className="mt-0.5 shrink-0 text-amber-700" size={19}/><p className="text-sm leading-6 text-amber-900"><strong>Clarify before selection:</strong> structural-assessment responsibility, grid-upgrade exclusions, production-guarantee assumptions, final battery scope and fault-response service levels.</p></div></div>
            </div>
          </div>

          <div className="space-y-5">
            <section className="card p-6">
              <h2 className="font-black text-navy-950">Decision status</h2>
              <div className="mt-5 grid gap-3"><Status label="3 proposals received" done/><Status label="Independent comparison prepared" done/><Status label="Clarifications pending" current/><Status label="Installer selection"/></div>
              <button className="btn-primary mt-6 w-full">Start clarification round</button>
            </section>
            <section className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <div className="flex gap-3"><Info className="mt-0.5 shrink-0 text-brand-700" size={19}/><div><h3 className="font-bold text-brand-950">The cheapest offer is not automatically the best.</h3><p className="mt-2 text-sm leading-6 text-brand-900">Review equipment quality, realistic generation assumptions, included works, warranties and long-term service alongside total price.</p></div></div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-energy-700" size={19}/><p className="text-sm leading-6 text-slate-600">Gefyron does not make the final decision. The business remains responsible for selection and may require legal, financial and engineering advice.</p></div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

function OfferHeader({offer,first}:{offer:Offer;first:boolean}) {return <div className={`border-b border-l border-slate-200 p-5 ${first?'bg-brand-50/70':'bg-white'}`}><div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950 text-sm font-black text-white">{offer.initials}</span><span className="rounded-full bg-energy-50 px-2.5 py-1 text-[11px] font-bold text-energy-700">Verified</span></div><h2 className="mt-4 text-lg font-black text-navy-950">{offer.installer}</h2><p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-700">{offer.badge}</p><div className="mt-4 flex items-end justify-between"><p className="text-2xl font-black text-navy-950">€{offer.totalCost.toLocaleString()}</p><span className="rounded-lg bg-white px-2 py-1 text-sm font-black text-brand-700 shadow-sm">{offer.score}/100</span></div></div>}
function MobileOffer({offer}:{offer:Offer}) {return <article className="card overflow-hidden"><div className="bg-navy-950 p-5 text-white"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-energy-500">{offer.badge}</p><h2 className="mt-2 text-xl font-black">{offer.installer}</h2></div><span className="rounded-lg bg-white/10 px-3 py-2 font-black">{offer.score}/100</span></div><p className="mt-4 text-3xl font-black">€{offer.totalCost.toLocaleString()}</p><p className="mt-1 text-sm text-slate-300">€{offer.costPerKwp}/kWp · {offer.systemSize} kWp</p></div><div className="p-5"><p className="text-sm leading-6 text-slate-600">{offer.highlight}</p><details className="mt-5 border-t border-slate-200 pt-4"><summary className="flex cursor-pointer list-none items-center justify-between font-bold text-navy-950">Full proposal details <ChevronDown size={18}/></summary><dl className="mt-4 divide-y divide-slate-100">{comparisonRows.map(([l,get])=><div key={l} className="grid grid-cols-[1fr_1.2fr] gap-3 py-3 text-sm"><dt className="text-slate-500">{l}</dt><dd className="text-right font-semibold text-navy-950">{get(offer)}</dd></div>)}</dl></details><div className="mt-5 grid gap-2"><button className="btn-primary">Review proposal</button><button className="btn-secondary">Ask a question</button></div></div></article>}
function Recommendation({icon,title,value,text}:{icon:React.ReactNode;title:string;value:string;text:string}) {return <div className="rounded-xl border border-slate-200 p-4"><span className="text-brand-700">{icon}</span><p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p><h3 className="mt-1 font-black text-navy-950">{value}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>}
function Status({label,done,current}:{label:string;done?:boolean;current?:boolean}) {return <div className="flex items-center gap-3"><span className={`grid h-7 w-7 place-items-center rounded-full ${done?'bg-energy-100 text-energy-700':current?'bg-brand-100 text-brand-700':'bg-slate-100 text-slate-400'}`}>{done?<Check size={15}/>:current?<Clock3 size={14}/>:<span className="h-2 w-2 rounded-full bg-current"/>}</span><span className={`text-sm font-semibold ${done?'text-energy-700':current?'text-brand-700':'text-slate-400'}`}>{label}</span></div>}
