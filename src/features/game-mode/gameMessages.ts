import type { Language } from '../../types/portfolio';

export interface GameMessages {
  languageLabel: string;
  controlsLabel: string;
  moveLeft: string;
  moveRight: string;
  jump: string;
  closePanel: string;
  closeHint: string;
  sceneLabel: string;
  characterLabel: string;
  positionLabel: string;
  jumpHint: string;
  jumpPrompt: string;
  contactIntro: string;
  technologies: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
}

export const gameMessages: Record<Language, GameMessages> = {
  pt: {
    languageLabel: 'Idioma',
    controlsLabel: 'Controles de movimentação',
    moveLeft: 'Mover para a esquerda',
    moveRight: 'Mover para a direita',
    jump: 'Pular',
    closePanel: 'Fechar painel',
    closeHint: 'Pressione Escape para retornar ao cenário.',
    sceneLabel: 'Cenário horizontal do portfólio',
    characterLabel: 'Guilherme, personagem do portfólio',
    positionLabel: 'Posição do personagem',
    jumpHint: 'Salte e toque o ícone de um ponto de interesse para abrir o card.',
    jumpPrompt: 'Salte até o ícone para abrir',
    contactIntro: 'Para conversar sobre oportunidades ou assuntos profissionais, escolha um dos canais disponíveis.',
    technologies: 'Tecnologias',
    phone: 'WhatsApp',
    email: 'E-mail',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  en: {
    languageLabel: 'Language',
    controlsLabel: 'Movement controls',
    moveLeft: 'Move left',
    moveRight: 'Move right',
    jump: 'Jump',
    closePanel: 'Close panel',
    closeHint: 'Press Escape to return to the scene.',
    sceneLabel: 'Horizontal portfolio scene',
    characterLabel: 'Guilherme, portfolio character',
    positionLabel: 'Character position',
    jumpHint: 'Jump into a point of interest icon to open its card.',
    jumpPrompt: 'Jump into the icon to open',
    contactIntro: 'For professional conversations or opportunities, choose one of the available channels.',
    technologies: 'Technologies',
    phone: 'WhatsApp',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
};
