import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, Clock3, FileSpreadsheet,
  FileText, Image, Info, LandPlot, Loader2, MapPin, Paperclip, ShieldCheck,
  Sparkles, UploadCloud, X, Zap
} from 'lucide-react'

const steps = [
  'Business', 'Property', 'Electricity', 'Bill upload', 'Objectives', 'Budget', 'Review'
]

const initial = {
  businessName: 'Attica Cold Storage S.A.', businessActivity: 'Refrigerated warehouse', contactPerson: 'Eleni Pappas',
  email: 'eleni@example.com', phone: '+30 210 555 0142', locations: '1', taxNumber: '', contactMethod: 'Email',
  address: 'Aspropyrgos, Attica', ownership: 'Owned property', installationType: 'Roof installation', area: '1600',
  roofType: 'Industrial metal roof', roofCondition: 'Good', height: '11', shading: 'Minor rooftop equipment',
  provider: 'Demo Energy Provider', supplyNumber: '', connection: 'Three-phase supply', contractedPower: '500 kVA',
  monthlyCost: '31000', annualConsumption: '420000', workingDays: 'Monday to Saturday', operatingHours: '06:00–22:00',
  peakHours: '08:00–18:00', seasonality: 'Higher in summer', existingSystem: 'Backup generator', storageInterest: 'Further assessment',
  budget: '€200,000–€300,000', completion: 'Within 9 months', financing: 'Interested', ownershipModel: 'Not sure',
  maintenance: 'Yes', comments: 'Priority is to reduce daytime refrigeration costs without disrupting operations.'
}

type FormData = typeof initial

type UploadedFile = {name:string; size:string; type:string}

