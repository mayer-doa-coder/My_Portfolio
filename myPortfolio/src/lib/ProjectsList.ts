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
  movieLogo,
  numericalIcon,
  numericalLogo,
  oopIcon,
  parabounceIcon,
  parabounceLogo,
  policeIcon,
  readifyIcon,
  readifyLogo,
  agrisenseBanner,
  agrisenseLogo,
  signolightBanner,
  signolightLogo,
  whatsappSummarizerBanner,
  whatsappSummarizerLogo,
  slidecommanderBanner,
  slidecommanderLogo,
  hisabBanner,
  hisabLogo,
  murderInKuetBanner,
  murderInKuetLogo,
  arcaneBanner,
  arcaneLogo,
  smartHelmetBanner,
  smartHelmetLogo,
  edumatchBanner,
  edumatchLogo,
  wildBeyondBanner,
  wildBeyondLogo,
  meowtropolisBanner,
  meowtropolisLogo,
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
    Name: "Police Department Management System",
    ShortDesc:
      "Comprehensive console-based police management system developed using object-oriented C++ principles. Features efficient record handling, case management, personnel tracking, and administrative operations with robust data validation and integrity controls.",
    Desc: "The Police Department Management System is a comprehensive console-based application developed using object-oriented programming principles. This system provides efficient tools for managing police department records, operations, and administrative tasks. Built with a focus on data integrity and operational efficiency, it demonstrates strong OOP concepts including encapsulation, inheritance, and polymorphism while handling complex departmental workflows.",
    Logo: policeIcon,
    Shot: oopIcon,
    Mockup: oopIcon,
    Theme: "#2C3E50",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/OOP-Project",
    Source: "https://github.com/mayer-doa-coder/OOP-Project",
    Tech: [TechInfo.Cpp],
    features: [
      {
        title: "Record Management",
        description:
          "Efficiently manage police officer records, case files, and departmental data with structured data handling.",
      },
      {
        title: "Object-Oriented Design",
        description:
          "Built using OOP principles including classes, inheritance, encapsulation, and polymorphism for maintainable code.",
      },
      {
        title: "Console Interface",
        description:
          "Terminal-based user interface providing straightforward access to all system functions and operations.",
      },
      {
        title: "Operational Efficiency",
        description:
          "Streamlined workflows for handling routine police department operations and administrative tasks.",
      },
      {
        title: "Data Integrity",
        description:
          "Robust data validation and error handling to ensure accurate and reliable record keeping.",
      },
    ],
    hideProject: false,
    LogoSize: 65,
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
    Name: "Numerical Method Project",
    ShortDesc:
      "Advanced numerical computation project implementing multiple mathematical algorithms in C++. Includes Newton-Raphson, Simpson's rule, Runge-Kutta methods, and more. Emphasizes computational precision, algorithmic optimization, and efficient solving of complex analytical problems.",
    Desc: "The Numerical Method Project showcases the application of advanced numerical techniques to solve complex mathematical problems that are difficult or impossible to solve analytically. This project demonstrates proficiency in implementing numerical algorithms with a strong focus on computational accuracy, algorithmic efficiency, and optimization. It covers various numerical methods including root finding, integration, differentiation, and solving differential equations.",
    Logo: numericalLogo,
    Shot: numericalIcon,
    Mockup: numericalIcon,
    Theme: "#27AE60",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Numerical-Method-Project",
    Source: "https://github.com/mayer-doa-coder/Numerical-Method-Project",
    Tech: [TechInfo.Cpp],
    features: [
      {
        title: "Multiple Numerical Methods",
        description:
          "Implementation of various numerical techniques including Newton-Raphson, Simpson's rule, Runge-Kutta, and more.",
      },
      {
        title: "Computational Accuracy",
        description:
          "Precision-focused algorithms that minimize numerical errors and provide reliable results for complex calculations.",
      },
      {
        title: "Algorithmic Efficiency",
        description:
          "Optimized implementations that balance accuracy with computational performance for practical applications.",
      },
      {
        title: "Complex Problem Solving",
        description:
          "Tackle mathematically challenging problems that require numerical approximation rather than analytical solutions.",
      },
      {
        title: "Educational Tool",
        description:
          "Well-documented code and examples that serve as learning resources for understanding numerical methods.",
      },
    ],
    hideProject: false,
    LogoSize: 50,
    versions: [],
  },
  {
    Name: "Movie Database Management",
    ShortDesc:"A movie database management system with real-time SQL query monitoring. Built with PHP, MySQL, and JavaScript. Implements all SQL operation coverage including advanced concepts, views, set operations, and complex queries. Features an intuitive web interface for seamless interaction and monitoring.",
    Desc: "Movie Database Management is a PHP and MySQL application built to explore the full breadth of SQL through a real interface. It covers joins, subqueries, views, set operations, and aggregate queries, with a real-time monitor that displays the exact SQL statements running behind each user action, making the database layer transparent rather than hidden.",
    Logo: movieLogo,
    Shot: movieLogo,
    Mockup: movieLogo,
    Theme: "#27AE60",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Movie-Database",
    Source: "https://github.com/mayer-doa-coder/Movie-Database",
    Tech: [TechInfo.PHP, TechInfo.MySQL, TechInfo.JavaScript, TechInfo.HTML, TechInfo.CSS],
    features: [
      {
        title: "Full SQL Coverage",
        description:
          "Demonstrates joins, subqueries, views, set operations, and aggregate queries across a real movie dataset.",
      },
      {
        title: "Real-Time Query Monitoring",
        description:
          "Displays the live SQL statements executed behind each interaction, exposing the database layer for learning and debugging.",
      },
      {
        title: "Intuitive Web Interface",
        description:
          "A clean PHP-driven interface for browsing and managing movie records without needing direct database access.",
      },
      {
        title: "Advanced Concepts",
        description:
          "Covers advanced relational database concepts beyond basic CRUD, built for demonstrating deeper SQL proficiency.",
      },
    ],
    hideProject: false,
    LogoSize: 50,
    versions: [],
  },
  {
    Name: "AgriSense AI",
    ShortDesc:
      "Autonomous agentic advisory system for smallholder farmers, pairing a conversational agent that builds a costed season plan with a scheduled monitor agent that re-checks live forecasts and market data to keep plans accurate automatically.",
    Desc: "AgriSense AI is a two-agent agentic advisory system built for smallholder farmers. A conversation agent works with the farmer to build a costed season plan, while a monitor agent runs on a schedule to re-check live weather forecasts and market conditions, adjusting committed plans automatically as conditions change. Every output is grounded in real data sources: a live weather API, a RAG knowledge base, crop disease detection, and market price data, so recommendations stay trustworthy rather than speculative.",
    Logo: agrisenseLogo,
    Shot: agrisenseBanner,
    Mockup: agrisenseBanner,
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
    LogoSize: 64,
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
    LogoSize: 64,
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
    LogoSize: 64,
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
    LogoSize: 64,
    versions: [],
  },
  {
    Name: "Hisab",
    ShortDesc:
      "Mobile-first smart retail assistant for small general stores in Bangladesh, digitizing inventory, sales, and customer credit (baki) tracking with Bengali voice input.",
    Desc: "Hisab is a mobile-first smart retail assistant designed for small দোকান (general stores) in Bangladesh. It helps shop owners digitize daily operations such as inventory management and customer credit (baki) tracking through a simple, familiar interface, with Bengali voice input, offline synchronization, and AI-generated business insights built for low-connectivity environments.",
    Logo: hisabLogo,
    Shot: hisabBanner,
    Mockup: hisabBanner,
    Theme: "#B23FD1",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Hisab",
    Source: "https://github.com/mayer-doa-coder/Hisab",
    Tech: [TechInfo.JavaScript, TechInfo.Firebase],
    features: [
      {
        title: "Inventory & Sales Tracking",
        description:
          "Digitizes day-to-day retail operations for small general stores in a few taps.",
      },
      {
        title: "Customer Credit (Baki) Ledger",
        description:
          "Tracks customer credit balances in a simple, familiar format shop owners already understand.",
      },
      {
        title: "Bengali Voice Input",
        description:
          "Enables hands-free data entry in Bengali for faster day-to-day use.",
      },
      {
        title: "Offline Synchronization",
        description:
          "Works reliably in low-connectivity environments and syncs automatically once back online.",
      },
    ],
    hideProject: false,
    LogoSize: 64,
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
    LogoSize: 64,
    versions: [],
  },
  {
    Name: "Arcane (WizardLang)",
    ShortDesc:
      "A wizard-themed programming language and compiler built with Flex and Bison, covering lexical analysis, tokenization, parsing, and syntax-directed translation.",
    Desc: "Arcane (WizardLang) is a wizard-themed programming language designed and implemented from the ground up, covering lexical analysis, tokenization, parsing, and syntax-directed translation. Built in C using Flex for lexing and Bison for grammar and parsing, the project applies core compiler construction principles end-to-end, from a custom spell-based syntax down to translation logic.",
    Logo: arcaneLogo,
    Shot: arcaneBanner,
    Mockup: arcaneBanner,
    Theme: "#5B4FE0",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Arcane",
    Source: "https://github.com/mayer-doa-coder/Arcane",
    Tech: [TechInfo.C],
    features: [
      {
        title: "Lexical Analysis & Tokenization",
        description:
          "A custom lexer built with Flex tokenizes the wizard-themed spell syntax.",
      },
      {
        title: "Grammar & Parsing",
        description:
          "Syntax analysis and grammar construction implemented with Bison.",
      },
      {
        title: "Syntax-Directed Translation",
        description:
          "Applies core compiler construction principles end-to-end, from parsing to translation.",
      },
      {
        title: "Compiler Fundamentals",
        description:
          "A hands-on implementation of classic compiler design theory, written in C.",
      },
    ],
    hideProject: false,
    LogoSize: 64,
    versions: [],
  },
  {
    Name: "Smart Helmet System",
    ShortDesc:
      "IoT road-safety device pairing an alcohol detection sensor with relay-based engine control, blocking ignition when the rider is unhelmeted or intoxicated. Awarded First Place at the HACK Project Showcasing competition.",
    Desc: "The Smart Helmet System is a team-led embedded IoT device that pairs an alcohol detection sensor with relay-based engine control on an ESP-32. The system blocks the vehicle's ignition if the rider isn't wearing the helmet or if alcohol consumption is detected, enhancing road safety through embedded hardware and real-time sensing. The project was awarded First Place at the HACK Project Showcasing competition.",
    Logo: smartHelmetLogo,
    Shot: smartHelmetBanner,
    Mockup: smartHelmetBanner,
    Theme: "#B23FD1",
    Status: "completed",
    Link: "#",
    Source: "#",
    Tech: [TechInfo.C],
    features: [
      {
        title: "Alcohol Detection",
        description:
          "Sensor-based detection prevents an intoxicated rider from starting the engine.",
      },
      {
        title: "Helmet Detection",
        description:
          "Blocks ignition automatically when the rider isn't wearing a helmet.",
      },
      {
        title: "Relay-Based Engine Control",
        description:
          "A hardware relay gates ignition directly based on live sensor readings.",
      },
      {
        title: "Award-Winning",
        description:
          "Awarded First Place at the HACK Project Showcasing competition.",
      },
    ],
    hideProject: false,
    LogoSize: 64,
    versions: [],
  },
  {
    Name: "EduMatch",
    ShortDesc:
      "AI-driven thesis and internship ecosystem connecting students, supervisors, and alumni with role-based dashboards, AI skill-gap analysis, and milestone tracking.",
    Desc: "EduMatch is an AI-driven thesis and internship ecosystem built to connect students with supervisors, internship opportunities, and alumni mentorship in one place. Role-based dashboards for students, supervisors, alumni, and admins keep everyone focused on what matters, while AI-driven skill-gap analysis highlights where a student's profile falls short of an opportunity's requirements, and built-in messaging and milestone submission keep supervised progress on track.",
    Logo: edumatchLogo,
    Shot: edumatchBanner,
    Mockup: edumatchBanner,
    Theme: "#E8484F",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/EduMatch",
    Source: "https://github.com/mayer-doa-coder/EduMatch",
    Tech: [TechInfo.TypeScript, TechInfo.React, TechInfo.PHP, TechInfo.MySQL],
    features: [
      {
        title: "Role-Based Dashboards",
        description:
          "Dedicated dashboards for students, supervisors, alumni, and admins.",
      },
      {
        title: "Internship & Thesis Matching",
        description:
          "Connects students with supervisors and internship postings suited to their profile.",
      },
      {
        title: "AI Skill-Gap Analysis",
        description:
          "Highlights where a student's skills fall short of an opportunity's requirements.",
      },
      {
        title: "Messaging & Milestones",
        description:
          "In-app messaging and milestone submission keep supervised progress on track.",
      },
    ],
    hideProject: false,
    LogoSize: 64,
    versions: [],
  },
  {
    Name: "Wild Beyond",
    ShortDesc:
      "A platform celebrating wildlife through field blogs and stories, with a curated gear catalog for photographers, observers, and outdoor adventurers, built on a Spring Boot backend.",
    Desc: "Wild Beyond is a space where nature speaks and explorers prepare. It celebrates life beyond our own through wildlife stories and field blogs, alongside a curated catalog of gear for photographers, observers, and outdoor adventurers. The backend is built on Java with Spring Boot and Maven, containerized with Docker, and backed by a documented CI/CD pipeline and Postman-tested REST API.",
    Logo: wildBeyondLogo,
    Shot: wildBeyondBanner,
    Mockup: wildBeyondBanner,
    Theme: "#5B4FE0",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Wild-Beyond",
    Source: "https://github.com/mayer-doa-coder/Wild-Beyond",
    Tech: [TechInfo.Java, TechInfo.HTML],
    features: [
      {
        title: "Wildlife Field Blogs",
        description:
          "Publish and browse nature and wildlife stories from the field.",
      },
      {
        title: "Curated Gear Catalog",
        description:
          "Browse gear picks for photographers, observers, and outdoor adventurers.",
      },
      {
        title: "Spring Boot Backend",
        description:
          "Built on Java with Maven, containerized with Docker, and backed by a documented CI/CD pipeline.",
      },
      {
        title: "REST API",
        description:
          "A Postman-tested API layer powers the platform's data.",
      },
    ],
    hideProject: false,
    LogoSize: 64,
    versions: [],
  },
  {
    Name: "Meowtropolis",
    ShortDesc:
      "An all-in-one native iOS pet care companion offering grooming services, veterinary support, and pet supplies, built with Swift and Firebase.",
    Desc: "Meowtropolis is an all-in-one pet care companion built as a native iOS app, offering grooming services, veterinary support, pet supplies, and trusted care solutions to keep pets happy and healthy. It's built natively with Swift and SwiftUI, backed by Firebase for realtime data, authentication, and cloud services.",
    Logo: meowtropolisLogo,
    Shot: meowtropolisBanner,
    Mockup: meowtropolisBanner,
    Theme: "#B23FD1",
    Status: "completed",
    Link: "https://github.com/mayer-doa-coder/Meowtropolis",
    Source: "https://github.com/mayer-doa-coder/Meowtropolis",
    Tech: [TechInfo.Swift, TechInfo.Firebase],
    features: [
      {
        title: "Pet Care Services",
        description:
          "Grooming, veterinary support, and pet supplies brought together in one app.",
      },
      {
        title: "Native iOS Experience",
        description:
          "Built natively with Swift and SwiftUI for a smooth, platform-native feel.",
      },
      {
        title: "Firebase Backend",
        description:
          "Realtime data, authentication, and cloud services powered by Firebase.",
      },
      {
        title: "Trusted Care Network",
        description:
          "Connects pet owners with vetted care providers and services.",
      },
    ],
    hideProject: false,
    LogoSize: 64,
    versions: [],
  },
];
