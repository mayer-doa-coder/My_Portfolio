// Single source of truth for everything that is not a project.
import {
  CIcon, CppIcon, PythonIcon, JavaIcon, TsIcon, JsIcon, PhpIcon, SwiftIcon,
  ReactIcon, NextIcon, AstroIcon, PreactIcon, TailwindIcon, ThreeJsIcon, HtmlIcon, CssIcon,
  NodeIcon, ExpressIcon, LaravelIcon, FastApiIcon, PostgresIcon, MysqlIcon, MongoIcon, OracleIcon, SupabaseIcon, FirebaseIcon,
  GitIcon, GithubIcon, NpmIcon, VercelIcon, NetlifyIcon, FigmaIcon, IllustratorIcon, PhotoshopIcon, CanvaIcon,
} from "../assets/icons";

export const Profile = {
  name: "Tawhidul Hasan",
  role: "CSE Undergraduate · Competitive Programmer · Web & AI Developer",
  location: "Khulna, Bangladesh",
  email: "ttawhid401@gmail.com",
  resume: "/Tawhidul_Hasan_CV.pdf",
  bio: [
    "I am a Computer Science and Engineering undergraduate at Khulna University of Engineering & Technology (KUET), building a strong foundation in algorithms, software engineering, databases, machine learning, web development and system design.",
    "I like working close to the core of systems with C and C++, while building for the web with JavaScript, TypeScript, React, Node.js and Laravel. In parallel I use Python to explore data science and machine learning.",
    "What excites me most is designing scalable systems and clean, intuitive interfaces that solve real problems. Competitive programming keeps my thinking sharp; hackathons are where I ship.",
  ],
};

