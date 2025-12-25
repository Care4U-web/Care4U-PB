
import { SymptomCard, Article, ConsultationRecord, SeverityLevel, DurationLevel } from './types';

export const COLORS = {
  primary: '#0D9488', // Care4U Teal Green
  secondary: '#FACC15', // Golden Yellow
  teal: '#0D9488', // HUTECH Teal
  blue: '#0065B3', // HUTECH Blue
  red: '#E30613', // HUTECH Red
  bg: '#F8FAFC',
  dark: '#0F172A',
};

export const SYMPTOMS_DATA: SymptomCard[] = [
  { id: 'fever', title: 'Fever', description: 'Body temp > 37.5°C.', type: 'cold', icon: '🌡️', category: 'general' },
  { id: 'headache', title: 'Headache', description: 'Intense pressure.', type: 'flu', icon: '🧠', category: 'head' },
  { id: 'throat', title: 'Sore Throat', description: 'Painful swallowing.', type: 'cold', icon: '👄', category: 'throat' },
  { id: 'cough', title: 'Dry Cough', description: 'Persistent tickle.', type: 'flu', icon: '🫁', category: 'chest' },
  { id: 'fatigue', title: 'Fatigue', description: 'Feeling very weak.', type: 'flu', icon: '🔋', category: 'general' },
  { id: 'breath', title: 'Breathless', description: 'Difficulty breathing.', type: 'warning', icon: '⚠️', category: 'chest' }
];

export interface DetailedGuidance {
  now: string[];
  avoid: string[];
  meds: string[];
  warnings: string[];
}

export const GUIDANCE_DATA: Record<SeverityLevel, DetailedGuidance> = {
  'mild': {
    now: ['Hydrate: 250ml water every 2 hours', 'Gargle warm salt water', 'Room temp at 24-26°C'],
    avoid: ['Caffeine & Sugary drinks', 'Academic overexertion', 'Cold air conditioning'],
    meds: ['Paracetamol (500mg) - Only if fever > 38°C', 'Vitamin C (1000mg) Daily', 'Herbal lozenges'],
    warnings: ['Fever above 39°C', 'Sore throat preventing swallowing', 'Symptoms > 5 days']
  },
  'moderate': {
    now: ['Bed rest for 24-48 hours', 'Isolate from roommates', 'Monitor temperature every 4h'],
    avoid: ['Driving/Heavy machinery', 'Attending physical classes', 'Smoking/Vaping'],
    meds: ['Ibuprofen (if no allergies)', 'Oral rehydration salts', 'Cough suppressant'],
    warnings: ['Painful breathing', 'Persistent vomiting', 'Signs of dehydration']
  },
  'high': {
    now: ['Contact University Clinic immediately', 'Prepare emergency contact info', 'Minimize physical movement'],
    avoid: ['All forms of activity', 'Self-prescribing antibiotics', 'Waiting for symptoms to pass'],
    meds: ['Only follow advice from a medical professional'],
    warnings: ['Difficulty breathing', 'Chest pressure', 'Confusion/Disorientation', 'Bluish lips']
  }
};

export const CARE_TIMELINE: Record<DurationLevel, { title: string; steps: string[]; warning?: string }> = {
  'short': {
    title: 'Phase 1: Acute Management',
    steps: [
      'Strict rest cycle for 12 hours.',
      'Document symptom progression hourly.',
      'Switch to soft/warm liquid diet.',
    ]
  },
  'medium': {
    title: 'Phase 2: Monitoring & Recovery',
    steps: [
      'Slowly reintroduce nutrition.',
      'Light breathing exercises (4-7-8 method).',
      'Check in with Care4U Chat if no improvement.',
    ]
  },
  'long': {
    title: 'Phase 3: Clinical Intervention',
    steps: [
      'Escalate to in-person clinic visit.',
      'Prepare history log for doctor review.',
      'Consider academic leave if fatigue persists.',
    ],
    warning: 'Chronic symptoms beyond 72h require professional laboratory diagnosis.'
  }
};

export const QUICK_REPLIES = [
  "I'm feeling slightly better",
  "My fever is increasing",
  "Is this medicine safe?",
  "When can I return to class?",
  "Book clinic appointment"
];

export const HEALTH_ARTICLES: Article[] = [
  { 
    id: '1', 
    title: 'The Exam-Sickness Link', 
    category: 'Student Health', 
    readTime: '3m', 
    preview: 'Why stress lowers immunity.', 
    content: 'During exam seasons, cortisol levels spike, suppressing the immune system. This makes students twice as likely to catch seasonal colds.\n\nStrategy: Prioritize 7h sleep even during finals week to maintain white blood cell count.', 
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800', 
    icon: '📚' 
  },
  { 
    id: '2', 
    title: 'HUTECH Sleep Guide', 
    category: 'Wellness', 
    readTime: '5m', 
    preview: 'Rest for recovery.', 
    content: 'Sleep is the primary engine of recovery. When sick, the body requires 8-10 hours of quality rest to repair tissue and fight viral loads.\n\nAvoid: Blue light 1 hour before sleep and heavy caffeine intake.', 
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800', 
    icon: '🛌' 
  },
  { 
    id: '3', 
    title: 'Campus Nutrition', 
    category: 'Lifestyle', 
    readTime: '4m', 
    preview: 'Foods that fight flu.', 
    content: 'University cafeteria tips: Look for ginger-based soups, citrus fruits, and zinc-rich foods like seeds or lean proteins.\n\nHydration is key—aim for 2-3 liters of warm water per day when symptoms are active.', 
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800', 
    icon: '🥗' 
  }
];

export const CONDITION_MAP: Record<string, { type: string; severity: SeverityLevel; advice: string }> = {
  'fever,throat': { type: 'Viral Pharyngitis', severity: 'mild', advice: 'Likely a common cold. Prioritize throat rest and hydration.' },
  'headache,fatigue': { type: 'Academic Fatigue', severity: 'mild', advice: 'Stress-induced fatigue. Immediate rest required.' },
  'cough,fever,fatigue': { type: 'Seasonal Influenza', severity: 'moderate', advice: 'Classic flu pattern. Monitor temp and isolate.' },
  'breath': { type: 'Respiratory Distress', severity: 'high', advice: 'Critical sign. Contact campus emergency medical now.' }
};

export const MOCK_HISTORY: ConsultationRecord[] = [
  {
    id: '1',
    date: new Date(Date.now() - 86400000 * 2),
    summary: 'Reported mild fatigue. Advised rest.',
    symptoms: ['fatigue'],
    severity: 'mild',
    syncStatus: 'synced',
    serverId: 'HX-99281-A'
  }
];
