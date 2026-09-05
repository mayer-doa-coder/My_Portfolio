import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  ReactIcon,
  NodeIcon,
  TsIcon,
  NextIcon,
  MysqlIcon,
  MongoIcon,
  GdriveIcon,
  SocketIoIcon,
  RestApiIcon,
  PhpIcon,
  ViteIcon,
  NextAuthIcon,
  ReduxIcon,
  TailwindIcon,
  ZustandIcon,
  AstroIcon,
  NanostoresIcon,
  D3JsIcon,
  ReactQueryIcon,
  EdgeStoreIcon,
  JavaIcon,
  CppIcon,
  PythonIcon,
  LaravelIcon,
  ExpressIcon,
  PostgresIcon,
  FastApiIcon,
  SupabaseIcon,
  ThreeJsIcon,
  CIcon,
  SwiftIcon,
  FirebaseIcon,
} from "../assets/icons";

import {
  cinemaHomepage,
  cinemaIcon,
  parabounceIcon,
  parabounceLogo,
  readifyIcon,
  readifyLogo,
  greenleafBanner,
  greenleafLogo,
  signolightBanner,
  signolightLogo,
  whatsappSummarizerBanner,
  whatsappSummarizerLogo,
  slidecommanderBanner,
  slidecommanderLogo,
  murderInKuetBanner,
  murderInKuetLogo,
  smartCarBanner,
  smartCarLogo,
} from "../assets/images";

type ProjectsListType = {
  Name: string;
  ShortDesc: string;
  Desc: string;
  Logo: ImageMetadata;
  Shot: ImageMetadata;
  Mockup: ImageMetadata;
  Theme: string;
  Status: string;
  Link: string;
  Source: string;
  Demo?: {
    email: string;
    password: string;
  };
  Tech: {
    title: string;
    description: string;
    icon: ImageMetadata;
  }[];
  features: {
    title: string;
    description: string;
  }[];
  hideProject: boolean;
  LogoSize: number;
  LogoBlendMode?: "multiply";
  versions: {
    title: string;
    version: string;
  }[];
}[];

// -- PROJECTS TEMPLATE --
// {
//     Name: "TITLE",
//     ShortDesc: "SHORT_DESCRIPTION",
//     Desc: "DESCRIPTION",
//     Logo: LOGO_URL,
//     Shot: SCREENSHOT_URL,
//     Mockup: MOCKUP_URL,
//     Theme: "PROJECT_THEME_COLOR_HEX",
//     Status: "completed OR development",
//     Link: "PROJECT_URL",
//     Source: "GITHUB_URL",
//     Demo?: {
//         email: "DEMO_EMAIL",
//         password: "DEMO_PASSWORD"
//     },
//     Tech: [TECH_ICONS_URL],
//     features: [{
//         title: "FEATURE_TITLE",
//         description: "FEATURE_DESCRIPTION"
//     }],
//     hideProject: false,
//     LogoSize: 50,
//     versions: [{
//         title: "PREV_PROJECT_TITLE",
//         version: "VERSION_NO"
//     }]
// },

