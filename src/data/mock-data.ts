export const COLLEGE = "Dhaanish Ahmed College of Engineering, Chennai";

export const colleges = [
  "Dhaanish Ahmed College of Engineering, Chennai",
  "Dhaanish Ahmed Institute of Technology, Coimbatore",
  "Anna University, Chennai",
];

export const roles = ["Student", "Faculty", "Mentor", "Dean", "Admin"] as const;
export type Role = (typeof roles)[number];

export const roleProfiles: Record<
  Role,
  { name: string; title: string; department: string; email: string }
> = {
  Student: {
    name: "Mustaq Ahemad",
    title: "B.E. Computer Science — Final Year",
    department: "Department of Computer Science & Engineering",
    email: "mustaq.ahemad@dhaanish.edu.in",
  },
  Faculty: {
    name: "Dr. Anitha Rajendran",
    title: "Associate Professor, Innovation Cell",
    department: "Department of Computer Science & Engineering",
    email: "anitha.r@dhaanish.edu.in",
  },
  Mentor: {
    name: "Karthik Subramanian",
    title: "Principal Engineer, Zoho — Industry Mentor",
    department: "Industry Mentorship Board",
    email: "karthik.s@mentors.dhaanish.edu.in",
  },
  Dean: {
    name: "Dr. S. Ramanathan",
    title: "Dean of Research & Innovation",
    department: "Office of the Dean",
    email: "dean.research@dhaanish.edu.in",
  },
  Admin: {
    name: "Fathima Nasreen",
    title: "Innovation Ecosystem Administrator",
    department: "Institution's Innovation Council",
    email: "iic.admin@dhaanish.edu.in",
  },
};

export const student = {
  ...roleProfiles.Student,
  rollNumber: "DACE21CS047",
  college: COLLEGE,
  innovationScore: 812,
  scoreDelta: 46,
  rank: 7,
  cohortSize: 420,
  streakDays: 34,
  initials: "MA",
};

export const dashboardStats = [
  { label: "Innovation Score", value: "812", delta: "+46 this month", accent: "gold" as const },
  { label: "Active Projects", value: "3", delta: "1 nearing demo day", accent: "sage" as const },
  { label: "Learning Hours", value: "128", delta: "+9 hrs this week", accent: "dusty" as const },
  { label: "Mentor Sessions", value: "14", delta: "2 upcoming", accent: "gold" as const },
];

export const innovationTracks = [
  { label: "Research & Ideation", value: 86 },
  { label: "Product Building", value: 72 },
  { label: "Entrepreneurship", value: 58 },
  { label: "Community Contribution", value: 64 },
];

export type Project = {
  id: string;
  title: string;
  summary: string;
  status: "In Progress" | "Prototype" | "Review" | "Deployed";
  progress: number;
  stack: string[];
  team: string[];
  repo: string;
  milestones: { label: string; date: string; done: boolean }[];
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "AgriSense — Soil Health Intelligence",
    summary:
      "IoT sensor mesh with an ML model that predicts soil nutrient depletion for smallholder farms around Chennai.",
    status: "In Progress",
    progress: 68,
    stack: ["React", "FastAPI", "TensorFlow", "ESP32"],
    team: ["Mustaq Ahemad", "Sana Parveen", "Dinesh Kumar"],
    repo: "dace-innovation/agrisense",
    milestones: [
      { label: "Field data collection", date: "12 Jun", done: true },
      { label: "Model v2 training", date: "04 Jul", done: true },
      { label: "Dashboard release", date: "22 Aug", done: false },
      { label: "Pilot with 20 farms", date: "15 Sep", done: false },
    ],
  },
  {
    id: "p2",
    title: "CampusFlow — Attendance & Lab Scheduler",
    summary:
      "Face-verified attendance and lab slot scheduling used by three departments in a live campus pilot.",
    status: "Deployed",
    progress: 100,
    stack: ["Next.js", "Node", "PostgreSQL"],
    team: ["Mustaq Ahemad", "Arun Prasath"],
    repo: "dace-innovation/campusflow",
    milestones: [
      { label: "Pilot approval", date: "18 Feb", done: true },
      { label: "CSE rollout", date: "30 Mar", done: true },
      { label: "Campus-wide rollout", date: "26 Jun", done: true },
    ],
  },
  {
    id: "p3",
    title: "Lipi — Tamil Handwriting OCR",
    summary:
      "Transformer-based OCR for archival Tamil manuscripts, built with the college library digitisation team.",
    status: "Prototype",
    progress: 41,
    stack: ["PyTorch", "OpenCV", "Streamlit"],
    team: ["Mustaq Ahemad", "Harini Venkatesh", "Mohammed Irfan"],
    repo: "dace-innovation/lipi-ocr",
    milestones: [
      { label: "Dataset annotation", date: "09 May", done: true },
      { label: "Baseline accuracy 82%", date: "27 Jul", done: false },
      { label: "Paper submission", date: "11 Oct", done: false },
    ],
  },
];

export type Mentor = {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  rating: number;
  sessions: number;
  availability: "Available this week" | "Limited slots" | "Fully booked";
  initials: string;
};

