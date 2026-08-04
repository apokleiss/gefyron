export type Offer = {
  id: string
  installer: string
  initials: string
  badge: string
  highlight: string
  totalCost: number
  costPerKwp: number
  systemSize: number
  panels: string
  inverter: string
  annualGeneration: number
  selfConsumption: string
  battery: string
  duration: string
  panelWarranty: string
  inverterWarranty: string
  installationWarranty: string
  maintenance: string
  monitoring: string
  financing: string
  validity: string
  rating: number
  completedProjects: number
  score: number
  strengths: string[]
  risks: string[]
}

export const sampleProject = {
  business: 'Attica Cold Storage S.A.',
  type: 'Refrigerated warehouse',
  location: 'Aspropyrgos, Attica',
  annualConsumption: '420,000 kWh',
  operatingHours: 'Monday–Saturday, 06:00–22:00',
  roofArea: '1,600 m²',
  objective: 'Reduce daytime electricity costs',
  systemRange: '220–280 kWp',
  generationRange: '330,000–420,000 kWh',
  selfConsumptionRange: '70%–85%',
  investmentRange: '€215,000–€305,000',
  paybackRange: '4.8–7.2 years',
  carbonRange: '145–185 tCO₂/year',
}

export const offers: Offer[] = [
  {
    id: 'helio',
    installer: 'HelioWorks Energy',
    initials: 'HW',
    badge: 'Best Overall Value',
    highlight: 'Balanced cost, strong warranties and proven commercial delivery.',
    totalCost: 254800,
    costPerKwp: 980,
    systemSize: 260,
    panels: 'Longi Hi-MO 7 · 580 W',
    inverter: 'Sungrow SG125CX-P2 × 2',
    annualGeneration: 388000,
    selfConsumption: '79%',
    battery: 'Optional 100 kWh',
    duration: '12–14 weeks',
    panelWarranty: '15 yr product / 30 yr performance',
    inverterWarranty: '10 years',
    installationWarranty: '5 years',
    maintenance: '2 years included',
    monitoring: 'Included',
    financing: 'Partner financing',
    validity: '45 days',
    rating: 4.8,
    completedProjects: 118,
    score: 92,
    strengths: ['Strong total-value score', 'Detailed production assumptions', 'Fast fault-response commitment'],
    risks: ['Battery price excluded from base total'],
  },
  {
    id: 'aegean',
    installer: 'Aegean Solar Projects',
    initials: 'AS',
    badge: 'Lowest Initial Investment',
    highlight: 'Lowest upfront cost with a slightly smaller system and shorter warranty package.',
    totalCost: 225600,
    costPerKwp: 940,
    systemSize: 240,
    panels: 'JA Solar DeepBlue 4.0 · 565 W',
    inverter: 'Huawei SUN2000-100KTL × 2',
    annualGeneration: 356000,
    selfConsumption: '82%',
    battery: 'Not included',
    duration: '10–12 weeks',
    panelWarranty: '12 yr product / 30 yr performance',
    inverterWarranty: '5 years',
    installationWarranty: '3 years',
    maintenance: 'Optional',
    monitoring: 'Included',
    financing: 'Not offered',
    validity: '30 days',
    rating: 4.5,
    completedProjects: 76,
    score: 83,
    strengths: ['Lowest initial investment', 'Lowest cost per installed kWp', 'Fastest indicative schedule'],
    risks: ['Shorter inverter warranty', 'No maintenance included', 'Lower annual generation'],
  },
  {
    id: 'solstice',
    installer: 'Solstice Engineering',
    initials: 'SE',
    badge: 'Strongest Warranty',
    highlight: 'Premium equipment and warranty coverage, but at the highest total cost.',
    totalCost: 289500,
    costPerKwp: 1034,
    systemSize: 280,
    panels: 'REC Alpha Pure-RX · 470 W',
    inverter: 'SMA Sunny Highpower PEAK3 × 3',
    annualGeneration: 416000,
    selfConsumption: '75%',
    battery: '150 kWh option',
    duration: '15–17 weeks',
    panelWarranty: '25 yr product / 25 yr performance',
    inverterWarranty: '15 years',
    installationWarranty: '10 years',
    maintenance: '5 years included',
    monitoring: 'Advanced monitoring included',
    financing: 'Green lease option',
    validity: '60 days',
    rating: 4.9,
    completedProjects: 64,
    score: 89,
    strengths: ['Best equipment package', 'Longest installation warranty', 'Comprehensive maintenance coverage'],
    risks: ['Highest investment', 'Longest delivery period', 'Lowest self-consumption estimate'],
  },
]

export const comparisonRows = [
  ['Total cost', (o: Offer) => `€${o.totalCost.toLocaleString()}`],
  ['Cost per installed kWp', (o: Offer) => `€${o.costPerKwp.toLocaleString()}`],
  ['System size', (o: Offer) => `${o.systemSize} kWp`],
  ['Panels', (o: Offer) => o.panels],
  ['Inverters', (o: Offer) => o.inverter],
  ['Estimated annual generation', (o: Offer) => `${o.annualGeneration.toLocaleString()} kWh`],
  ['Estimated self-consumption', (o: Offer) => o.selfConsumption],
  ['Battery', (o: Offer) => o.battery],
  ['Project duration', (o: Offer) => o.duration],
  ['Panel warranty', (o: Offer) => o.panelWarranty],
  ['Inverter warranty', (o: Offer) => o.inverterWarranty],
  ['Installation warranty', (o: Offer) => o.installationWarranty],
  ['Maintenance', (o: Offer) => o.maintenance],
  ['Monitoring', (o: Offer) => o.monitoring],
  ['Financing', (o: Offer) => o.financing],
  ['Proposal validity', (o: Offer) => o.validity],
  ['Installer rating', (o: Offer) => `${o.rating} / 5`],
  ['Completed projects', (o: Offer) => o.completedProjects.toString()],
] as const
