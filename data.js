/* Content for the portfolio. Everything the page prints lives here; script.js
   renders it into the Broadsheet markup in index.html. */

const profileData = {
  name: 'Vikash Pathak',
  role: 'AI / ML Engineer',
  location: 'Patna, India',
  edition: 'Edition 2026',
  available: true,
  email: 'pathakvikash821@gmail.com',
  phone: '+91 82105 04367',
  resume: 'uploads/resume.pdf',
  photo: 'uploads/photo.png',
  // closes the page, beside the name and the place
  updated: 'Updated July 2026',
  // The landing headline, one line per printed line.
  headline: [
    'AI engineer building',
    'LLM applications, RAG',
    'pipelines and agents.',
  ],
  lede:
    'Backend on the GenAI team at ChainBrain — bring-your-own-LLM, agent authorization, shared sessions. Before that, RLHF and synthetic-data pipelines at a stealth research startup, and the frontend of a cloud notebook IDE at Nimblebox.ai. I like the unglamorous half of AI work: evaluation, guardrails, and the pipes.',
  dateline: ['Patna, India', 'AI / ML Engineer', 'Python · LangGraph · FastAPI'],
};

const linksData = [
  { title: 'GitHub', url: 'https://github.com/pathakvikash' },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vikash-pathak-298a01183/',
  },
  { title: 'LeetCode', url: 'https://leetcode.com/pathakvikash821/' },
];

/* The running order: the contents rail on the front page, the numbered kicker
   over each section, and the nav. Numbering is derived from this list, so
   adding a section can never leave the page mis-numbered. `nav` marks the
   sections that also earn a link in the header bar. */
