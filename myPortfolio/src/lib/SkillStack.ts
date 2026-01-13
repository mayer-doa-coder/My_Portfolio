import {
    HtmlIcon,
    CssIcon,
    JsIcon,
    TsIcon,
    ReactIcon,
    NextIcon,
    AstroIcon,
    TailwindIcon,
    NodeIcon,
    ExpressIcon,
    LaravelIcon,
    OracleIcon,
    MongoIcon,
    FirebaseIcon,
    MysqlIcon,
    PhpIcon,
    PythonIcon,
    CppIcon,
    JavaIcon,
    NpmIcon,
    GitIcon,
    GithubIcon,
    FigmaIcon,
    IllustratorIcon,
    PhotoshopIcon,
    CanvaIcon,
    PreactIcon
} from "../assets/icons";

export const FrontendStack = [
    {
        name: "HTML",
        icon: HtmlIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
        name: "CSS",
        icon: CssIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
        name: "JavaScript",
        icon: JsIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
        name: "TypeScript",
        icon: TsIcon,
        link: "https://www.typescriptlang.org/",
    },
    { name: "React.js", icon: ReactIcon, link: "https://react.dev/" },
    { name: "Next.js", icon: NextIcon, link: "https://nextjs.org/" },
    { name: "Astro", icon: AstroIcon, link: "https://astro.build/" },
    { name: "Tailwind", icon: TailwindIcon, link: "https://tailwindcss.com/" },    
    { name: "Preact.js", icon: PreactIcon, link: "https://preactjs.com/" },

];
export const BackendStack = [
    { name: "Node.js", icon: NodeIcon, link: "https://nodejs.org/" },
    { name: "Express.js", icon: ExpressIcon, link: "https://expressjs.com/" },
    { name: "Laravel", icon: LaravelIcon, link: "https://laravel.com/" },
    { name: "MongoDB", icon: MongoIcon, link: "https://www.mongodb.com/" },
    {
        name: "Firebase",
        icon: FirebaseIcon,
        link: "https://firebase.google.com/",
    },
    { name: "MySQL", icon: MysqlIcon, link: "https://www.mysql.com/" },
    { name: "Oracle", icon: OracleIcon, link: "https://www.oracle.com/database/" },
    { name: "PHP", icon: PhpIcon, link: "https://www.php.net/" },
];

export const ProgrammingStack = [
    { name: "Python", icon: PythonIcon, link: "https://www.python.org/" },
    { name: "C++", icon: CppIcon, link: "https://isocpp.org/" },
    { name: "Java", icon: JavaIcon, link: "https://www.oracle.com/java/" },
];

export const ToolsStack = [
    { name: "NPM", icon: NpmIcon, link: "https://www.npmjs.com/" },
    { name: "Git", icon: GitIcon, link: "https://git-scm.com/" },
    { name: "GitHub", icon: GithubIcon, link: "https://github.com/" },
    { name: "Figma", icon: FigmaIcon, link: "https://www.figma.com/" },
    { name: "Illustrator", icon: IllustratorIcon, link: "https://www.adobe.com/products/illustrator.html" },
    { name: "Photoshop", icon: PhotoshopIcon, link: "https://www.adobe.com/products/photoshop.html" },
    { name: "Canva", icon: CanvaIcon, link: "https://www.canva.com/" },
];

// All skills combined
export const AllSkills = [
    ...FrontendStack,
    ...BackendStack,
    ...ProgrammingStack,
    ...ToolsStack,
];