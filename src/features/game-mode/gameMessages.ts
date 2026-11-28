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
  nearbyLabel: string;
  moveHint: string;
  jumpHint: string;
  interactHint: string;
  interactionPrompt: string;
  interact: string;
  interactUnavailable: string;
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
    closeHint: 'Pressione Escape para fechar e voltar ao cenário.',
    sceneLabel: 'Cenário horizontal do portfólio',
    characterLabel: 'Guilherme, personagem do portfólio',
    positionLabel: 'Posição do personagem',
    nearbyLabel: 'Ponto próximo',
    moveHint: 'mover',
    jumpHint: 'pular',
    interactHint: 'interagir',
    interactionPrompt: 'Enter ou Interagir para abrir',
    interact: 'Interagir',
    interactUnavailable: 'Interagir (aproxime-se de um ponto)',
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
    closeHint: 'Press Escape to close and return to the scene.',
    sceneLabel: 'Horizontal portfolio scene',
    characterLabel: 'Guilherme, portfolio character',
    positionLabel: 'Character position',
    nearbyLabel: 'Nearby point',
    moveHint: 'move',
    jumpHint: 'jump',
    interactHint: 'interact',
    interactionPrompt: 'Press Enter or Interact to open',
    interact: 'Interact',
    interactUnavailable: 'Interact (move closer to a point)',
    contactIntro: 'For professional conversations or opportunities, choose one of the available channels.',
    technologies: 'Technologies',
    phone: 'WhatsApp',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
};