export default function AssessmentPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initial)
  const [files, setFiles] = useState<UploadedFile[]>([
    {name:'Electricity_Bill_January.pdf', size:'1.8 MB', type:'PDF'},
    {name:'Electricity_Bill_February.pdf', size:'1.6 MB', type:'PDF'},
    {name:'Roof_plan.xlsx', size:'420 KB', type:'Spreadsheet'},
  ])
  const [objectives, setObjectives] = useState(['Reduce electricity expenses', 'Protect against future electricity-price increases'])
  const [consents, setConsents] = useState([true, true, true, true])
  const [submitting, setSubmitting] = useState(false)

  const update = (key:keyof FormData, value:string) => setForm(prev => ({...prev, [key]:value}))
  const progress = ((step + 1) / steps.length) * 100
  const canSubmit = consents.every(Boolean)

  const extracted = useMemo(() => ({
    months: Math.max(2, files.filter(f => f.type === 'PDF').length),
    annual: '420,000 kWh', daytime: '78%', night: '22%', maxDemand: '412 kW'
  }), [files])

  const next = () => { window.scrollTo({top:0, behavior:'smooth'}); setStep(s => Math.min(s + 1, steps.length - 1)) }
  const back = () => { window.scrollTo({top:0, behavior:'smooth'}); setStep(s => Math.max(s - 1, 0)) }
  const submit = () => {
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => navigate('/results'), 650)
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 md:py-12">
      <div className="container-page">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Business solar assessment</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-navy-950 md:text-4xl">Build your commercial energy profile.</h1>
              <p className="mt-3 max-w-2xl text-slate-600">Complete the guided questionnaire. You can review everything before submitting.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="font-bold text-navy-950">Sample mode</span><span className="ml-2 text-slate-500">Demo values pre-filled</span>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 bg-white px-5 py-5 md:px-8">
              <div className="mb-3 flex items-center justify-between text-sm"><span className="font-bold text-navy-950">Step {step + 1} of {steps.length}</span><span className="text-slate-500">{steps[step]}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{width:`${progress}%`}}/></div>
              <div className="mt-4 hidden grid-cols-7 gap-2 md:grid">
                {steps.map((label, i) => <button key={label} onClick={() => i <= step && setStep(i)} className={`text-left text-xs font-semibold ${i === step ? 'text-brand-700' : i < step ? 'text-energy-700' : 'text-slate-400'}`}><span className={`mr-1 inline-grid h-5 w-5 place-items-center rounded-full text-[10px] ${i < step ? 'bg-energy-100' : i === step ? 'bg-brand-100' : 'bg-slate-100'}`}>{i < step ? <Check size={12}/> : i+1}</span>{label}</button>)}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_300px]">
              <div className="p-5 md:p-8">
                {step === 0 && <BusinessStep form={form} update={update}/>} 
                {step === 1 && <PropertyStep form={form} update={update}/>} 
                {step === 2 && <ElectricityStep form={form} update={update}/>} 
                {step === 3 && <UploadStep files={files} setFiles={setFiles} extracted={extracted}/>} 
                {step === 4 && <ObjectivesStep selected={objectives} setSelected={setObjectives}/>} 
                {step === 5 && <BudgetStep form={form} update={update}/>} 
                {step === 6 && <ReviewStep form={form} files={files} objectives={objectives} consents={consents} setConsents={setConsents}/>} 

                <div className="mt-10 flex flex-col-reverse justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                  <button onClick={back} disabled={step === 0} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={18}/> Back</button>
                  {step < steps.length - 1 ? (
                    <button onClick={next} className="btn-primary">Continue <ArrowRight size={18}/></button>
                  ) : (
                    <button onClick={submit} disabled={!canSubmit || submitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-50">
                      {submitting ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>} Generate Preliminary Assessment
                    </button>
                  )}
                </div>
              </div>

              <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 md:p-6">
                <h2 className="font-bold text-navy-950">Assessment summary</h2>
                <div className="mt-5 grid gap-4 text-sm">
                  <SummaryItem icon={<Building2 size={17}/>} label="Business" value={form.businessName || 'Not provided'}/>
                  <SummaryItem icon={<MapPin size={17}/>} label="Location" value={form.address || 'Not provided'}/>
                  <SummaryItem icon={<LandPlot size={17}/>} label="Available area" value={form.area ? `${form.area} m²` : 'Not provided'}/>
                  <SummaryItem icon={<Zap size={17}/>} label="Annual consumption" value={form.annualConsumption ? `${Number(form.annualConsumption).toLocaleString()} kWh` : 'Not provided'}/>
                  <SummaryItem icon={<Paperclip size={17}/>} label="Uploaded files" value={`${files.length} files`}/>
                </div>
                <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-4">
                  <div className="flex gap-3"><Info className="mt-0.5 shrink-0 text-brand-700" size={18}/><p className="text-sm leading-6 text-brand-900">Your information is used only to prepare this demonstration assessment. Sensitive project data should be protected with role-based access in production.</p></div>
                </div>
                <div className="mt-4 rounded-xl border border-energy-100 bg-energy-50 p-4">
                  <div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-energy-700" size={18}/><p className="text-sm leading-6 text-energy-800">No result shown by this prototype is a final engineering study or guaranteed investment outcome.</p></div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BusinessStep({form, update}:{form:FormData; update:(k:keyof FormData,v:string)=>void}) {
  return <StepShell icon={<Building2/>} title="Business information" text="Tell us who the assessment is for and how we should contact you.">
    <FieldGrid>
      <Field label="Business name"><Input value={form.businessName} onChange={v=>update('businessName',v)}/></Field>
      <Field label="Business activity"><Input value={form.businessActivity} onChange={v=>update('businessActivity',v)}/></Field>
      <Field label="Contact person"><Input value={form.contactPerson} onChange={v=>update('contactPerson',v)}/></Field>
      <Field label="Email"><Input type="email" value={form.email} onChange={v=>update('email',v)}/></Field>
      <Field label="Telephone"><Input value={form.phone} onChange={v=>update('phone',v)}/></Field>
      <Field label="Number of locations"><Input type="number" value={form.locations} onChange={v=>update('locations',v)}/></Field>
      <Field label="Company tax number" hint="Optional"><Input value={form.taxNumber} onChange={v=>update('taxNumber',v)} placeholder="Optional"/></Field>
      <Field label="Preferred contact method"><Select value={form.contactMethod} onChange={v=>update('contactMethod',v)} options={['Email','Telephone','Video call']}/></Field>
    </FieldGrid>
  </StepShell>
}

