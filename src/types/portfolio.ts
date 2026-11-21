export type Language = 'pt' | 'en';

export type PortfolioSectionId =
  | 'presentation'
  | 'career'
  | 'skills'
  | 'contributions'
  | 'education'
  | 'contact';

export type LocalizedText = Record<Language, string>;

export interface ExperienceRecord {
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  location?: LocalizedText;
  summary: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
}

export interface SkillGroup {
  category: LocalizedText;
  items: LocalizedText[];
}

export interface EducationRecord {
  course: LocalizedText;
  institution: string;
  period: LocalizedText;
  status: LocalizedText;
  location: LocalizedText;
}

export interface PortfolioContent {
  name: string;
  role: LocalizedText;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  since: string;
  presentation: {
    summary: LocalizedText;
    focusAreas: LocalizedText[];
  };
  career: ExperienceRecord[];
  skills: SkillGroup[];
  contributions: ExperienceRecord[];
  education: EducationRecord[];
}

export type PortfolioMode = 'game' | 'institutional';
