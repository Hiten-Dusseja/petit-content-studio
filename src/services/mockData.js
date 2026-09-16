const now = new Date();
const daysAgo = (n) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const domains = [
  { id: 'home-services', label: 'Home Services' },
  { id: 'saas', label: 'SaaS' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'legal', label: 'Legal' },
];

export const tones = [
  { id: 'professional', label: 'Professional' },
  { id: 'conversational', label: 'Conversational' },
  { id: 'technical', label: 'Technical' },
  { id: 'authoritative', label: 'Authoritative' },
];

export const lengths = [
  { id: 'short', label: 'Short (800 words)', words: 800 },
  { id: 'standard', label: 'Standard (1,500 words)', words: 1500 },
  { id: 'long', label: 'Long (2,500 words)', words: 2500 },
];

const articleBody = `
## Why Regular HVAC Maintenance Matters

Regular HVAC maintenance is the cornerstone of a comfortable, efficient home. Just like your car needs oil changes, your heating and cooling system needs professional attention to keep running at peak performance.

### Extend Equipment Lifespan

The average HVAC system lasts 15 to 20 years with proper maintenance. Without it, you could be looking at a replacement in half that time. Annual tune-ups catch small issues before they become expensive problems.

### Lower Energy Bills

A well-maintained system uses up to 30% less energy. Dirty filters, clogged coils, and worn components force your system to work harder, driving up your monthly utility costs.

### Improve Air Quality

Your HVAC system circulates the air your family breathes. Regular maintenance includes cleaning coils, checking humidity levels, and ensuring proper ventilation. This means fewer allergens, less dust, and healthier indoor air.

## Signs Your System Needs Service

Don't wait for a breakdown. Watch for these warning signs:

- **Uneven temperatures** between rooms
- **Strange noises** like rattling, squealing, or grinding
- **Higher than normal** energy bills
- **Frequent cycling** on and off
- **Weak airflow** from vents
- **Unusual odors** when the system runs

## The Petitt Maintenance Advantage

At Petitt Heating & Cooling, our NATE-certified technicians perform thorough inspections covering every component of your system. We check refrigerant levels, electrical connections, thermostat calibration, and airflow. Every service includes a detailed report so you know exactly what condition your system is in.

### What's Included in a Tune-Up

- Complete system inspection and diagnostics
- Filter replacement (if needed)
- Coil cleaning and drainage check
- Electrical component testing
- Lubrication of moving parts
- Thermostat calibration
- Safety control verification
- Performance measurement and report

Schedule your maintenance visit today and enjoy peace of mind knowing your system is ready for the season ahead.
`;

const saasArticleBody = `
## Why Your Team Needs a Unified Collaboration Platform

In today's distributed work environment, teams face a growing challenge: too many tools, too little cohesion. A unified collaboration platform bridges the gap between communication, project management, and document sharing.

### The Cost of Tool Fragmentation

The average knowledge worker switches between 13 apps per day. Each switch costs up to 23 minutes of focus time. Multiply that across your team, and you're losing days of productivity every week.

### Centralized Communication

When messages, files, and tasks live in separate systems, important context gets lost. A unified platform keeps every conversation tied to the work it belongs to, so nothing falls through the cracks.

### Streamlined Workflows

Connect your daily operations in one place. Automate routine tasks, integrate with the tools you already use, and reduce friction across your entire workflow.

## Key Features

- **Real-time messaging** with threaded conversations
- **Project dashboards** with automated status tracking
- **Document collaboration** with version control
- **Integrated calendar** and scheduling
- **Custom workflow automation** without code
- **Enterprise-grade security** and compliance

## Getting Started

Implementation takes less than a day. Our onboarding team works with your IT department to configure integrations, set permissions, and train your team. Most organizations see measurable productivity gains within the first two weeks.

Ready to transform the way your team works? Start your free trial today, no credit card required.
`;