export const Socials = [
  { label: "GitHub", href: "https://github.com/mayer-doa-coder" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tawhidul-hasan401/" },
  { label: "Instagram", href: "https://www.instagram.com/the_f.e.r.o.c.i.o.u.s" },
  { label: "Facebook", href: "https://www.facebook.com/tawhidul.hasan.792/" },
  { label: "LeetCode", href: "https://leetcode.com/u/mayer_doa_coder/" },
  { label: "CodeChef", href: "https://www.codechef.com/users/mayer_doa" },
  { label: "AtCoder", href: "https://atcoder.jp/users/mayer_doa_coder" },
  { label: "Codeforces", href: "https://codeforces.com/profile/mayer_doa_coder" },
];

export const Stats = [
  { value: "1000+", label: "Problems solved" },
  { value: "1429", label: "Peak Codeforces rating (Specialist)" },
  { value: "3", label: "First-place finishes" },
  { value: "3.72", label: "CGPA at KUET" },
];

// Contest standings. `place` drives the balloon: 1-3 are podium finishes
// (filled balloon), anything else is a finalist entry (outlined balloon).
export type Standing = {
  place: number | null;
  result: string;
  contest: string;
  detail: string;
  kind: "Hackathon" | "Innovation" | "Programming" | "Esports" | "Academic";
};

export const Standings: Standing[] = [
  {
    place: 1,
    result: "Winner",
    contest: "Build With Gemma @Bangladesh",
    detail:
      "National challenge to build an AI application with Gemma (Google's open model) that tackles a real social, educational or environmental problem in Bangladesh.",
    kind: "Hackathon",
  },
  {
    place: 1,
    result: "Winner",
    contest: "HACK Project Showcasing",
    detail:
      "Led the team behind a Smart Helmet: an Arduino system with an alcohol sensor and relay control that won't start the engine unless the rider wears the helmet and is sober.",
    kind: "Innovation",
  },
  {
    place: 1,
    result: "Winner",
    contest: "CYBERTRON 2025",
    detail: "University-level esports tournament.",
    kind: "Esports",
  },
  {
    place: 2,
    result: "Runner-up",
    contest: "Build with Gemma: ML, AI, Deep Learning & NLP Community Hackathon",
    detail:
      "Community hackathon where university students across Bangladesh built AI applications with Gemma.",
    kind: "Hackathon",
  },
  {
    place: 2,
    result: "Runner-up",
    contest: "Bridging Engineering & CS Competition 2025",
    detail:
      "International competition by ILM AI Ltd. and City, St George's, University of London. Built a projectile-motion simulator with and without air resistance.",
    kind: "Innovation",
  },
  {
    place: 3,
    result: "2nd Runner-up",
    contest: "Nascenia AI Hackathon",
    detail:
      "Bengali Medical Dialogue Generation: fine-tuned language models under 3B parameters to answer patients' medical questions in Bengali at a doctor's level.",
    kind: "Hackathon",
  },
  {
    place: null,
    result: "Dean's Award",
    contest: "KUET, 2nd Year",
    detail: "Recognised for outstanding academic performance.",
    kind: "Academic",
  },
  {
    place: null,
    result: "Finalist",
    contest: "AUST IUPC 2025",
    detail: "Inter-university programming contest.",
    kind: "Programming",
  },
  {
    place: null,
    result: "Finalist",
    contest: "KUET IUPC 2025",
    detail: "Inter-university programming contest.",
    kind: "Programming",
  },
  {
    place: null,
    result: "Finalist",
    contest: "NWU IUPC 2025",
    detail: "Inter-university programming contest.",
    kind: "Programming",
  },
  {
    place: null,
    result: "Finalist · 25th",
    contest: "IKPC (Intra-KUET Programming Contest)",
    detail: "Ranked 25th.",
    kind: "Programming",
  },
  {
    place: null,
    result: "Finalist · Top 20",
    contest: "BDApps Agentic AI Hackathon",
    detail: "Top 20 of 500+ competing teams.",
    kind: "Hackathon",
  },
  {
    place: null,
    result: "Finalist",
    contest: "IUT 12th ICT Fest",
    detail: "Innovation showcase.",
    kind: "Innovation",
  },
  {
    place: null,
    result: "Semi-finalist",
    contest: "BitFest 2025",
    detail: "University-level esports tournament.",
    kind: "Esports",
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  period?: string;
  place?: string;
  details?: string[];
};

export const Experience: TimelineItem[] = [
  {
    title: "General Secretary",
    org: "IEEE Computer Society KUET Student Branch Chapter",
    period: "Aug 2026 — Present",
    details: [
      "Keep the chapter running: committee meetings, official correspondence and records.",
      "Coordinate workshops, seminars and tech talks so every event lands on schedule.",
    ],
  },
  {
    title: "Assistant Head of Media & Publication",
    org: "KUET Photographic Society",
    period: "Aug 2026 — Present",
    details: [
      "Shape the society's visual voice across social media and publications.",
      "Curate photo stories and coverage for exhibitions and campus events.",
    ],
  },
  {
    title: "Vice President",
    org: "CYBORG, Cyber Gaming Club of KUET",
    period: "Aug 2026 — Present",
    details: [
      "Help set the club's direction and lead campus-wide esports tournaments.",
      "Oversee events from planning and promotion to match-day operations.",
    ],
  },
  {
    title: "Graphics Manager",
    org: "SGIPC, KUET",
    period: "Aug 2026 — Present",
    details: [
      "Design posters, banners and social graphics for KUET's programming-contest community.",
      "Give contests, training sessions and announcements one consistent look.",
    ],
  },
  {
    title: "Vice President",
    org: "HACK — Hardware Acceleration Club of KUET",
    period: "Aug 2026 — Present",
    details: [
      "Help steer the hardware club and its embedded-systems and robotics workshops.",
      "Guide members from first prototype to competition-ready hardware projects.",
    ],
  },
  {
    title: "Software Engineer",
    org: "Logarithm Studio",
    period: "Mar 2026 — Present",
    details: [
      "Backend development for a software product: building and maintaining API endpoints and core features.",
      "Debugging, testing and deployment with the team to ship reliable, production-ready releases.",
    ],
  },
  {
    title: "Member",
    org: "Organization of KUET Sports (OKS)",
    period: "Mar 2023 — Jan 2024",
    details: ["Planned university events; handled logistics and participants."],
  },
  {
    title: "Content Writer & Editor",
    org: "Goalki",
    period: "Nov 2022 — Present",
    details: [
      "Wrote, edited and published analytical long-form articles.",
      "Kept editorial quality consistent across contributors.",
    ],
  },
  {
    title: "Data Analyst & Content Contributor",
    org: "Fopol Experts",
    period: "Oct 2022 — Present",
    details: [
      "Weekly data-driven reports that turn large statistical datasets into clear recommendations.",
      "Performance-tracking spreadsheets and metric models.",
    ],
  },
  {
    title: "Content Writer & Designer",
    org: "ArenaHype",
    period: "May 2021 — Nov 2022",
    details: [
      "Written and visual content for digital platforms, pairing copywriting with graphic design.",
    ],
  },
  {
    title: "Organizing Secretary",
    org: "Josephite Math Club",
    period: "Oct 2019 — Sep 2022",
    details: ["Coordinated mathematics competitions from scheduling to on-day execution."],
  },
];

export const Education: TimelineItem[] = [
  {
    title: "B.Sc. in Computer Science and Engineering",
    org: "Khulna University of Engineering & Technology (KUET)",
    place: "Fulbarigate, Khulna",
    period: "Jan 2023 — Present",
    details: [
      "CGPA 3.72 / 4.00 · Dean's Award (2nd year)",
      "Data Structures, Algorithms, OOP, Database Systems, Compiler Design, Software Engineering, Numerical Methods, Machine Learning",
    ],
  },
  {
    title: "Higher Secondary Certificate (HSC)",
    org: "Saint Joseph Higher Secondary School",
    place: "Dhaka",
    period: "Jul 2019 — Dec 2021",
    details: ["Science, with emphasis on Mathematics and Physics."],
  },
  {
    title: "Secondary School Certificate (SSC)",
    org: "Mirpur Cantonment Public School & College",
    place: "Mirpur-12, Dhaka",
    period: "2019",
    details: ["Strong academic fundamentals and problem solving."],
  },
];

export type Skill = { name: string; icon: ImageMetadata };

export const Skills: { group: string; items: Skill[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "C", icon: CIcon },
      { name: "C++", icon: CppIcon },
      { name: "Python", icon: PythonIcon },
      { name: "Java", icon: JavaIcon },
      { name: "TypeScript", icon: TsIcon },
      { name: "JavaScript", icon: JsIcon },
      { name: "PHP", icon: PhpIcon },
      { name: "Swift", icon: SwiftIcon },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", icon: ReactIcon },
      { name: "Next.js", icon: NextIcon },
      { name: "Astro", icon: AstroIcon },
      { name: "Preact", icon: PreactIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "Three.js", icon: ThreeJsIcon },
      { name: "HTML", icon: HtmlIcon },
      { name: "CSS", icon: CssIcon },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "Node.js", icon: NodeIcon },
      { name: "Express", icon: ExpressIcon },
      { name: "Laravel", icon: LaravelIcon },
      { name: "FastAPI", icon: FastApiIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
      { name: "MySQL", icon: MysqlIcon },
      { name: "MongoDB", icon: MongoIcon },
      { name: "Oracle", icon: OracleIcon },
      { name: "Supabase", icon: SupabaseIcon },
      { name: "Firebase", icon: FirebaseIcon },
    ],
  },
  {
    group: "Tools & Design",
    items: [
      { name: "Git", icon: GitIcon },
      { name: "GitHub", icon: GithubIcon },
      { name: "npm", icon: NpmIcon },
      { name: "Vercel", icon: VercelIcon },
      { name: "Netlify", icon: NetlifyIcon },
      { name: "Figma", icon: FigmaIcon },
      { name: "Illustrator", icon: IllustratorIcon },
      { name: "Photoshop", icon: PhotoshopIcon },
      { name: "Canva", icon: CanvaIcon },
    ],
  },
];
