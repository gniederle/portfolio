import type { PortfolioSectionId } from '../types/portfolio';

export const sectionOrder: readonly PortfolioSectionId[] = [
  'presentation',
  'career',
  'skills',
  'contributions',
  'education',
  'contact',
];

export const institutionalSectionOrder: readonly Exclude<PortfolioSectionId, 'contributions'>[] = [
  'presentation',
  'career',
  'skills',
  'education',
  'contact',
];