function PropertyStep({form, update}:{form:FormData; update:(k:keyof FormData,v:string)=>void}) {
  return <StepShell icon={<MapPin/>} title="Property information" text="Describe the proposed installation site and any known physical constraints.">
    <FieldGrid>
      <Field label="Property address" wide><Input value={form.address} onChange={v=>update('address',v)}/></Field>
      <Field label="Property ownership"><Select value={form.ownership} onChange={v=>update('ownership',v)} options={['Owned property','Rented property','Property owner approval available']}/></Field>
      <Field label="Installation type"><Select value={form.installationType} onChange={v=>update('installationType',v)} options={['Roof installation','Ground installation','Mixed installation']}/></Field>
      <Field label="Approximate available area (m²)"><Input type="number" value={form.area} onChange={v=>update('area',v)}/></Field>
      <Field label="Roof type"><Select value={form.roofType} onChange={v=>update('roofType',v)} options={['Industrial metal roof','Flat concrete roof','Tile roof','Ground area','Other']}/></Field>
      <Field label="Roof condition"><Select value={form.roofCondition} onChange={v=>update('roofCondition',v)} options={['Good','Requires inspection','Renovation planned','Unknown']}/></Field>
      <Field label="Building height (m)"><Input type="number" value={form.height} onChange={v=>update('height',v)}/></Field>
      <Field label="Known shading obstacles" wide><Input value={form.shading} onChange={v=>update('shading',v)} placeholder="Nearby buildings, equipment, trees..."/></Field>
    </FieldGrid>
    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"><Image className="mx-auto text-slate-400"/><p className="mt-3 font-bold text-navy-950">Optional roof photographs and property plans</p><p className="mt-1 text-sm text-slate-500">These can also be added during the bill-upload step.</p><button className="btn-secondary mt-4 !py-2.5"><UploadCloud size={17}/> Select files</button></div>
  </StepShell>
}

function ElectricityStep({form, update}:{form:FormData; update:(k:keyof FormData,v:string)=>void}) {
  return <StepShell icon={<Zap/>} title="Electricity information" text="Your consumption pattern is central to estimating system size and self-consumption.">
    <FieldGrid>
      <Field label="Electricity provider"><Input value={form.provider} onChange={v=>update('provider',v)}/></Field>
      <Field label="Electricity supply number" hint="Optional"><Input value={form.supplyNumber} onChange={v=>update('supplyNumber',v)} placeholder="Kept private"/></Field>
      <Field label="Connection type"><Select value={form.connection} onChange={v=>update('connection',v)} options={['Three-phase supply','Single-phase supply','Medium voltage','Unknown']}/></Field>
      <Field label="Contracted power"><Input value={form.contractedPower} onChange={v=>update('contractedPower',v)}/></Field>
      <Field label="Average monthly electricity cost (€)"><Input type="number" value={form.monthlyCost} onChange={v=>update('monthlyCost',v)}/></Field>
      <Field label="Estimated annual consumption (kWh)"><Input type="number" value={form.annualConsumption} onChange={v=>update('annualConsumption',v)}/></Field>
      <Field label="Working days"><Input value={form.workingDays} onChange={v=>update('workingDays',v)}/></Field>
      <Field label="Daily operating hours"><Input value={form.operatingHours} onChange={v=>update('operatingHours',v)}/></Field>
      <Field label="Hours of highest electricity use"><Input value={form.peakHours} onChange={v=>update('peakHours',v)}/></Field>
      <Field label="Seasonal use pattern"><Select value={form.seasonality} onChange={v=>update('seasonality',v)} options={['Stable all year','Higher in summer','Higher in winter','Highly seasonal','Unknown']}/></Field>
      <Field label="Existing generator or renewable system"><Input value={form.existingSystem} onChange={v=>update('existingSystem',v)}/></Field>
      <Field label="Interest in battery storage"><Select value={form.storageInterest} onChange={v=>update('storageInterest',v)} options={['Yes','No','Further assessment','Only if financially attractive']}/></Field>
    </FieldGrid>
  </StepShell>
}