const TechInfo = {
  HTML: {
    title: "HTML",
    description:
      "HyperText Markup Language for creating the structure of web pages.",
    icon: HtmlIcon,
  },
  CSS: {
    title: "CSS",
    description:
      "Cascading Style Sheets for styling the presentation of HTML documents.",
    icon: CssIcon,
  },
  JavaScript: {
    title: "JavaScript",
    description:
      "High-level scripting language for adding interactivity to web pages.",
    icon: JsIcon,
  },
  React: {
    title: "React",
    description:
      "JavaScript library for building user interfaces with reusable components.",
    icon: ReactIcon,
  },
  Node: {
    title: "Node.js",
    description:
      "JavaScript runtime for server-side applications, enabling scalable and event-driven architecture.",
    icon: NodeIcon,
  },
  TypeScript: {
    title: "TypeScript",
    description:
      "A superset of JavaScript adding static typing for building large-scale applications with enhanced maintainability and tooling support.",
    icon: TsIcon,
  },
  Next: {
    title: "Next.js",
    description:
      "A React framework for server-side rendering, static site generation, and routing, offering improved performance and SEO optimization.",
    icon: NextIcon,
  },
  MySQL: {
    title: "MySQL",
    description:
      "Open-source relational database management system for storing and managing structured data.",
    icon: MysqlIcon,
  },
  MongoDB: {
    title: "MongoDB",
    description:
      "NoSQL database offering flexibility and scalability for storing and managing data efficiently.",
    icon: MongoIcon,
  },
  GDrive: {
    title: "Google Drive API",
    description:
      "RESTful API for integrating Google Drive functionalities such as file storage and synchronization into applications.",
    icon: GdriveIcon,
  },
  SocketIO: {
    title: "Socket.IO",
    description:
      "Real-time bidirectional communication library for building interactive web applications.",
    icon: SocketIoIcon,
  },
  RESTAPI: {
    title: "REST API",
    description:
      "Architectural style for designing networked applications with standardized HTTP operations.",
    icon: RestApiIcon,
  },
  PHP: {
    title: "PHP",
    description:
      "Server-side scripting language for building dynamic web applications.",
    icon: PhpIcon,
  },
  Vite: {
    title: "Vite",
    description:
      "Modern build tooling for web development with rapid startup and hot module replacement.",
    icon: ViteIcon,
  },
  NextAuth: {
    title: "NextAuth.js",
    description:
      "Authentication library designed specifically for Next.js applications, providing robust authentication features and seamless integration.",
    icon: NextAuthIcon,
  },
  Redux: {
    title: "Redux",
    description:
      "Predictable state management library for JavaScript applications, enabling developers to write consistent, scalable code with ease.",
    icon: ReduxIcon,
  },
  TailwindCSS: {
    title: "Tailwind CSS",
    description:
      "A utility-first CSS framework providing pre-designed, atomic-level utility classes for rapid UI development with minimal CSS code.",
    icon: TailwindIcon,
  },
  Zustand: {
    title: "Zustand",
    description:
      "Tiny, fast, and scalable state management for React applications, providing a simple and intuitive API.",
    icon: ZustandIcon,
  },
  Astro: {
    title: "Astro",
    description:
      "Frontend framework for streamlined development, integrating seamlessly with popular tools to create fast and modern websites with minimal configuration overhead.",
    icon: AstroIcon,
  },
  NanoStores: {
    title: "NanoStores",
    description:
      "Lightweight state management library for JavaScript applications, designed for simplicity and performance to simplify state management and improve application responsiveness.",
    icon: NanostoresIcon,
  },
  D3: {
    title: "D3.js",
    description:
      "Versatile JavaScript library for data visualization, enabling developers to create dynamic, interactive graphics and charts by binding data to DOM elements.",
    icon: D3JsIcon,
  },
  ReactQuery: {
    title: "React Query",
    description:
      "React library for managing, caching, and synchronizing server state in web applications, providing a powerful and intuitive API for fetching and updating data.",
    icon: ReactQueryIcon,
  },
  EdgeStore: {
    title: "EdgeStore",
    description:
      "EdgeStore is an open-source file storage service, designed for scalability and performance, with efficient updates and minimal API.",
    icon: EdgeStoreIcon,
  },
  Java: {
    title: "Java",
    description:
      "Object-oriented programming language known for its portability, robustness, and extensive ecosystem for building enterprise-grade applications.",
    icon: JavaIcon,
  },
  Cpp: {
    title: "C++",
    description:
      "High-performance programming language offering low-level control and object-oriented features for system programming and complex applications.",
    icon: CppIcon,
  },
  Python: {
    title: "Python",
    description:
      "Versatile, readable programming language widely used for backend development, data science, automation, and machine learning.",
    icon: PythonIcon,
  },
  Laravel: {
    title: "Laravel",
    description:
      "PHP framework for building web applications with elegant syntax, robust features, and MVC architecture.",
    icon: LaravelIcon,
  },
  Express: {
    title: "Express.js",
    description:
      "Minimalist Node.js web framework for building APIs and server-side applications with a simple, flexible routing layer.",
    icon: ExpressIcon,
  },
  Postgres: {
    title: "PostgreSQL",
    description:
      "Advanced open-source relational database known for reliability, extensibility, and standards compliance.",
    icon: PostgresIcon,
  },
  FastAPI: {
    title: "FastAPI",
    description:
      "High-performance Python web framework for building APIs with automatic validation and interactive documentation.",
    icon: FastApiIcon,
  },
  Supabase: {
    title: "Supabase",
    description:
      "Open-source Firebase alternative providing a Postgres database, authentication, and realtime APIs out of the box.",
    icon: SupabaseIcon,
  },
  ThreeJs: {
    title: "Three.js",
    description:
      "JavaScript library for creating and rendering interactive 3D graphics in the browser using WebGL.",
    icon: ThreeJsIcon,
  },
  C: {
    title: "C",
    description:
      "Foundational low-level programming language offering direct memory control, widely used for systems and compiler development.",
    icon: CIcon,
  },
  Swift: {
    title: "Swift",
    description:
      "Apple's modern, type-safe programming language for building native iOS, macOS, and watchOS applications.",
    icon: SwiftIcon,
  },
  Firebase: {
    title: "Firebase",
    description:
      "Google's platform for building mobile and web apps, offering realtime database, auth, and cloud services.",
    icon: FirebaseIcon,
  },
};

