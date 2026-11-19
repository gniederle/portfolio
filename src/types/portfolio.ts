export type Language = 'pt' | 'en';

export type PortfolioSectionId =
  | 'presentation'
  | 'career'
  | 'skills'
  | 'contributions'
  | 'education'
  | 'contact';

export interface PortfolioContent {
  title: string;
  summary?: string;
}

export type PortfolioMode = 'game' | 'institutional';