const healthcareArticleBody = `
## Understanding Preventive Care: Your Guide to Staying Healthy

Preventive care is the foundation of long-term health. Regular checkups, screenings, and healthy lifestyle choices can catch potential issues early and help you maintain optimal wellbeing.

### Why Preventive Care Matters

Preventive healthcare focuses on keeping you healthy rather than treating illness after it develops. Routine screenings can detect conditions like high blood pressure, diabetes, and certain cancers in their earliest stages when treatment is most effective.

### Key Preventive Services

- **Annual physical exams** to establish health baselines
- **Blood pressure and cholesterol screenings**
- **Cancer screenings** based on age and risk factors
- **Vaccinations** and immunizations
- **Mental health assessments**

**Important:** This information is for educational purposes. Consult your healthcare provider about what screenings and preventive care are right for you based on your personal medical history and risk factors.

### Building a Healthy Routine

Small daily habits add up to significant health benefits over time. Regular exercise, balanced nutrition, adequate sleep, and stress management are the pillars of preventive health.

Your healthcare provider can help you create a personalized preventive care plan. Schedule your next checkup and take an active role in your health journey.
`;

const legalArticleBody = `
## What to Look for When Choosing Business Entity Structure

Selecting the right legal structure for your business is one of the most important decisions you will make. The structure you choose affects your liability, taxes, and ability to raise capital.

### Sole Proprietorship

The simplest structure, with complete control but personal liability. Suitable for low-risk businesses and solo entrepreneurs testing a concept.

### Limited Liability Company (LLC)

Combines liability protection with operational flexibility. LLCs shield personal assets from business debts while allowing pass-through taxation. This structure is popular among small to medium-sized businesses.

### Corporation (C-Corp or S-Corp)

Corporations offer the strongest liability protection and the ability to issue stock, but come with more regulatory requirements and double taxation for C-Corps.

**Important:** This content provides general information about business structures, not legal advice. Consult with a licensed attorney to determine which structure is appropriate for your specific circumstances.

### Factors to Consider

- **Personal liability exposure** in your industry
- **Tax implications** of each structure
- **Number of owners** and ownership transfer plans
- **Capital raising** requirements
- **Regulatory compliance** burden
- **Future growth** and exit strategy

---

*Disclaimer: This article is for informational purposes only and does not constitute legal advice. Laws vary by jurisdiction. Always consult qualified legal counsel before making business formation decisions.*
`;

function buildSections(body) {
  const lines = body.split('\n').filter(l => l.trim());
  const sections = [];
  let currentSection = null;

  lines.forEach(line => {
    const headingMatch = line.match(/^#{2,3}\s+(.+)/);
    if (headingMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        id: `sec-${sections.length + 1}`,
        heading: headingMatch[1].trim(),
        paragraphs: [],
      };
    } else if (currentSection && line.trim() && !line.startsWith('---') && !line.startsWith('*')) {
      currentSection.paragraphs.push(line.trim());
    } else if (line.startsWith('- **')) {
      if (currentSection) currentSection.paragraphs.push(line.trim());
    }
  });
  if (currentSection) sections.push(currentSection);
  return sections;
}

const homeServiceImages = [
  {
    id: 'img-1',
    url: 'https://petittheatingandcooling.com/wp-content/uploads/2026/01/Home-Solutions-Team-1024x683.jpg',
    alt: 'HVAC technician inspecting equipment',
    type: 'ai-generated',
    section: 'hero',
    status: 'ready',
  },
  {
    id: 'img-2',
    url: 'https://petittheatingandcooling.com/wp-content/uploads/2026/02/edited_DSC07569-1024x707.jpg',
    alt: 'HVAC installation team at work',
    type: 'ai-generated',
    section: 'sec-1',
    status: 'ready',
  },
  {
    id: 'img-3',
    url: 'https://petittheatingandcooling.com/wp-content/uploads/2025/12/plumbing-1.webp',
    alt: 'Plumbing service technician',
    type: 'uploaded',
    section: 'sec-2',
    status: 'ready',
  },
  {
    id: 'img-4',
    url: 'https://petittheatingandcooling.com/wp-content/uploads/2025/12/hero-pettit-image-v2.jpg',
    alt: 'Petitt Heating & Cooling service truck',
    type: 'uploaded',
    section: 'sec-3',
    status: 'ready',
  },
];