// Common Features List
const FeatureList = {
  Responsive: {
    title: "Responsive Design",
    description:
      "Enjoy a seamless experience across devices with a responsive design that adapts to various screen sizes and orientations.",
  },
  SEO: {
    title: "SEO Optimization",
    description:
      "Crafted with SEO best practices, ensuring optimal visibility on search engines. From keyword-rich content to streamlined meta tags and efficient site architecture.",
  },
};

export const ProjectsList: ProjectsListType = [
  {
    Name: "Parabounce",
    ShortDesc:
      "Interactive physics-based 2D projectile motion simulator with real-time visualization. Experiment with velocity, angle, and mass parameters to observe dynamic trajectory changes and understand fundamental physics principles through engaging visual demonstrations.",
    Desc: "Parabounce is an advanced Physics-based 2D projectile motion simulator that provides accurate visualization of real-time motion dynamics. The simulator allows users to experiment with various parameters and observe how changes affect projectile trajectories, making it an excellent educational tool for understanding physics concepts and motion mechanics.",
    Logo: parabounceLogo,
    Shot: parabounceIcon,
    Mockup: parabounceIcon,
    Theme: "#4A90E2",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/ParaBounce-Projectile-Motion-Simulator",
    Source:
      "https://github.com/mayer-doa-coder/ParaBounce-Projectile-Motion-Simulator",
    Tech: [TechInfo.TypeScript, TechInfo.JavaScript, TechInfo.CSS],
    features: [
      {
        title: "Real-Time Simulation",
        description:
          "Visualize projectile motion in real-time with accurate physics calculations and smooth animations.",
      },
      {
        title: "Parameter Customization",
        description:
          "Adjust initial velocity, angle, mass, and other parameters to see how they affect the projectile's path.",
      },
      {
        title: "Interactive Visualization",
        description:
          "Dynamic 2D graphics that clearly illustrate trajectory, velocity vectors, and motion parameters.",
      },
      {
        title: "Physics Accuracy",
        description:
          "Built on solid physics principles to provide accurate simulations of real-world projectile motion.",
      },
      FeatureList.Responsive,
    ],
    hideProject: false,
    LogoSize: 75,
    versions: [],
  },
  {
    Name: "Readify",
    ShortDesc:
      "Feature-rich Android book reading application with comprehensive library management capabilities. Offers intuitive navigation, progress tracking, customizable reading settings, and seamless organization for managing and enjoying your digital book collection on mobile devices.",
    Desc: "Readify is a feature-rich Android book reading application that provides an intuitive and seamless experience for book lovers. With Readify, users can easily organize their digital library, read books comfortably on their mobile devices, and manage their reading progress efficiently. The app focuses on delivering a clean, user-friendly interface that makes reading and book management effortless.",
    Logo: readifyLogo,
    Shot: readifyIcon,
    Mockup: readifyIcon,
    Theme: "#E74C3C",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Readify-Android-App",
    Source: "https://github.com/mayer-doa-coder/Readify-Android-App",
    Tech: [TechInfo.Java],
    features: [
      {
        title: "Book Management",
        description:
          "Organize and manage your digital book collection with ease. Add, remove, and categorize books efficiently.",
      },
      {
        title: "User-Friendly Reading Interface",
        description:
          "Clean and intuitive reading experience optimized for mobile devices with customizable reading settings.",
      },
      {
        title: "Progress Tracking",
        description:
          "Keep track of your reading progress across multiple books and resume where you left off.",
      },
      {
        title: "Android Native",
        description:
          "Built specifically for Android platform ensuring optimal performance and native user experience.",
      },
    ],
    hideProject: false,
    LogoSize: 70,
    versions: [],
  },
  {
    Name: "Cinema Paradiso",
    ShortDesc:
      "A comprehensive movie and television database web application built with Laravel and modern web technologies. Cinema Paradiso provides users with an extensive platform to discover, track, and discuss movies and TV shows while connecting with a community of film enthusiasts.",
    Desc: "Cinema Paradiso is a full-stack film and television discovery platform built with Laravel. It lets users log, rate, and discuss titles while browsing an extensive catalog of movies and shows. The project implements authentication, a relational database schema for titles, ratings, and reviews, search and filtering, and a responsive Blade-templated interface for a smooth browsing experience.",
    Logo: cinemaIcon,
    Shot: cinemaHomepage,
    Mockup: cinemaHomepage,
    Theme: "#27AE60",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Cinema-Paradiso",
    Source: "https://github.com/mayer-doa-coder/Cinema-Paradiso",
    Tech: [
      TechInfo.PHP,
      TechInfo.Laravel,
      TechInfo.MySQL,
      TechInfo.CSS,
      TechInfo.JavaScript,
      TechInfo.HTML,
    ],
    features: [
      {
        title: "Title Discovery",
        description:
          "Browse and search an extensive catalog of movies and TV shows with filtering by genre, rating, and release info.",
      },
      {
        title: "Logging & Rating",
        description:
          "Users can log watched titles, leave ratings, and write reviews to build a personal viewing history.",
      },
      {
        title: "Authentication",
        description:
          "Secure user accounts with Laravel's built-in authentication for personalized logs and discussions.",
      },
      {
        title: "Relational Schema Design",
        description:
          "A well-structured MySQL schema models titles, cast, ratings, and reviews with clean relational integrity.",
      },
      {
        title: "Responsive Blade Interface",
        description:
          "A clean, responsive UI built with Laravel Blade templates for a consistent experience across devices.",
      },
    ],
    hideProject: false,
    LogoSize: 80,
    versions: [],
  },
  {
    Name: "GreenLeaf",
    ShortDesc:
      "Autonomous agentic advisory system for smallholder farmers, pairing a conversational agent that builds a costed season plan with a scheduled monitor agent that re-checks live forecasts and market data to keep plans accurate automatically.",
    Desc: "GreenLeaf is a two-agent agentic advisory system built for smallholder farmers. A conversation agent works with the farmer to build a costed season plan, while a monitor agent runs on a schedule to re-check live weather forecasts and market conditions, adjusting committed plans automatically as conditions change. Every output is grounded in real data sources: a live weather API, a RAG knowledge base, crop disease detection, and market price data, so recommendations stay trustworthy rather than speculative.",
    Logo: greenleafLogo,
    Shot: greenleafBanner,
    Mockup: greenleafBanner,
    Theme: "#5B4FE0",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/KUET_JHINKU_IS_BACK_AgriSense",
    Source: "https://github.com/mayer-doa-coder/KUET_JHINKU_IS_BACK_AgriSense",
    Tech: [TechInfo.Python, TechInfo.FastAPI, TechInfo.Postgres],
    features: [
      {
        title: "Conversational Planning Agent",
        description:
          "Builds a costed, personalized season plan for the farmer through natural conversation.",
      },
      {
        title: "Autonomous Monitor Agent",
        description:
          "Runs on a schedule to re-check live forecasts and market data, adjusting committed plans automatically.",
      },
      {
        title: "Grounded Real-Data Outputs",
        description:
          "Combines a live weather API, a RAG knowledge base, crop disease detection, and market price data for every recommendation.",
      },
      {
        title: "LangGraph Orchestration",
        description:
          "Multi-agent workflows coordinated with LangGraph for reliable, stateful agent behavior.",
      },
    ],
    hideProject: false,
    LogoSize: 180,
    versions: [],
  },
  {
    Name: "SignOLight",
    ShortDesc:
      "AI sign language video player that renders a real-time 3D sign language avatar beside any YouTube video, synced to captions with Bangla-English support.",
    Desc: "SignOLight plays YouTube videos alongside a real-time 3D sign language avatar synced to the video's captions, making video content more accessible to the deaf and hard-of-hearing community. Captions are converted into sign notation and simplified language using Gemma, with support for both Bangla and English content, so the avatar can sign along with a wide range of videos without requiring any pre-processing.",
    Logo: signolightLogo,
    Shot: signolightBanner,
    Mockup: signolightBanner,
    Theme: "#B23FD1",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/SignOLight-v2",
    Source: "https://github.com/mayer-doa-coder/SignOLight-v2",
    Tech: [TechInfo.React, TechInfo.Express, TechInfo.ThreeJs],
    features: [
      {
        title: "Real-Time 3D Avatar",
        description:
          "A Three.js-rendered avatar signs along in sync with video captions as playback progresses.",
      },
      {
        title: "AI Caption Translation",
        description:
          "Uses Gemma to convert captions into sign notation and simplified language automatically.",
      },
      {
        title: "Bangla-English Support",
        description:
          "Works across both Bangla and English captioned content for wider accessibility.",
      },
      {
        title: "Any YouTube Video",
        description:
          "Plays alongside any YouTube video without needing pre-processed or specially prepared content.",
      },
    ],
    hideProject: false,
    LogoSize: 180,
    versions: [],
  },
  {
    Name: "WhatsApp Thread Summarizer",
    ShortDesc:
      "AI productivity platform that summarizes long WhatsApp threads, drafts contextual replies, and composes a daily brief across conversations to cut through messaging overload.",
    Desc: "The WhatsApp Thread Summarizer is an AI-powered productivity application built to solve information overload from messaging platforms. It condenses long WhatsApp threads into concise, readable summaries, drafts contextual replies to speed up responses, and composes a daily brief that pulls the important points across all active conversations, backed by a Supabase database for realtime sync and auth.",
    Logo: whatsappSummarizerLogo,
    Shot: whatsappSummarizerBanner,
    Mockup: whatsappSummarizerBanner,
    Theme: "#E8484F",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/WhatsApp-Thread-Summarizer",
    Source: "https://github.com/mayer-doa-coder/WhatsApp-Thread-Summarizer",
    Tech: [TechInfo.React, TechInfo.TypeScript, TechInfo.Node, TechInfo.Supabase],
    features: [
      {
        title: "Thread Summarization",
        description:
          "Condenses long WhatsApp threads into concise, readable summaries in seconds.",
      },
      {
        title: "AI Reply Drafter",
        description:
          "Suggests contextual replies based on thread content to speed up responses.",
      },
      {
        title: "Daily Brief Composer",
        description:
          "Compiles a daily digest pulling the important points across all active conversations.",
      },
      {
        title: "Supabase Backend",
        description:
          "Realtime data sync and authentication powered by Supabase's Postgres-backed platform.",
      },
    ],
    hideProject: false,
    LogoSize: 180,
    versions: [],
  },
  {
    Name: "SlideCommander",
    ShortDesc:
      "Offline voice and mobile presentation remote that turns any smartphone into a wireless slide controller, with fully offline voice commands and no app required.",
    Desc: "SlideCommander turns any smartphone into a wireless presentation remote with no app or internet connection needed. It adds fully offline voice control supporting multiple spoken commands, including direct slide jumps, using on-device speech recognition powered by Faster-Whisper and low-latency WebSocket communication between the phone and the presenting computer.",
    Logo: slidecommanderLogo,
    Shot: slidecommanderBanner,
    Mockup: slidecommanderBanner,
    Theme: "#5B4FE0",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Slide-Commander",
    Source: "https://github.com/mayer-doa-coder/Slide-Commander",
    Tech: [TechInfo.Python],
    features: [
      {
        title: "Fully Offline Voice Control",
        description:
          "Supports multiple spoken commands, including direct slide jumps, with no internet connection required.",
      },
      {
        title: "WebSocket Communication",
        description:
          "Low-latency phone-to-computer control over a local WebSocket connection.",
      },
      {
        title: "Faster-Whisper Transcription",
        description:
          "On-device speech recognition delivers near-instant command response.",
      },
      {
        title: "No App Required",
        description:
          "Connects straight from the phone's browser, with nothing to install.",
      },
    ],
    hideProject: false,
    LogoSize: 180,
    versions: [],
  },
  {
    Name: "Murder in KUET",
    ShortDesc:
      "Cluedo-inspired AI board game engine supporting Human vs Human, Human vs AI, and AI vs AI modes, with explainable AI opponents built on Minimax, MCTS, Bayesian inference, and A* pathfinding.",
    Desc: "Murder in KUET is a Cluedo-inspired deduction game where players investigate a hidden murder involving multiple suspects, locations, and weapons. It supports Human vs Human, Human vs AI, and AI vs AI modes, with explainable AI opponents built using Minimax, Monte Carlo Tree Search, Bayesian inference, and A* pathfinding, rendered through an interactive Three.js board for an immersive investigation experience.",
    Logo: murderInKuetLogo,
    Shot: murderInKuetBanner,
    Mockup: murderInKuetBanner,
    Theme: "#E8484F",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Murder-in-KUET",
    Source: "https://github.com/mayer-doa-coder/Murder-in-KUET",
    Tech: [TechInfo.Python, TechInfo.ThreeJs, TechInfo.React],
    features: [
      {
        title: "Explainable AI Opponents",
        description:
          "Built using Minimax, Monte Carlo Tree Search, Bayesian inference, and A* pathfinding.",
      },
      {
        title: "Multiple Game Modes",
        description:
          "Play Human vs Human, Human vs AI, or watch AI vs AI matches unfold.",
      },
      {
        title: "Interactive 3D Board",
        description:
          "An immersive investigation space rendered with Three.js for exploring clues and suspects.",
      },
      {
        title: "Logical Deduction Gameplay",
        description:
          "Gather clues, make strategic suggestions, and deduce the correct solution through reasoning.",
      },
    ],
    hideProject: false,
    LogoSize: 180,
    versions: [],
  },
  {
    Name: "Smart Car Parking System",
    ShortDesc:
      "Embedded smart-parking system that detects available vehicle bays in real time and displays live parking capacity through an LCD interface.",
    Desc: "The Smart Car Parking System is an embedded parking-management prototype that uses live sensors to detect vehicle occupancy across individual bays. It tracks available spaces in real time and presents the current capacity through an LCD display, making parking availability immediately visible to drivers and operators.",
    Logo: smartCarLogo,
    Shot: smartCarBanner,
    Mockup: smartCarBanner,
    Theme: "#B23FD1",
    Status: "completed",
    Link: "#",
    Source: "#",
    Tech: [TechInfo.C],
    features: [
      {
        title: "Real-Time Space Detection",
        description:
          "Monitors each parking bay to identify whether a vehicle space is available or occupied.",
      },
      {
        title: "Live Capacity Display",
        description:
          "Shows the number of free parking spaces through an easy-to-read LCD interface.",
      },
      {
        title: "Embedded Sensor Control",
        description:
          "Coordinates sensors and display hardware through an embedded controller for responsive updates.",
      },
      {
        title: "Multi-Bay Monitoring",
        description:
          "Supports monitoring several parking spaces from one central control unit.",
      },
    ],
    hideProject: false,
    LogoSize: 180,
    LogoBlendMode: "multiply",
    versions: [],
  },
];