export const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Karthik Subramanian",
    role: "Principal Engineer, Zoho",
    expertise: ["Systems Design", "Backend", "Career"],
    rating: 4.9,
    sessions: 142,
    availability: "Available this week",
    initials: "KS",
  },
  {
    id: "m2",
    name: "Dr. Anitha Rajendran",
    role: "Associate Professor, Innovation Cell",
    expertise: ["Research Writing", "Patents", "ML"],
    rating: 4.8,
    sessions: 96,
    availability: "Limited slots",
    initials: "AR",
  },
  {
    id: "m3",
    name: "Priya Balakrishnan",
    role: "Founder, Kadai Labs",
    expertise: ["Startups", "Fundraising", "GTM"],
    rating: 4.9,
    sessions: 74,
    availability: "Available this week",
    initials: "PB",
  },
  {
    id: "m4",
    name: "Vignesh Manoharan",
    role: "Product Design Lead, Freshworks",
    expertise: ["Product Design", "UX Research"],
    rating: 4.7,
    sessions: 58,
    availability: "Fully booked",
    initials: "VM",
  },
  {
    id: "m5",
    name: "Dr. S. Ramanathan",
    role: "Dean of Research & Innovation",
    expertise: ["Funding", "Grants", "Academia"],
    rating: 5.0,
    sessions: 39,
    availability: "Limited slots",
    initials: "SR",
  },
  {
    id: "m6",
    name: "Nithya Krishnan",
    role: "Senior Data Scientist, Ford India",
    expertise: ["Data Science", "MLOps", "Analytics"],
    rating: 4.8,
    sessions: 87,
    availability: "Available this week",
    initials: "NK",
  },
];

export type Opportunity = {
  id: string;
  title: string;
  provider: string;
  category: "Courses" | "Hackathons" | "Internships" | "Workshops" | "Competitions" | "Project Ideas";
  detail: string;
  deadline: string;
  tag: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "o1",
    title: "Applied Machine Learning Systems",
    provider: "IIT Madras NPTEL",
    category: "Courses",
    detail: "12-week certified course with weekly labs and a capstone deployment.",
    deadline: "Enrol by 12 Aug",
    tag: "Certified",
  },
  {
    id: "o2",
    title: "Smart India Hackathon 2026",
    provider: "Ministry of Education",
    category: "Hackathons",
    detail: "National grand finale. Campus internal round hosted by the Innovation Cell.",
    deadline: "Team entry by 30 Jul",
    tag: "National",
  },
  {
    id: "o3",
    title: "Zoho Summer Engineering Internship",
    provider: "Zoho Corporation, Chennai",
    category: "Internships",
    detail: "10-week paid internship across platform and product engineering teams.",
    deadline: "Apply by 08 Aug",
    tag: "Paid · ₹35k/mo",
  },
  {
    id: "o4",
    title: "Patent Drafting for Student Innovators",
    provider: "IIC Dhaanish Ahmed",
    category: "Workshops",
    detail: "Two-day hands-on workshop with a registered patent attorney.",
    deadline: "Seats close 26 Jul",
    tag: "On campus",
  },
  {
    id: "o5",
    title: "Anna University Design Challenge",
    provider: "Anna University",
    category: "Competitions",
    detail: "Sustainable product design challenge with a ₹2,00,000 prize pool.",
    deadline: "Submit by 19 Sep",
    tag: "₹2L pool",
  },
  {
    id: "o6",
    title: "Low-cost Water Quality Monitor",
    provider: "Innovation DNA Lab",
    category: "Project Ideas",
    detail: "Build a sub-₹2000 turbidity and TDS monitor for Chennai lake restoration groups.",
    deadline: "Open brief",
    tag: "Hardware",
  },
  {
    id: "o7",
    title: "Full-Stack Product Engineering",
    provider: "Freshworks Academy",
    category: "Courses",
    detail: "Industry-designed track covering React, APIs and observability.",
    deadline: "Enrol by 02 Aug",
    tag: "Industry",
  },
  {
    id: "o8",
    title: "Chennai FinTech Buildathon",
    provider: "TiE Chennai",
    category: "Hackathons",
    detail: "36-hour build sprint with incubation fast-track for the top three teams.",
    deadline: "Register by 14 Aug",
    tag: "Incubation",
  },
  {
    id: "o9",
    title: "Research Intern — Robotics Lab",
    provider: "IIT Madras",
    category: "Internships",
    detail: "Summer research internship on manipulation planning with stipend and hostel.",
    deadline: "Apply by 21 Aug",
    tag: "Research",
  },
];

export const startupIdeas = [
  {
    id: "s1",
    name: "AgriSense",
    pitch: "Affordable soil intelligence subscriptions for smallholder farms.",
    stage: "Pilot",
    validation: 78,
    market: "AgriTech · ₹1,400 Cr TAM",
  },
  {
    id: "s2",
    name: "Lipi Archives",
    pitch: "Digitising Tamil manuscripts for libraries, museums and universities.",
    stage: "Prototype",
    validation: 61,
    market: "EdTech · Culture",
  },
  {
    id: "s3",
    name: "SlotWise",
    pitch: "Lab and resource scheduling SaaS for engineering colleges in Tamil Nadu.",
    stage: "Revenue",
    validation: 84,
    market: "Campus SaaS",
  },
];

