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
  LaravelIcon,
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
  Laravel: {
    title: "Laravel",
    description:
      "PHP framework for building web applications with elegant syntax, robust features, and MVC architecture.",
    icon: LaravelIcon,
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
    Desc: "The Numerical Method Project showcases the application of advanced numerical techniques to solve complex mathematical problems that are difficult or impossible to solve analytically. This project demonstrates proficiency in implementing numerical algorithms with a strong focus on computational accuracy, algorithmic efficiency, and optimization. It covers various numerical methods including root finding, integration, differentiation, and solving differential equations.",
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
    Desc: "The Numerical Method Project showcases the application of advanced numerical techniques to solve complex mathematical problems that are difficult or impossible to solve analytically. This project demonstrates proficiency in implementing numerical algorithms with a strong focus on computational accuracy, algorithmic efficiency, and optimization. It covers various numerical methods including root finding, integration, differentiation, and solving differential equations.",
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
  }
];