export const projects = [
  {
    id: 'proj-1',
    title: 'The Importance of Regular HVAC Maintenance',
    slug: 'importance-regular-hvac-maintenance',
    domain: 'home-services',
    domainLabel: 'Home Services',
    tone: 'conversational',
    length: 'standard',
    status: 'published',
    createdAt: daysAgo(3),
    publishedAt: daysAgo(1),
    wordCount: 1450,
    primaryKeyword: 'HVAC maintenance',
    secondaryKeywords: ['furnace tune-up', 'AC service', 'home comfort'],
    targetAudience: 'Homeowners in Middle Tennessee',
    companyWebsite: 'https://petittheatingandcooling.com',
    metaTitle: 'HVAC Maintenance Guide | Petitt Heating & Cooling',
    metaDescription: 'Learn why regular HVAC maintenance saves money, extends equipment life, and improves home air quality. Trusted by Middle Tennessee homeowners.',
    body: articleBody,
    sections: buildSections(articleBody),
    images: homeServiceImages,
    checklist: { content: true, images: true, seo: true, brand: true, ready: true },
    publishUrl: 'https://petittheatingandcooling.com/blog/hvac-maintenance-guide',
  },
  {
    id: 'proj-2',
    title: 'When to Repair vs Replace Your HVAC System',
    slug: 'repair-vs-replace-hvac-system',
    domain: 'home-services',
    domainLabel: 'Home Services',
    tone: 'professional',
    length: 'standard',
    status: 'published',
    createdAt: daysAgo(7),
    publishedAt: daysAgo(5),
    wordCount: 1580,
    primaryKeyword: 'HVAC repair vs replace',
    secondaryKeywords: ['AC replacement cost', 'furnace repair', 'HVAC decision guide'],
    targetAudience: 'Homeowners',
    companyWebsite: null,
    metaTitle: 'Repair or Replace Your HVAC System? | Petitt Heating & Cooling',
    metaDescription: 'Not sure if you should repair or replace your HVAC system? Our guide covers age, cost, efficiency, and signs it is time for a new system.',
    body: articleBody.replace('## Why Regular HVAC Maintenance Matters', '## Should You Repair or Replace?').replace('## Signs Your System Needs Service', '## Key Decision Factors'),
    sections: buildSections(articleBody.replace('## Why Regular HVAC Maintenance Matters', '## Should You Repair or Replace?').replace('## Signs Your System Needs Service', '## Key Decision Factors')),
    images: [homeServiceImages[0], homeServiceImages[3]],
    checklist: { content: true, images: true, seo: true, brand: true, ready: true },
    publishUrl: 'https://petittheatingandcooling.com/blog/repair-vs-replace-guide',
  },
  {
    id: 'proj-3',
    title: '5 Signs Your Furnace Needs Professional Service',
    slug: 'signs-furnace-needs-service',
    domain: 'home-services',
    domainLabel: 'Home Services',
    tone: 'conversational',
    length: 'short',
    status: 'draft',
    createdAt: daysAgo(1),
    publishedAt: null,
    wordCount: 780,
    primaryKeyword: 'furnace repair signs',
    secondaryKeywords: ['heating issues', 'furnace troubleshooting'],
    targetAudience: 'Homeowners',
    companyWebsite: 'https://petittheatingandcooling.com',
    metaTitle: '5 Signs Your Furnace Needs Service | Petitt Heating & Cooling',
    metaDescription: 'Strange noises, uneven heat, or high bills? Here are 5 signs your furnace needs professional attention before winter arrives.',
    body: articleBody.split('## The Petitt Maintenance Advantage')[0],
    sections: buildSections(articleBody.split('## The Petitt Maintenance Advantage')[0]),
    images: [homeServiceImages[2]],
    checklist: { content: false, images: false, seo: false, brand: false, ready: false },
    publishUrl: null,
  },
  {
    id: 'proj-4',
    title: 'The Hidden Costs of Delaying AC Repairs',
    slug: 'hidden-costs-delaying-ac-repairs',
    domain: 'home-services',
    domainLabel: 'Home Services',
    tone: 'authoritative',
    length: 'long',
    status: 'generating',
    createdAt: daysAgo(0),
    publishedAt: null,
    wordCount: 0,
    primaryKeyword: 'AC repair costs',
    secondaryKeywords: ['emergency AC repair', 'AC replacement', 'energy efficiency'],
    targetAudience: 'Homeowners',
    companyWebsite: null,
    metaTitle: '',
    metaDescription: '',
    body: '',
    sections: [],
    images: [homeServiceImages[0]],
    generationProgress: { step: 'outline', message: 'Generating outline...', progress: 15 },
    checklist: { content: false, images: false, seo: false, brand: false, ready: false },
    publishUrl: null,
  },
  {
    id: 'proj-5',
    title: 'How Smart Thermostats Save You Money',
    slug: 'smart-thermostats-save-money',
    domain: 'home-services',
    domainLabel: 'Home Services',
    tone: 'conversational',
    length: 'short',
    status: 'draft',
    createdAt: daysAgo(2),
    publishedAt: null,
    wordCount: 820,
    primaryKeyword: 'smart thermostat savings',
    secondaryKeywords: ['programmable thermostat', 'energy savings', 'home automation'],
    targetAudience: 'Tech-savvy homeowners',
    companyWebsite: null,
    metaTitle: 'Smart Thermostat Savings Guide',
    metaDescription: 'How much can a smart thermostat really save? We break down the numbers, installation tips, and best models for Middle Tennessee homes.',
    body: articleBody.replace('## Why Regular HVAC Maintenance Matters', '## How Smart Thermostats Reduce Energy Use').replace('## Signs Your System Needs Service', '## Choosing the Right Thermostat'),
    sections: buildSections(articleBody.replace('## Why Regular HVAC Maintenance Matters', '## How Smart Thermostats Reduce Energy Use').replace('## Signs Your System Needs Service', '## Choosing the Right Thermostat')),
    images: [homeServiceImages[1], homeServiceImages[2]],
    checklist: { content: true, images: false, seo: false, brand: false, ready: false },
    publishUrl: null,
  },
  {
    id: 'proj-6',
    title: 'Emergency Plumbing: What to Do Before the Plumber Arrives',
    slug: 'emergency-plumbing-before-plumber-arrives',
    domain: 'home-services',
    domainLabel: 'Home Services',
    tone: 'professional',
    length: 'standard',
    status: 'draft',
    createdAt: daysAgo(5),
    publishedAt: null,
    wordCount: 1420,
    primaryKeyword: 'emergency plumbing',
    secondaryKeywords: ['burst pipe', 'water damage', 'plumber near me'],
    targetAudience: 'Homeowners',
    companyWebsite: 'https://petittheatingandcooling.com',
    metaTitle: 'Emergency Plumbing Guide | What to Do First',
    metaDescription: 'A burst pipe or overflowing toilet requires quick action. Follow this step-by-step guide to minimize damage before your plumber arrives.',
    body: articleBody.replace('## Why Regular HVAC Maintenance Matters', '## Step 1: Shut Off the Water').replace('## Signs Your System Needs Service', '## When to Call an Emergency Plumber'),
    sections: buildSections(articleBody.replace('## Why Regular HVAC Maintenance Matters', '## Step 1: Shut Off the Water').replace('## Signs Your System Needs Service', '## When to Call an Emergency Plumber')),
    images: [homeServiceImages[2]],
    checklist: { content: true, images: true, seo: false, brand: false, ready: false },
    publishUrl: null,
  },
  {
    id: 'proj-7',
    title: 'SaaS Collaboration: A Guide for Remote Teams',
    slug: 'saas-collaboration-remote-teams',
    domain: 'saas',
    domainLabel: 'SaaS',
    tone: 'technical',
    length: 'standard',
    status: 'draft',
    createdAt: daysAgo(4),
    publishedAt: null,
    wordCount: 1520,
    primaryKeyword: 'team collaboration platform',
    secondaryKeywords: ['remote work tools', 'unified communication', 'workflow automation'],
    targetAudience: 'CTOs and IT managers',
    companyWebsite: null,
    metaTitle: 'SaaS Collaboration Guide for Remote Teams',
    metaDescription: 'Reduce tool fragmentation and boost team productivity with a unified collaboration platform. Implementation guide for technical leaders.',
    body: saasArticleBody,
    sections: buildSections(saasArticleBody),
    images: [
      {
        id: 'img-saas-1',
        url: 'https://petittheatingandcooling.com/wp-content/uploads/2026/02/Two-Petitt-techs-talking-by-an-HVAC-unit.jpg',
        alt: 'Team collaboration concept',
        type: 'uploaded',
        section: 'hero',
        status: 'ready',
      },
    ],
    checklist: { content: false, images: false, seo: false, brand: false, ready: false },
    publishUrl: null,
  },
  {
    id: 'proj-8',
    title: 'Understanding Preventive Healthcare Screenings',
    slug: 'understanding-preventive-healthcare-screenings',
    domain: 'healthcare',
    domainLabel: 'Healthcare',
    tone: 'professional',
    length: 'short',
    status: 'published',
    createdAt: daysAgo(10),
    publishedAt: daysAgo(8),
    wordCount: 810,
    primaryKeyword: 'preventive healthcare',
    secondaryKeywords: ['health screenings', 'annual checkup', 'wellness exam'],
    targetAudience: 'Adults aged 40-65',
    companyWebsite: null,
    metaTitle: 'Preventive Healthcare Screenings Guide',
    metaDescription: 'Understand which preventive health screenings you need based on your age and risk factors. Educational guide for proactive health management.',
    body: healthcareArticleBody,
    sections: buildSections(healthcareArticleBody),
    images: [],
    checklist: { content: true, images: true, seo: true, brand: true, ready: true },
    publishUrl: 'https://examplehealthblog.com/preventive-screenings',
  },
];

