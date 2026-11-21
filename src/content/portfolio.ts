import type { EducationRecord, ExperienceRecord, PortfolioContent, SkillGroup } from '../types/portfolio';

const experience: ExperienceRecord[] = [
  {
    company: 'SoftExpert',
    role: { pt: 'Engenheiro de Software', en: 'Software Engineer' },
    period: { pt: 'Maio de 2020 – Novembro de 2026', en: 'May 2020 – November 2026' },
    location: { pt: 'Joinville/SC · Remoto', en: 'Joinville, Brazil · Remote' },
    summary: {
      pt: 'Desenvolvimento e evolução de uma plataforma corporativa de gestão, automação e controle de processos.',
      en: 'Development and evolution of a corporate platform for process management, automation, and control.',
    },
    contributions: [
      {
        pt: 'Análise de demandas e problemas de negócio, identificação de soluções técnicas e desenvolvimento de funcionalidades.',
        en: 'Analyzed business needs and problems, identified technical solutions, and developed features.',
      },
      {
        pt: 'Desenvolvimento e manutenção de aplicações backend e APIs integradas a Oracle, PostgreSQL e SQL Server.',
        en: 'Developed and maintained backend applications and APIs integrated with Oracle, PostgreSQL, and SQL Server.',
      },
      {
        pt: 'Participação na modernização de interfaces, integrando funcionalidades à nova estrutura frontend em ReactJS.',
        en: 'Contributed to interface modernization by integrating features into the new ReactJS frontend structure.',
      },
      {
        pt: 'Análise de sistemas existentes, correção de bugs, otimização de código e desenvolvimento de customizações.',
        en: 'Analyzed existing systems, fixed bugs, optimized code, and developed customizations.',
      },
    ],
    technologies: ['PHP', 'ReactJS', 'APIs REST', 'Oracle', 'PostgreSQL', 'SQL Server'],
  },
  {
    company: 'Questor Sistemas',
    role: { pt: 'Programador', en: 'Software Developer' },
    period: { pt: 'Janeiro de 2018 – Abril de 2020', en: 'January 2018 – April 2020' },
    location: { pt: 'Chapecó/SC', en: 'Chapecó, Brazil' },
    summary: {
      pt: 'Desenvolvimento de rotinas de web scraping e automação de consulta e download de documentos.',
      en: 'Developed web scraping routines and automated document lookup and downloads.',
    },
    contributions: [
      {
        pt: 'Implementação de rotinas de captura automatizada de documentos, com Laravel Queues e Redis.',
        en: 'Implemented automated document capture routines using Laravel Queues and Redis.',
      },
      {
        pt: 'Armazenamento e organização de dados com MongoDB e MySQL.',
        en: 'Stored and organized data with MongoDB and MySQL.',
      },
      {
        pt: 'Participação no desenvolvimento de um chat interno com C# e .NET e manutenção de um sistema de documentação.',
        en: 'Contributed to an internal chat built with C# and .NET and maintained a product documentation system.',
      },
    ],
    technologies: ['PHP', 'Laravel', 'Laravel Queues', 'Redis', 'MongoDB', 'MySQL', 'C#', '.NET'],
  },
  {
    company: 'Eagle Track',
    role: { pt: 'Programador', en: 'Software Developer' },
    period: { pt: 'Junho – Dezembro de 2017', en: 'June – December 2017' },
    location: { pt: 'Chapecó/SC', en: 'Chapecó, Brazil' },
    summary: {
      pt: 'Desenvolvimento e manutenção de funcionalidades para um sistema web de monitoramento de veículos.',
      en: 'Developed and maintained features for a web-based vehicle monitoring system.',
    },
    contributions: [
      {
        pt: 'Desenvolvimento de interfaces web e integração com PostgreSQL e Leaflet.',
        en: 'Developed web interfaces and integrated them with PostgreSQL and Leaflet.',
      },
      {
        pt: 'Correção de inconsistências do sistema.',
        en: 'Fixed system inconsistencies.',
      },
    ],
    technologies: ['PHP', 'Laravel', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Leaflet', 'PostgreSQL'],
  },
  {
    company: 'Beatscode · INCTECH / Incubadora Tecnológica Unochapecó',
    role: { pt: 'Estagiário', en: 'Intern' },
    period: { pt: 'Fevereiro de 2016 – Janeiro de 2017', en: 'February 2016 – January 2017' },
    summary: {
      pt: 'Desenvolvimento de funcionalidades para sistema de gestão de clubes de futebol, correção de bugs, relatórios e ajustes de interface.',
      en: 'Developed features for a football club management system, fixed bugs, prepared reports, and adjusted interfaces.',
    },
    contributions: [
      {
        pt: 'Apoio ao desenvolvimento de aplicativo mobile.',
        en: 'Supported the development of a mobile application.',
      },
    ],
    technologies: ['PHP', 'Zend Framework 2', 'Doctrine', 'MySQL'],
  },
  {
    company: 'Centro de Residência em Software · Unochapecó',
    role: { pt: 'Estagiário', en: 'Intern' },
    period: { pt: 'Fevereiro de 2015 – Janeiro de 2016', en: 'February 2015 – January 2016' },
    summary: {
      pt: 'Desenvolvimento e manutenção de sistema web de gestão de estágios.',
      en: 'Developed and maintained a web-based internship management system.',
    },
    contributions: [],
    technologies: ['PHP', 'Zend Framework 2', 'Doctrine', 'PostgreSQL'],
  },
  {
    company: 'Betha Sistemas Ltda.',
    role: { pt: 'Estagiário', en: 'Intern' },
    period: { pt: 'Janeiro – Dezembro de 2014', en: 'January – December 2014' },
    summary: {
      pt: 'Suporte aos usuários, manutenção de sistemas, execução de backups e atividades relacionadas à administração de servidores.',
      en: 'Supported users, maintained systems, performed backups, and assisted with server administration activities.',
    },
    contributions: [],
    technologies: [],
  },
];

const skills: SkillGroup[] = [
  {
    category: { pt: 'Linguagens', en: 'Languages' },
    items: [{ pt: 'PHP', en: 'PHP' }, { pt: 'JavaScript', en: 'JavaScript' }],
  },
  {
    category: { pt: 'Backend e frameworks', en: 'Backend & frameworks' },
    items: [
      { pt: 'Laravel', en: 'Laravel' },
      { pt: 'Zend Framework', en: 'Zend Framework' },
      { pt: 'APIs REST', en: 'REST APIs' },
      { pt: 'Integração de sistemas', en: 'System integration' },
    ],
  },
  {
    category: { pt: 'Frontend', en: 'Frontend' },
    items: [
      { pt: 'ReactJS', en: 'ReactJS' },
      { pt: 'HTML5', en: 'HTML5' },
      { pt: 'CSS3', en: 'CSS3' },
      { pt: 'jQuery', en: 'jQuery' },
    ],
  },
  {
    category: { pt: 'Bancos de dados', en: 'Databases' },
    items: [
      { pt: 'PostgreSQL', en: 'PostgreSQL' },
      { pt: 'Oracle', en: 'Oracle' },
      { pt: 'SQL Server', en: 'SQL Server' },
      { pt: 'MySQL', en: 'MySQL' },
      { pt: 'MongoDB', en: 'MongoDB' },
    ],
  },
  {
    category: { pt: 'Engenharia de software', en: 'Software engineering' },
    items: [
      { pt: 'SOLID', en: 'SOLID' },
      { pt: 'Design Patterns', en: 'Design Patterns' },
      { pt: 'Clean Architecture', en: 'Clean Architecture' },
      { pt: 'Testes automatizados', en: 'Automated testing' },
      { pt: 'Manutenção e refatoração de sistemas legados', en: 'Legacy system maintenance and refactoring' },
    ],
  },
  {
    category: { pt: 'Ferramentas e ambiente', en: 'Tools & environment' },
    items: [
      { pt: 'Git', en: 'Git' },
      { pt: 'Docker', en: 'Docker' },
      { pt: 'Ferramentas de desenvolvimento com IA generativa', en: 'Generative AI development tools' },
    ],
  },
];

const education: EducationRecord[] = [
  {
    course: { pt: 'Bacharelado em Sistemas de Informação', en: 'Bachelor of Information Systems' },
    institution: 'Universidade Comunitária da Região de Chapecó (Unochapecó)',
    period: { pt: 'Janeiro de 2013 – Dezembro de 2017', en: 'January 2013 – December 2017' },
    status: { pt: 'Concluído', en: 'Completed' },
    location: { pt: 'Chapecó/SC', en: 'Chapecó, Brazil' },
  },
  {
    course: { pt: 'Técnico em Desenvolvimento de IA para Análise Preditiva', en: 'Technical Program in AI Development for Predictive Analysis' },
    institution: 'SCTEC · SENAI',
    period: { pt: 'Junho de 2026 – Em andamento', en: 'June 2026 – In progress' },
    status: { pt: 'Em andamento', en: 'In progress' },
    location: { pt: 'Online', en: 'Online' },
  },
];

export const portfolioContent: PortfolioContent = {
  name: 'Guilherme Niederle',
  role: { pt: 'Engenheiro de software · Backend e full stack', en: 'Software engineer · Backend & full stack' },
  location: 'São José – SC',
  phone: '+55 49 99810-5000',
  email: 'guiniederle@gmail.com',
  github: 'https://github.com/gniederle',
  linkedin: 'https://linkedin.com/in/guilherme-niederle-49b59ab7',
  since: '2018',
  presentation: {
    summary: {
      pt: 'Desenvolvedor de software desde 2018, com experiência no desenvolvimento e evolução de aplicações e serviços backend, principalmente em ambientes corporativos. Atua na análise de requisitos, identificação de soluções técnicas, desenvolvimento de APIs REST, integração entre sistemas e manutenção de aplicações corporativas.',
      en: 'Software developer since 2018, experienced in building and evolving backend applications and services, mainly in corporate environments. His work includes requirements analysis, identifying technical solutions, developing REST APIs, integrating systems, and maintaining corporate applications.',
    },
    focusAreas: [
      { pt: 'Aplicações e serviços backend', en: 'Backend applications and services' },
      { pt: 'APIs REST e integração entre sistemas', en: 'REST APIs and system integration' },
      { pt: 'Manutenção de aplicações corporativas', en: 'Corporate application maintenance' },
    ],
  },
  career: experience,
  skills,
  contributions: experience,
  education,
};