const sectionsData = [
  { id: 'about', label: 'The short version' },
  { id: 'work', label: 'Selected work', nav: 'Work' },
  { id: 'experience', label: 'Experience', nav: 'Experience' },
  { id: 'stack', label: 'Stack', nav: 'Stack' },
  { id: 'notes', label: 'Notes', nav: 'Notes' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Get in touch', nav: 'Contact' },
];

const aboutData = {
  heading: 'Four years of shipping, two of them inside model behaviour.',
  paragraphs: [
    'I started in product engineering — React, Next.js, MERN — and moved toward the model layer when it became obvious that the hard part of an LLM feature is never the prompt. At a stealth research startup I spent a year on RLHF pipelines, synthetic preference data and reward modelling; the work taught me to treat evaluation as the deliverable rather than an afterthought.',
    'Today I write Python and TypeScript against agent frameworks, vector stores and FastAPI, ship them in Docker through GitHub Actions, and am deliberately working my way into Kubernetes, Terraform and observability so the systems I build can be run by someone other than me.',
    'Full-stack by history, AI engineer by choice.',
  ],
};

/* Flagship work — printed with the plate numeral, two columns of copy. */
const workData = [
  {
    title: 'Doc Summarizer',
    repo: 'https://github.com/pathakvikash/supa_rag_chat',
    subtitle: 'Retrieval-augmented Q&A over your own documents',
    body: [
      "A chat interface that answers questions against uploaded documents instead of the model's memory. Chunking and embedding on ingest, semantic retrieval at query time, and answers that carry the passages they came from — so a wrong answer is traceable to a bad chunk rather than a mystery.",
      'The retrieval layer is the product: chunk size, overlap and top-k were tuned against a held-out question set rather than by feel, and the prompt refuses when retrieval comes back thin.',
    ],
    tags: [
      { label: 'Python' },
      { label: 'FastAPI' },
      { label: 'Embeddings' },
      { label: 'Vector DB' },
      { label: 'RAG', tone: 'accent' },
    ],
  },
  {
    title: 'Text-to-SQL Agent',
    repo: 'https://github.com/pathakvikash/Ask_SQLGEN',
    subtitle: 'A modular pipeline that writes queries it is allowed to run',
    body: [
      'A CLI agent that turns a plain-English question into a SQLite query, runs it, and summarises the result. The interesting part is everything between generation and execution: schema redaction so the model never sees columns it shouldn’t, an allowlist validator, and an automatic LIMIT on every query.',
      'Built as swappable stages — planner, generator, validator, executor, summariser — so a stage can be replaced or unit-tested without touching the rest. Failures are contained to the stage that caused them.',
    ],
    tags: [
      { label: 'Python' },
      { label: 'SQLite' },
      { label: 'Function calling' },
      { label: 'Guardrails', tone: 'accent-2' },
    ],
  },
  {
    title: 'Outreachr',
    repo: 'https://github.com/pathakvikash/outreachr',
    subtitle: 'Multi-agent recruiter outreach, written by the thing that found them',
    body: [
      'A CrewAI workflow that researches relevant recruiters, gathers the context worth mentioning, and drafts a message per person. One agent finds, one agent reads, one agent writes — each with its own tools and a narrow brief.',
      'A practical study in where multi-agent helps and where it just adds latency: the research split earned its keep, an early "critic" agent did not, and got cut.',
    ],
    tags: [
      { label: 'CrewAI' },
      { label: 'Agents' },
      { label: 'Tool use' },
    ],
  },
];

/* Shipped product work — a compact index. The AI tooling leads; `link` is
   optional, since not everything worth showing is deployed. */
const projectsData = [
  {
    title: 'LLM-OS',
    description:
      'An AI workspace in the browser: local Ollama models, web search across providers, and chat that can read the files you give it.',
    link: 'https://llm-os.vercel.app',
    gitrepo: 'https://github.com/pathakvikash/LLM-OS',
  },
  {
    title: 'AI Agent Playground',
    description:
      'A monorepo of agent prototypes on local LLMs — document Q&A, reflective reasoning, file handling — each one a different pattern.',
    gitrepo: 'https://github.com/pathakvikash/ai-agent-playground',
  },
  {
    title: 'Prompt Manager',
    description:
      'CLI and web tool for writing, tagging and searching prompts, so a good one can be found again and reused as a template.',
    link: 'https://prompt-manager-umber.vercel.app',
    gitrepo: 'https://github.com/pathakvikash/prompt_manager',
  },
  {
    title: 'Dev Chat',
    description: 'A chat UI for talking to local and hosted LLMs.',
    link: 'https://dev-chat-beta.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/DevChat',
  },
  {
    title: 'A-Zone',
    description: 'Full-stack shopping service — catalogue, cart and checkout.',
    link: 'https://a-zone.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/AZone',
  },
  {
    title: 'Graphical Authentication',
    description: 'Authentication system driven by a graphical passphrase.',
    link: 'https://gauth-xi.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/gauth',
  },
];

const experiencesData = [
  {
    period: 'May 2026 — Present',
    title: 'Backend Developer, GenAI Team',
    org: 'ChainBrain',
    description: [
      'Built bring-your-own-LLM, letting users plug their own model and provider into agent workflows.',
      'Implemented authorization for agent flows with Ory Keto, adding fine-grained permission checks.',
      'Shipped shareable sessions so a private conversation can be opened by other signed-in users.',
    ],
  },
  {
    period: 'Dec 2024 — Jan 2026',
    title: 'AI Engineer',
    org: 'Stealth startup · Remote',
    description: [
      'Built RLHF pipelines in Python targeting reasoning, function calling and long-term memory.',
      'Designed synthetic data generation across multiple LLMs to produce preference and instruction sets.',
      'Worked with the research team on reward modelling and fine-tuning objectives for aligned behaviour.',
      'Built internal tooling for collection, labelling and analysis to shorten experiment cycles.',
    ],
  },
  {
    period: 'Mar 2023 — Aug 2024',
    title: 'Frontend Engineer',
    org: 'Nimblebox.ai · Chennai',
    description: [
      'Led a React-to-Next.js migration that cut page load times 30% and lifted organic traffic 20%.',
      'Built the UI for a cloud IDE and Jupyter environment used daily by ML practitioners.',
      'Built admin-panel APIs and state with Redux Toolkit.',
    ],
  },
  {
    period: 'Mar 2023 — Nov 2023',
    title: 'MERN Stack Engineer',
    org: 'The Tan Man Gaadi · Remote',
    description: [
      'Built a full-stack commerce platform and tuned backend logic and queries for transaction throughput.',
      'Designed and integrated authentication, cutting login-related issues by 40%.',
    ],
  },
];

const skillsData = [
  {
    title: 'AI / ML',
    description:
      'Prompt engineering · RAG · fine-tuning & evaluation · RLHF · AI agents · function calling · synthetic data generation · NLP',
  },
  {
    title: 'Languages',
    description: 'Python · JavaScript / TypeScript · Java · SQL · Solidity',
  },
  {
    title: 'Agent frameworks',
    description: 'LangChain · LangGraph · CrewAI · Agno · AutoGen',
  },
  {
    title: 'Infrastructure',
    description: 'Docker · Git · GitHub Actions · Vercel · FastAPI · REST APIs',
  },
  {
    title: 'Data',
    description: 'PostgreSQL · MongoDB · MySQL · Pinecone · FAISS',
  },
  {
    title: 'Learning now',
    tone: 'accent-2',
    description:
      'Kubernetes · Terraform · AWS / Azure / GCP fundamentals · Prometheus & Grafana',
  },
  {
    title: 'Drawn to',
    description: 'AI systems · web · security · blockchain & web3 · finance',
  },
];

/* Written for whoever opens the page — a recruiter, a founder, a PM — not for
   another engineer: a plain title someone can judge in a glance, then two
   sentences. No jargon that needs a glossary. */
const notesData = [
  {
    title: 'Why an AI assistant gives a confidently wrong answer',
    body: 'Usually it is not the model being stupid — it is how the documents were chopped up before it ever read them. Cut a table in half at the wrong place and no amount of clever wording gets the number right again.',
  },
  {
    title: 'An AI is only as good as the examples it was shown',
    body: 'Models learn what a good answer looks like from examples people write by hand. Sloppy instructions to the people writing them turn into odd behaviour in the product months later, so I treat those examples as the real work.',
  },
  {
    title: 'More AI agents is not automatically better',
    body: 'Splitting a job between several AI agents can make the result sharper — and also slower, pricier and harder to fix when it breaks. I keep the splits that earn their keep and cut the ones that only add waiting.',
  },
];

const educationData = [
  {
    degree: 'B.Tech, Information Science and Technology',
    name: 'Rungta College of Engineering and Technology',
    link: 'https://rcet.rungta.ac.in/',
    date: '2020–2024',
    score: '75%',
  },
  {
    degree: 'Software Engineering Development',
    name: 'BossCoder Academy',
    date: '2023–2024',
  },
  {
    degree: 'Senior Secondary, Science & Mathematics',
    name: 'A.N. College, Patna',
    date: '2017–2019',
    score: '71%',
  },
];

const certificationsData = [
  {
    title: 'Introduction to Generative AI',
    org: 'Google Cloud Skills Boost',
    url: 'https://www.cloudskillsboost.google/course_templates/536',
  },
  {
    title: 'IBM Data Science',
    org: 'IBM',
    url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
  },
  {
    title: 'Python for Data Science',
    org: 'Dataquest',
    url: 'https://www.dataquest.io/path/data-scientist-python/',
  },
  {
    title: 'Data Analytics Job Simulation',
    org: 'Deloitte Australia (Forage)',
    url: 'https://www.theforage.com/simulations/deloitte-au/data-analytics-s5zy',
  },
];

const courseworkData = [
  {
    title: 'Undergraduate',
    courses: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Software Design & Engineering',
      'Object Oriented Programming',
      'Linux Programming',
    ],
  },
  {
    title: 'Activities',
    courses: [
      'Team lead — Smart India Hackathon, 2022',
      'Tech lead — Enigma Tezos Club, 2023',
    ],
  },
];

const AboutMe = [
  { name: profileData.name, title: profileData.role },
  {
    about: aboutData,
    work: workData,
    projects: projectsData,
    experiences: experiencesData,
    skills: skillsData,
    education: educationData,
    certifications: certificationsData,
    courses: courseworkData,
    links: linksData,
  },
];

export {
  profileData,
  sectionsData,
  aboutData,
  workData,
  projectsData,
  experiencesData,
  skillsData,
  notesData,
  educationData,
  certificationsData,
  courseworkData,
  linksData,
  AboutMe,
};