let nextProjectId = 9;
let nextImageId = 20;

export function createProject(data) {
  const id = `proj-${nextProjectId++}`;
  const project = {
    id,
    title: data.title || 'Untitled Article',
    slug: (data.title || 'untitled-article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    domain: data.domain || 'home-services',
    domainLabel: domains.find(d => d.id === data.domain)?.label || 'Home Services',
    tone: data.tone || 'professional',
    length: data.length || 'standard',
    status: 'generating',
    createdAt: new Date().toISOString(),
    publishedAt: null,
    wordCount: 0,
    primaryKeyword: data.primaryKeyword || '',
    secondaryKeywords: data.secondaryKeywords || [],
    targetAudience: data.targetAudience || '',
    companyWebsite: data.companyWebsite || '',
    metaTitle: '',
    metaDescription: '',
    body: '',
    sections: [],
    images: [...(data.images || [])],
    generationProgress: { step: 'outline', message: 'Generating outline...', progress: 5 },
    checklist: { content: false, images: false, seo: false, brand: false, ready: false },
    publishUrl: null,
  };
  projects.unshift(project);
  return project;
}

export function updateProject(id, updates) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...updates };
  return projects[idx];
}

export function regenerateSection(projectId, sectionId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  return { message: `Section regenerated successfully.`, sectionId };
}

export function addImage(projectId, imageData) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  const img = {
    id: `img-${nextImageId++}`,
    ...imageData,
    status: 'ready',
  };
  project.images.push(img);
  return img;
}

export function regenerateImage(projectId, imageId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  const img = project.images.find(i => i.id === imageId);
  if (!img) return null;
  return { message: `Image regenerated successfully.`, imageId };
}

export function publishProject(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  project.status = 'published';
  project.publishedAt = new Date().toISOString();
  project.publishUrl = `https://${project.domain === 'home-services' ? 'petittheatingandcooling.com' : 'example.com'}/blog/${project.slug}`;
  return project;
}

export function getProject(id) {
  return projects.find(p => p.id === id) || null;
}