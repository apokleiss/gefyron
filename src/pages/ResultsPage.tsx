import { Link } from 'react-router-dom'
import {
  Sun, TrendingDown, Zap
} from 'lucide-react'
import { sampleProject } from '../data/sample'

const metrics = [
  {
  label: 'Possible PV capacity',value: '220–280',unit: 'kWp',icon: Sun,note: 'Subject to structural and electrical review'},
  {label:'Annual generation', value:'330–420', unit:'MWh', icon:LineChart, note:'Indicative production range'},
  {label:'Self-consumption', value:'70%–85%', unit:'', icon:Zap, note:'Based on submitted operating pattern'},
  {label:'Annual cost savings', value:'€62k–€91k', unit:'', icon:TrendingDown, note:'Demonstration value only'},
  {label:'Investment range', value:'€215k–€305k', unit:'', icon:Gauge, note:'Before final engineering and quotations'},
  {label:'Indicative payback', value:'4.8–7.2', unit:'years', icon:CalendarDays, note:'Sensitive to tariffs and financing'},
  {label:'Carbon reduction', value:'145–185', unit:'tCO₂/yr', icon:Leaf, note:'Indicative grid-factor estimate'},
  {label:'Roof area required', value:'1,150–1,420', unit:'m²', icon:Ruler, note:'Layout and access zones not final'},
]

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8 md:py-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-energy-50 px-3 py-1 text-sm font-bold text-energy-700">Preliminary assessment ready</span>
                <span className="text-sm text-slate-500">Assessment GF-2026-0018</span>
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-navy-950 md:text-4xl">Commercial solar opportunity identified.</h1>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">The submitted profile suggests that a commercial photovoltaic installation may be suitable. The ranges below require independent on-site verification.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="btn-secondary"><Download size={18}/> Download Summary</button>
              <Link to="/offers" className="btn-primary">View Sample Offers <ArrowRight size={18}/></Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page mt-8 grid gap-7 lg:grid-cols-[1fr_310px]">
        <div className="space-y-7">
          <section className="card p-5 md:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Sample business</p>
                <h2 className="mt-2 text-2xl font-black text-navy-950">{sampleProject.business}</h2>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                  <span className="flex items-center gap-2"><Building2 size={17} className="text-brand-600"/>{sampleProject.type}</span>
                  <span className="flex items-center gap-2"><MapPin size={17} className="text-brand-600"/>{sampleProject.location}</span>
                  <span className="flex items-center gap-2"><Zap size={17} className="text-brand-600"/>{sampleProject.annualConsumption}</span>
                </div>
              </div>
              <Link to="/assessment" className="btn-secondary !py-2.5"><Edit3 size={17}/> Update information</Link>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="section-kicker">Estimated outcomes</p><h2 className="mt-2 text-2xl font-black text-navy-950">Indicative project ranges</h2></div>
              <p className="hidden text-sm text-slate-500 sm:block">All figures are demonstrations</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map(({label,value,unit,icon:Icon,note}) => (
                <article key={label} className="card p-5">
                  <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p><span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700"><Icon size={18}/></span></div>
                  <p className="mt-5 text-2xl font-black tracking-tight text-navy-950">{value} <span className="text-base font-bold text-slate-500">{unit}</span></p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">{note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card overflow-hidden">
            <div className="border-b border-slate-200 p-5 md:p-7">
              <p className="section-kicker">Energy profile</p>
              <h2 className="mt-2 text-2xl font-black text-navy-950">Why the site appears promising</h2>
            </div>
            <div className="grid gap-8 p-5 md:p-7 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <h3 className="font-bold text-navy-950">Indicative daily consumption alignment</h3>
                <div className="mt-6 grid h-56 grid-cols-12 items-end gap-2 rounded-xl bg-slate-50 p-4" aria-label="Illustrative daily load and solar alignment chart">
                  {[28,25,24,28,45,67,79,88,92,86,76,61].map((h,i)=><div key={i} className="flex h-full flex-col justify-end gap-1"><div className="rounded-t bg-brand-100" style={{height:`${Math.max(12,h-18)}%`}}/><div className="rounded-t bg-energy-500" style={{height:`${h}%`}}/></div>)}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-500"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-energy-500"/>Business demand</span><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-brand-100"/>Potential PV production</span><span>06:00 → 22:00</span></div>
              </div>
              <div className="grid content-start gap-4">
                <Reason title="High daytime demand" text="Refrigeration loads operate through the main solar-production window." />
                <Reason title="Large available roof" text="The submitted 1,600 m² area may accommodate the indicative system range." />
                <Reason title="Strong self-consumption potential" text="Most generated electricity may be consumed directly by the business." />
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="card p-6">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-energy-50 text-energy-700"><BatteryCharging size={21}/></span><div><p className="text-sm text-slate-500">Battery suitability</p><h2 className="font-black text-navy-950">Further assessment required</h2></div></div>
              <p className="mt-5 leading-7 text-slate-600">Daytime self-consumption appears high, so battery value will depend on demand charges, evening loads, backup requirements and available financing.</p>
              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Engineer to verify:</strong> critical loads, peak-demand tariff, installation location and fire-safety constraints.</div>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><CheckCircle2 size={21}/></span><div><p className="text-sm text-slate-500">Recommended next step</p><h2 className="font-black text-navy-950">Independent site assessment</h2></div></div>
              <p className="mt-5 leading-7 text-slate-600">An engineer should confirm roof dimensions, structure, shading, electrical connection capacity, access and cable-routing options.</p>
              <button className="btn-primary mt-5 w-full">Request Engineer Assessment <ArrowRight size={18}/></button>
            </div>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
            <div className="flex gap-4"><AlertTriangle className="mt-0.5 shrink-0 text-amber-700"/><div><h2 className="font-bold text-amber-950">Important preliminary-result disclaimer</h2><p className="mt-2 leading-7 text-amber-900">This preliminary result is based on the information provided and does not replace an on-site engineering assessment, structural review, electrical study or formal investment proposal.</p></div></div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="card overflow-hidden lg:sticky lg:top-24">
            <div className="bg-navy-950 p-5 text-white"><p className="text-sm font-semibold text-slate-300">Assessment progress</p><h2 className="mt-1 text-xl font-black">Next: engineer review</h2></div>
            <div className="p-5">
              <div className="space-y-0">
                <Timeline label="Information submitted" done/>
                <Timeline label="Preliminary assessment" done/>
                <Timeline label="Engineer inspection" current/>
                <Timeline label="Standard specification" />
                <Timeline label="Installer offers" />
                <Timeline label="Project selection" last/>
              </div>
              <button className="btn-primary mt-6 w-full">Request Engineer Assessment</button>
              <button className="btn-secondary mt-3 w-full"><Phone size={17}/> Schedule Consultation</button>
            </div>
            <div className="border-t border-slate-200 bg-slate-50 p-5">
              <div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-energy-700" size={19}/><p className="text-sm leading-6 text-slate-600">A final system recommendation will only be prepared after qualified engineering review.</p></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Reason({title,text}:{title:string;text:string}) {return <div className="rounded-xl border border-slate-200 p-4"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-energy-600" size={19}/><div><h4 className="font-bold text-navy-950">{title}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div></div></div>}
function Timeline({label,done,current,last}:{label:string;done?:boolean;current?:boolean;last?:boolean}) {return <div className="flex gap-3"><div className="flex flex-col items-center"><span className={`grid h-7 w-7 place-items-center rounded-full border-2 text-xs font-bold ${done?'border-energy-600 bg-energy-600 text-white':current?'border-brand-600 bg-brand-50 text-brand-700':'border-slate-300 bg-white text-slate-400'}`}>{done?<CheckCircle2 size={15}/>:current?'3':''}</span>{!last&&<span className={`h-9 w-0.5 ${done?'bg-energy-500':'bg-slate-200'}`}/>}</div><p className={`pt-1 text-sm font-semibold ${done?'text-energy-700':current?'text-brand-700':'text-slate-400'}`}>{label}</p></div>}
