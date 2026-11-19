import type { Language } from '../types/portfolio';

export interface InitialScreenCopy {
  eyebrow: string;
  title: string;
  status: string;
}

export const initialScreenMessages: Record<Language, InitialScreenCopy> = {
  pt: {
    eyebrow: 'Portfólio profissional',
    title: 'Guilherme Niederle',
    status: 'Estrutura inicial da aplicação em funcionamento.',
  },
  en: {
    eyebrow: 'Professional portfolio',
    title: 'Guilherme Niederle',
    status: 'Initial application structure is running.',
  },
};