function UploadStep({files,setFiles,extracted}:{files:UploadedFile[];setFiles:(v:UploadedFile[])=>void;extracted:{months:number;annual:string;daytime:string;night:string;maxDemand:string}}) {
  const addDemo = () => setFiles([...files, {name:`Electricity_Bill_${files.length+1}.pdf`, size:'1.5 MB', type:'PDF'}])
  return <StepShell icon={<UploadCloud/>} title="Electricity bill upload" text="Upload up to twelve monthly bills. PDF, image and spreadsheet files are supported in the prototype.">
    <button onClick={addDemo} className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-8 text-center transition hover:bg-brand-50">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm"><UploadCloud size={26}/></span>
      <span className="mt-4 font-bold text-navy-950">Drop files here or choose from your device</span>
      <span className="mt-1 text-sm text-slate-500">PDF, JPG, PNG, XLSX · up to 12 bills</span>
      <span className="btn-secondary mt-4 !py-2.5">Choose files</span>
    </button>
    <div className="mt-6 grid gap-3">
      {files.map((file,i) => <div key={`${file.name}-${i}`} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"><span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-brand-700">{file.type==='PDF'?<FileText size={20}/>:file.type==='Spreadsheet'?<FileSpreadsheet size={20}/>:<Image size={20}/>}</span><div className="min-w-0 flex-1"><p className="truncate font-semibold text-navy-950">{file.name}</p><p className="text-xs text-slate-500">{file.size} · Uploaded</p></div><CheckCircle2 className="text-energy-600" size={20}/><button onClick={()=>setFiles(files.filter((_,idx)=>idx!==i))} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${file.name}`}><X size={18}/></button></div>)}
    </div>
    <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start gap-3"><Sparkles className="mt-0.5 text-brand-700" size={20}/><div><h3 className="font-bold text-navy-950">Simulated extraction preview</h3><p className="mt-1 text-sm leading-6 text-slate-600">These values demonstrate the intended experience and are not a legally or technically final bill analysis.</p></div></div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">{[['Bills',`${extracted.months} months`],['Annual use',extracted.annual],['Daytime',extracted.daytime],['Nighttime',extracted.night],['Max demand',extracted.maxDemand]].map(([l,v])=><div key={l} className="rounded-xl bg-white p-3"><p className="text-xs text-slate-500">{l}</p><p className="mt-1 text-sm font-bold text-navy-950">{v}</p></div>)}</div>
    </div>
  </StepShell>
}

const objectiveOptions = ['Reduce electricity expenses','Increase energy independence','Reduce carbon emissions','Install battery storage','Protect against future electricity-price increases','Improve environmental performance','Prepare for electric-vehicle charging','Obtain financing','Explore available funding programmes']
function ObjectivesStep({selected,setSelected}:{selected:string[];setSelected:(v:string[])=>void}) {
  const toggle=(item:string)=>setSelected(selected.includes(item)?selected.filter(x=>x!==item):[...selected,item])
  return <StepShell icon={<CheckCircle2/>} title="Project objectives" text="Select the outcomes that matter most to your business. You may choose more than one.">
    <div className="grid gap-3 md:grid-cols-2">{objectiveOptions.map(item=><button key={item} onClick={()=>toggle(item)} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${selected.includes(item)?'border-brand-500 bg-brand-50':'border-slate-200 bg-white hover:border-slate-300'}`}><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border ${selected.includes(item)?'border-brand-600 bg-brand-600 text-white':'border-slate-300'}`}>{selected.includes(item)&&<Check size={15}/>}</span><span className="font-semibold text-navy-950">{item}</span></button>)}</div>
  </StepShell>
}

function BudgetStep({form, update}:{form:FormData; update:(k:keyof FormData,v:string)=>void}) {
  return <StepShell icon={<Clock3/>} title="Budget and timeframe" text="Indicative preferences help Gefyron prepare suitable commercial scenarios.">
    <FieldGrid>
      <Field label="Indicative investment budget"><Select value={form.budget} onChange={v=>update('budget',v)} options={['Below €100,000','€100,000–€200,000','€200,000–€300,000','€300,000–€500,000','Above €500,000','Not decided']}/></Field>
      <Field label="Preferred completion date"><Select value={form.completion} onChange={v=>update('completion',v)} options={['Within 3 months','Within 6 months','Within 9 months','Within 12 months','No fixed deadline']}/></Field>
      <Field label="Interest in financing"><Select value={form.financing} onChange={v=>update('financing',v)} options={['Interested','Not interested','Need more information']}/></Field>
      <Field label="Leasing / third-party ownership"><Select value={form.ownershipModel} onChange={v=>update('ownershipModel',v)} options={['Interested','Not interested','Not sure']}/></Field>
      <Field label="Maintenance services"><Select value={form.maintenance} onChange={v=>update('maintenance',v)} options={['Yes','No','Compare options']}/></Field>
      <Field label="Additional comments" wide><textarea className="input min-h-32 resize-y" value={form.comments} onChange={e=>update('comments',e.target.value)}/></Field>
    </FieldGrid>
  </StepShell>
}

function ReviewStep({form,files,objectives,consents,setConsents}:{form:FormData;files:UploadedFile[];objectives:string[];consents:boolean[];setConsents:(v:boolean[])=>void}) {
  const sections = [
    ['Business', [['Name',form.businessName],['Activity',form.businessActivity],['Contact',form.contactPerson],['Email',form.email]]],
    ['Property', [['Location',form.address],['Ownership',form.ownership],['Installation',form.installationType],['Available area',`${form.area} m²`]]],
    ['Electricity', [['Annual consumption',`${Number(form.annualConsumption).toLocaleString()} kWh`],['Monthly cost',`€${Number(form.monthlyCost).toLocaleString()}`],['Operating hours',form.operatingHours],['Peak use',form.peakHours]]],
    ['Project', [['Objectives',objectives.join(', ')],['Budget',form.budget],['Completion',form.completion],['Files',`${files.length} uploaded`]]]
  ]
  const labels = ['I accept the Privacy Policy.','I accept the Terms of Service.','I permit Gefyron to analyse the uploaded information.','I understand that the preliminary assessment is not a final engineering study.']
  return <StepShell icon={<ClipboardReviewIcon/>} title="Review and submit" text="Check the information below and confirm the required permissions.">
    <div className="grid gap-4 md:grid-cols-2">{sections.map(([title,items])=><div key={title as string} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold text-navy-950">{title as string}</h3><dl className="mt-4 grid gap-3">{(items as string[][]).map(([l,v])=><div key={l}><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l}</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{v || 'Not provided'}</dd></div>)}</dl></div>)}</div>
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-bold text-navy-950">Required confirmations</h3><div className="mt-4 grid gap-3">{labels.map((label,i)=><label key={label} className="flex cursor-pointer items-start gap-3 rounded-xl bg-white p-3"><input type="checkbox" checked={consents[i]} onChange={()=>setConsents(consents.map((x,idx)=>idx===i?!x:x))} className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"/><span className="text-sm leading-6 text-slate-700">{label}</span></label>)}</div></div>
  </StepShell>
}

function ClipboardReviewIcon(){ return <CheckCircle2/> }
function StepShell({icon,title,text,children}:{icon:React.ReactNode;title:string;text:string;children:React.ReactNode}){return <section><div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">{icon}</span><div><h2 className="text-2xl font-black text-navy-950">{title}</h2><p className="mt-1 leading-7 text-slate-600">{text}</p></div></div><div className="mt-8">{children}</div></section>}
function FieldGrid({children}:{children:React.ReactNode}){return <div className="grid gap-5 md:grid-cols-2">{children}</div>}
function Field({label,hint,wide,children}:{label:string;hint?:string;wide?:boolean;children:React.ReactNode}){return <label className={wide?'md:col-span-2':''}><span className="label">{label}{hint&&<span className="ml-2 font-normal text-slate-400">{hint}</span>}</span>{children}</label>}
function Input({value,onChange,type='text',placeholder}:{value:string;onChange:(v:string)=>void;type?:string;placeholder?:string}){return <input className="input" type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/>}
function Select({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:string[]}){return <select className="input" value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select>}
function SummaryItem({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="flex gap-3"><span className="mt-0.5 text-brand-600">{icon}</span><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 break-words font-semibold text-navy-950">{value}</p></div></div>}
