import type { Language, PortfolioSectionId } from '../types/portfolio';

export interface InstitutionalMessages {
  pageTitle: string;
  metaDescription: string;
  skipLink: string;
  navigationLabel: string;
  languageLabel: string;
  languageNames: Record<Language, string>;
  sectionLabels: Record<PortfolioSectionId, string>;
  sectionKickers: Record<PortfolioSectionId, string>;
  sinceLabel: string;
  focusLabel: string;
  careerIntro: string;
  skillsIntro: string;
  contributionsIntro: string;
  educationIntro: string;
  contactIntro: string;
  contactTitle: string;
  contactBody: string;
  emailLabel: string;
  phoneLabel: string;
  githubLabel: string;
  linkedinLabel: string;
  locationLabel: string;
  backToTop: string;
}

export const institutionalMessages: Record<Language, InstitutionalMessages> = {
  pt: {
    pageTitle: 'Guilherme Niederle — Engenheiro de software',
    metaDescription: 'Portfólio profissional de Guilherme Niederle, engenheiro de software com atuação em backend e full stack.',
    skipLink: 'Pular para o conteúdo principal',
    navigationLabel: 'Navegação principal',
    languageLabel: 'Idioma do site',
    languageNames: { pt: 'Português', en: 'Inglês' },
    sectionLabels: {
      presentation: 'Apresentação',
      career: 'Trajetória profissional',
      skills: 'Competências técnicas',
      contributions: 'Trabalhos e contribuições',
      education: 'Formação acadêmica',
      contact: 'Contato',
    },
    sectionKickers: {
      presentation: 'Perfil',
      career: 'Experiência',
      skills: 'Conhecimentos',
      contributions: 'Atuação profissional',
      education: 'Formação',
      contact: 'Vamos conversar',
    },
    sinceLabel: 'Desenvolvedor desde',
    focusLabel: 'Áreas de atuação',
    careerIntro: 'Experiências profissionais em desenvolvimento e evolução de aplicações e sistemas.',
    skillsIntro: 'Tecnologias e práticas descritas no currículo, organizadas por área.',
    contributionsIntro: 'Atividades realizadas ao longo das experiências profissionais, organizadas por empresa.',
    educationIntro: 'Formação acadêmica e técnica.',
    contactIntro: 'Canais profissionais e formas de contato.',
    contactTitle: 'Entre em contato',
    contactBody: 'Para conversar sobre oportunidades ou assuntos profissionais, escolha um dos canais disponíveis.',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefone',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    locationLabel: 'Localização',
    backToTop: 'Voltar ao início',
  },
  en: {
    pageTitle: 'Guilherme Niederle — Software engineer',
    metaDescription: 'Professional portfolio of Guilherme Niederle, a software engineer focused on backend and full stack development.',
    skipLink: 'Skip to main content',
    navigationLabel: 'Main navigation',
    languageLabel: 'Website language',
    languageNames: { pt: 'Portuguese', en: 'English' },
    sectionLabels: {
      presentation: 'About',
      career: 'Career',
      skills: 'Technical skills',
      contributions: 'Work and contributions',
      education: 'Education',
      contact: 'Contact',
    },
    sectionKickers: {
      presentation: 'Profile',
      career: 'Experience',
      skills: 'Expertise',
      contributions: 'Professional work',
      education: 'Education',
      contact: "Let's talk",
    },
    sinceLabel: 'Software developer since',
    focusLabel: 'Areas of focus',
    careerIntro: 'Professional experience building and evolving applications and systems.',
    skillsIntro: 'Technologies and practices listed in the curriculum, grouped by area.',
    contributionsIntro: 'Work carried out during professional roles, organized by company.',
    educationIntro: 'Academic and technical education.',
    contactIntro: 'Professional channels and contact information.',
    contactTitle: 'Get in touch',
    contactBody: 'For professional conversations or opportunities, choose one of the available channels.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    locationLabel: 'Location',
    backToTop: 'Back to top',
  },
};