export const fundingOpportunities = [
  { name: "IIC Prototype Grant", amount: "₹2,00,000", window: "Applications open till 30 Aug" },
  { name: "TANSIM Seed Support", amount: "₹10,00,000", window: "Rolling · Tamil Nadu startups" },
  { name: "NIDHI-EIR Fellowship", amount: "₹30,000/mo", window: "Cohort starts 01 Oct" },
];

export const incubationPrograms = [
  { name: "Dhaanish Ahmed Innovation Studio", duration: "6 months", perks: "Lab, legal, ₹1L credits" },
  { name: "TiE Chennai Nurture", duration: "4 months", perks: "Mentors, demo day, investors" },
  { name: "IITM Nirmaan Pre-incubation", duration: "9 months", perks: "Workspace, prototyping" },
];

export const pitchReadiness = [
  { label: "Problem clarity", value: 92 },
  { label: "Market research", value: 74 },
  { label: "Financial model", value: 48 },
  { label: "Pitch deck", value: 66 },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  category: "Deadlines" | "Hackathons" | "Mentors" | "Learning";
  priority: "High" | "Medium" | "Low";
  time: string;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "SIH 2026 team entry closes in 2 days",
    body: "Your team AgriSense is missing one member confirmation before submission.",
    category: "Deadlines",
    priority: "High",
    time: "18 min ago",
  },
  {
    id: "n2",
    title: "Karthik Subramanian replied to your thread",
    body: "\"Your API layer looks solid — let's review the event queue on Thursday.\"",
    category: "Mentors",
    priority: "Medium",
    time: "2 hours ago",
  },
  {
    id: "n3",
    title: "Chennai FinTech Buildathon registration is live",
    body: "Top three teams get an incubation fast-track at TiE Chennai.",
    category: "Hackathons",
    priority: "Medium",
    time: "Yesterday",
  },
  {
    id: "n4",
    title: "Recommended: Applied Machine Learning Systems",
    body: "Matches your AgriSense model work and the research track you're on.",
    category: "Learning",
    priority: "Low",
    time: "Yesterday",
  },
  {
    id: "n5",
    title: "Patent drafting workshop seats closing",
    body: "Only 8 seats left for the IIC workshop on 26 July.",
    category: "Deadlines",
    priority: "High",
    time: "2 days ago",
  },
  {
    id: "n6",
    title: "Mentor session confirmed",
    body: "Priya Balakrishnan · Fundraising basics · Friday 5:30 PM, Innovation Studio.",
    category: "Mentors",
    priority: "Medium",
    time: "3 days ago",
  },
];

export const upcomingSessions = [
  { mentor: "Karthik Subramanian", topic: "Scaling the AgriSense backend", when: "Thu · 4:00 PM" },
  { mentor: "Priya Balakrishnan", topic: "Fundraising basics", when: "Fri · 5:30 PM" },
];

export const promptChips = [
  "Build me a 6-month roadmap for AI engineering",
  "How do I validate AgriSense with real farmers?",
  "Which hackathon fits my current skills?",
  "Review my resume for product internships",
];

export const roadmapCards = [
  {
    title: "AI Engineering Roadmap",
    detail: "Foundations → applied ML → MLOps → research publication, mapped over 6 months.",
  },
  {
    title: "Startup Founder Track",
    detail: "Problem discovery, 20 customer interviews, MVP, pilot pricing, incubation apply.",
  },
];

export const careerCards = [
  {
    title: "Product internships in Chennai",
    detail: "Zoho, Freshworks and Kissflow open roles matched to your CSE final-year profile.",
  },
  {
    title: "Research pathway",
    detail: "Convert Lipi OCR into an IEEE submission with Dr. Anitha as co-author.",
  },
];

export const ecosystemPillars = [
  {
    title: "Guided Learning",
    detail: "Curated courses, workshops and skill tracks aligned to your innovation goals.",
  },
  {
    title: "Project Studio",
    detail: "Track builds, milestones, teams and repositories in one calm workspace.",
  },
  {
    title: "Mentor Network",
    detail: "Faculty and industry mentors from Zoho, Freshworks, Ford and IIT Madras.",
  },
  {
    title: "Startup Runway",
    detail: "Idea validation, incubation programs, grants and pitch readiness tracking.",
  },
  {
    title: "Opportunity Radar",
    detail: "Hackathons, internships and competitions surfaced before the deadlines close.",
  },
  {
    title: "AI Guidance",
    detail: "A personal AI mentor that turns ambition into a weekly, achievable plan.",
  },
];

export const trustStats = [
  { value: "4,200+", label: "Students onboarded" },
  { value: "310", label: "Projects in the studio" },
  { value: "86", label: "Mentors on the board" },
  { value: "₹1.8 Cr", label: "Grants & prizes tracked" },
];
