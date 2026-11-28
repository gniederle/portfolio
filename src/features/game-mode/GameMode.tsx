import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { GameHeader } from './GameHeader';
import type { GameMessages } from './gameMessages';
import type { Language, PortfolioContent, PortfolioMode, PortfolioSectionId } from '../../types/portfolio';
import { WORLD, createPlayer, stepCamera, stepPlayer } from './platformerSimulation';
import { findNearbyLandmark, LANDMARKS, type LandmarkType } from './landmarkRegistry';
import { getViewportPresentation } from './viewportPresentation';
import worldBackground from '../../assets/game/environment/world-background.png';
import presentationPortal from '../../assets/game/landmarks/presentation-portal.png';
import careerSignpost from '../../assets/game/landmarks/career-signpost.png';
import skillsComputerBlock from '../../assets/game/landmarks/skills-computer-block.png';
import contributionsWorkbench from '../../assets/game/landmarks/contributions-workbench.png';
import educationBookshelf from '../../assets/game/landmarks/education-bookshelf.png';
import contactCrystal from '../../assets/game/landmarks/contact-crystal.png';
import styles from './GameMode.module.css';

interface GameModeProps {
  content: PortfolioContent;
  language: Language;
  messages: GameMessages;
  sectionLabels: Record<PortfolioSectionId, string>;
  languageNames: Record<Language, string>;
  modeLabels: Record<PortfolioMode, string>;
  onLanguageChange: (language: Language) => void;
  onModeChange: (mode: PortfolioMode) => void;
}

export function GameMode({ content, language, messages, sectionLabels, languageNames, modeLabels, onLanguageChange, onModeChange }: GameModeProps) {
  const [activeSection, setActiveSection] = useState<PortfolioSectionId | null>(null);
  const [nearbyLandmark, setNearbyLandmark] = useState<PortfolioSectionId | null>(null);
  const activeSectionRef = useRef<PortfolioSectionId | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const jumpButtonRef = useRef<HTMLButtonElement>(null);
  const interactButtonRef = useRef<HTMLButtonElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const playerElementRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const nearbyLandmarkRef = useRef<PortfolioSectionId | null>(null);
  const playerStateRef = useRef(createPlayer());
  const animationStateRef = useRef<'idle' | 'walking' | 'rising' | 'falling' | 'landing'>('idle');
  const cameraStateRef = useRef({ x: 0 });
  const inputRef = useRef({ direction: 0 as -1 | 0 | 1, jumpPressed: false });
  const viewportSizeRef = useRef({ width: 0, height: 0, scale: 1, offsetX: 0, offsetY: 0, worldWidth: WORLD.width });

  const openNearbyPanel = useCallback((trigger: HTMLElement | null = sceneRef.current) => {
    const section = nearbyLandmarkRef.current;
    if (!section || activeSectionRef.current) return;
    inputRef.current.direction = 0;
    inputRef.current.jumpPressed = false;
    triggerRef.current = trigger;
    activeSectionRef.current = section;
    setActiveSection(section);
  }, []);

  useEffect(() => {
    const viewport = sceneRef.current;
    if (!viewport) return;
    const measure = () => {
      const rect = viewport.getBoundingClientRect();
      const presentation = getViewportPresentation(rect.width, rect.height, WORLD);
      viewportSizeRef.current = { width: rect.width, height: rect.height, ...presentation };
      worldRef.current?.style.setProperty('--world-ui-scale', `${1 / presentation.scale}`);
      viewport.style.setProperty('--floor-screen-y', `${rect.height * (WORLD.floorY / WORLD.height)}px`);
      viewport.style.setProperty('--scene-sky', presentation.skyBackground);
      viewport.style.setProperty('--ground-grass-height', `${presentation.groundGrassHeight}px`);
      viewport.style.setProperty('--ground-detail-top', `${presentation.groundDetailTop}px`);
      viewport.style.setProperty('--ground-detail-bottom', `${presentation.groundDetailBottom}px`);
      viewport.style.setProperty('--ground-path-top', `${presentation.groundPathTop}px`);
      viewport.style.setProperty('--ground-path-bottom', `${presentation.groundPathBottom}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeSection) panelRef.current?.focus();
    else triggerRef.current?.focus();
  }, [activeSection]);

  useEffect(() => {
    let frame = 0;
    let previousTime = performance.now();
    let previousCaption = '';
    let landingTimeRemaining = 0;
    const tick = (time: number) => {
      const elapsed = (time - previousTime) / 1000;
      previousTime = time;
      if (!activeSectionRef.current) {
        const input = inputRef.current;
        const previousPlayer = playerStateRef.current;
        const player = stepPlayer(previousPlayer, input, elapsed);
        input.jumpPressed = false;
        playerStateRef.current = player;
        const { scale, offsetX, offsetY, worldWidth: viewportWorldWidth } = viewportSizeRef.current;
        cameraStateRef.current = stepCamera(
          cameraStateRef.current,
          player,
          viewportWorldWidth,
          elapsed,
          WORLD,
          window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        );

        const playerElement = playerElementRef.current;
        if (playerElement) {
          playerElement.style.setProperty('--player-x', `${player.x}px`);
          playerElement.style.setProperty('--player-y', `${player.y}px`);
          playerElement.style.setProperty('--player-facing', `${player.facing}`);
          playerElement.dataset.x = `${player.x}`;
          if (!previousPlayer.grounded && player.grounded) landingTimeRemaining = 0.28;
          else landingTimeRemaining = Math.max(0, landingTimeRemaining - Math.max(0, elapsed));
          const animationState = landingTimeRemaining > 0
            ? 'landing'
            : player.grounded
              ? Math.abs(player.vx) > 8 ? 'walking' : 'idle'
              : player.vy < 0 ? 'rising' : 'falling';
          if (animationState !== animationStateRef.current) {
            playerElement.classList.remove(styles[`character${capitalize(animationStateRef.current)}`]);
            playerElement.classList.add(styles[`character${capitalize(animationState)}`]);
            animationStateRef.current = animationState;
            playerElement.dataset.state = animationState;
          }
        }
        if (worldRef.current) {
          worldRef.current.style.transform = `translate3d(${offsetX - cameraStateRef.current.x * scale}px, ${offsetY}px, 0) scale(${scale})`;
          worldRef.current.dataset.renderScale = `${scale}`;
          worldRef.current.dataset.cameraX = `${cameraStateRef.current.x}`;
        }
        const centerX = player.x + player.width / 2;
        const nearest = LANDMARKS.reduce((best, item) =>
          Math.abs(item.x - centerX) < Math.abs(best.x - centerX) ? item : best, LANDMARKS[0]);
        const nearby = findNearbyLandmark(player)?.id ?? null;
        if (nearby !== nearbyLandmarkRef.current) {
          nearbyLandmarkRef.current = nearby;
          setNearbyLandmark(nearby);
        }
        const caption = nearby
          ? `${messages.nearbyLabel}: ${sectionLabels[nearby]}. ${messages.interactionPrompt}`
          : `${messages.positionLabel}: ${sectionLabels[nearest.id]}`;
        if (caption !== previousCaption && captionRef.current) {
          captionRef.current.textContent = caption;
          previousCaption = caption;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [messages.interactionPrompt, messages.nearbyLabel, messages.positionLabel, sectionLabels]);

  useEffect(() => {
    const releaseAll = () => { inputRef.current.direction = 0; inputRef.current.jumpPressed = false; };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !sceneRef.current?.contains(target) || activeSectionRef.current) return;
      const key = event.key.toLowerCase();
      if (['arrowleft', 'a'].includes(key)) { event.preventDefault(); inputRef.current.direction = -1; }
      else if (['arrowright', 'd'].includes(key)) { event.preventDefault(); inputRef.current.direction = 1; }
      else if (key === 'enter') {
        event.preventDefault();
        if (!event.repeat) openNearbyPanel(sceneRef.current);
      }
      else if (['arrowup', 'w', ' '].includes(key)) {
        event.preventDefault();
        if (!event.repeat) {
          triggerRef.current = sceneRef.current;
          inputRef.current.jumpPressed = true;
        }
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['arrowleft', 'a'].includes(key) && inputRef.current.direction === -1) inputRef.current.direction = 0;
      if (['arrowright', 'd'].includes(key) && inputRef.current.direction === 1) inputRef.current.direction = 0;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', releaseAll);
    document.addEventListener('visibilitychange', releaseAll);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', releaseAll);
      document.removeEventListener('visibilitychange', releaseAll);
    };
  }, [openNearbyPanel]);

  const jump = useCallback((trigger?: HTMLButtonElement) => {
    triggerRef.current = trigger ?? sceneRef.current;
    inputRef.current.jumpPressed = true;
  }, []);
  const closePanel = useCallback(() => {
    activeSectionRef.current = null;
    setActiveSection(null);
  }, []);
  const stopMovement = useCallback(() => {
    inputRef.current.direction = 0;
  }, []);
  const startMovement = useCallback((direction: -1 | 1, event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    inputRef.current.direction = direction;
  }, []);

  const onPanelKey = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const renderPanelContent = (id: PortfolioSectionId) => {
    if (id === 'presentation') {
      return (
        <>
          <p className={styles.lead}>{content.role[language]}</p>
          <p>{content.presentation.summary[language]}</p>
          <ul className={styles.focusList}>
            {content.presentation.focusAreas.map((item) => <li key={item[language]}>{item[language]}</li>)}
          </ul>
        </>
      );
    }

    if (id === 'career' || id === 'contributions') {
      return (
        <div className={styles.recordList}>
          {content.career.map((item) => (
            <article className={styles.record} key={item.company}>
              <div className={styles.recordMeta}>
                <h3>{item.company}</h3>
                <span>{item.period[language]}</span>
              </div>
              <p className={styles.muted}>
                {item.role[language]}{item.location ? ` · ${item.location[language]}` : ''}
              </p>
              <p>{item.summary[language]}</p>
              {item.contributions.length > 0 && (
                <ul>
                  {item.contributions.map((line) => <li key={line[language]}>{line[language]}</li>)}
                </ul>
              )}
              {item.technologies.length > 0 && (
                <p className={styles.technologyLine}>
                  <strong>{messages.technologies}:</strong> {item.technologies.join(' · ')}
                </p>
              )}
            </article>
          ))}
        </div>
      );
    }

    if (id === 'skills') {
      return (
        <div className={styles.skillGrid}>
          {content.skills.map((group) => (
            <section className={styles.skillGroup} key={group.category[language]}>
              <h3>{group.category[language]}</h3>
              <ul>{group.items.map((item) => <li key={item[language]}>{item[language]}</li>)}</ul>
            </section>
          ))}
        </div>
      );
    }

    if (id === 'education') {
      return (
        <div className={styles.recordList}>
          {content.education.map((item) => (
            <article className={styles.record} key={item.course[language]}>
              <div className={styles.recordMeta}>
                <h3>{item.course[language]}</h3>
                <span>{item.period[language]}</span>
              </div>
              <p>{item.institution}</p>
              <p className={styles.muted}>{item.status[language]} · {item.location[language]}</p>
            </article>
          ))}
        </div>
      );
    }

    return (
      <>
        <p>{messages.contactIntro}</p>
        <ul className={styles.contactList}>
          <li><a href={`mailto:${content.email}`}>{messages.email}: {content.email}</a></li>
          <li>
            <a href={`https://wa.me/${content.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
              {messages.phone}: {content.phone}
            </a>
          </li>
          <li><a href={content.github} target="_blank" rel="noreferrer">{messages.github}</a></li>
          <li><a href={content.linkedin} target="_blank" rel="noreferrer">{messages.linkedin}</a></li>
        </ul>
      </>
    );
  };

  return (
    <main className={styles.game}>
      <GameHeader
        language={language}
        languageNames={languageNames}
        languageLabel={messages.languageLabel}
        institutionalModeLabel={modeLabels.institutional}
        onLanguageChange={onLanguageChange}
        onModeChange={onModeChange}
      />
      <section id="game-world" className={styles.sceneViewport} aria-label={messages.sceneLabel} tabIndex={0} ref={sceneRef}>
        <div ref={worldRef} className={styles.world} data-platformer-world data-render-scale="0" data-camera-x="0" style={{ width: WORLD.width, height: WORLD.height, transformOrigin: 'top left' }}>
          <img className={styles.landscape} src={worldBackground} alt="" aria-hidden="true" draggable={false} />
          {LANDMARKS.map((landmark) => (
            <div
              key={landmark.id}
              className={`${styles.landmark} ${styles[landmark.type]}`}
              style={{
                left: landmark.x,
                top: landmark.y - landmark.visual.frameSize,
                '--landmark-size': `${landmark.visual.frameSize}px`,
                '--landmark-baseline-offset': `${landmark.visual.baselineOffset}px`,
              } as React.CSSProperties}
              aria-hidden="true"
              data-landmark-id={landmark.id}
              data-world-x={landmark.x}
              data-nearby={nearbyLandmark === landmark.id}
            >
              <LandmarkArt type={landmark.type} />
              <span>{sectionLabels[landmark.id]}</span>
              {nearbyLandmark === landmark.id && (
                <span className={styles.interactionHint}>{messages.interactionPrompt}</span>
              )}
            </div>
          ))}
          <div
            ref={playerElementRef}
            data-testid="platformer-player"
            data-state="idle"
            data-x="105"
            className={`${styles.character} ${styles.characterIdle}`}
            style={{
              '--player-x': '105px',
              '--player-y': `${WORLD.floorY - 140}px`,
              '--player-facing': '1',
            } as React.CSSProperties}
            role="img"
            aria-label={messages.characterLabel}
          >
            <span className={styles.characterSprite} aria-hidden="true" />
          </div>
        </div>
        <div className={styles.sceneCaption} aria-live="polite" ref={captionRef}>
          {messages.positionLabel}: {sectionLabels.presentation}
        </div>
      </section>
      <footer className={styles.controlBar} data-testid="game-controls">
        <p>
          <kbd>←</kbd><kbd>→</kbd> {messages.moveHint}
          <kbd>{language === 'pt' ? 'Espaço' : 'Space'}</kbd> {messages.jumpHint}
          <kbd>Enter</kbd> {messages.interactHint}
        </p>
        <div className={styles.touchControls} role="group" aria-label={messages.controlsLabel}>
          <button
            type="button"
            aria-label={messages.moveLeft}
            onPointerDown={(event) => startMovement(-1, event)}
            onPointerUp={stopMovement}
            onPointerCancel={stopMovement}
            onLostPointerCapture={stopMovement}
          >←</button>
          <button
            type="button"
            aria-label={messages.moveRight}
            onPointerDown={(event) => startMovement(1, event)}
            onPointerUp={stopMovement}
            onPointerCancel={stopMovement}
            onLostPointerCapture={stopMovement}
          >→</button>
          <button ref={jumpButtonRef} type="button" aria-label={messages.jump} onClick={() => jump(jumpButtonRef.current ?? undefined)}>↑</button>
          <button
            ref={interactButtonRef}
            className={styles.interactControl}
            type="button"
            aria-label={nearbyLandmark ? `${messages.interact}: ${sectionLabels[nearbyLandmark]}` : messages.interactUnavailable}
            disabled={!nearbyLandmark}
            data-testid="game-interact"
            onClick={() => openNearbyPanel(interactButtonRef.current)}
          >
            <span aria-hidden="true">↵</span>
            <span className={styles.touchControlLabel} aria-hidden="true">{messages.interact}</span>
          </button>
        </div>
      </footer>
      {activeSection && (
        <div
          className={styles.dialogBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel();
          }}
        >
          <section
            className={styles.infoPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-panel-title"
            tabIndex={-1}
            ref={panelRef}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.stopPropagation();
                closePanel();
                return;
              }
              onPanelKey(event);
            }}
          >
            <header className={styles.panelHeader}>
              <div>
                <p>{sectionLabels[activeSection]}</p>
                <h2 id="game-panel-title">
                  {activeSection === 'presentation' ? content.name : sectionLabels[activeSection]}
                </h2>
              </div>
              <button type="button" aria-label={messages.closePanel} onClick={closePanel}>
                ×
              </button>
            </header>
            <div className={styles.panelBody}>{renderPanelContent(activeSection)}</div>
            <p className={styles.closeHint}>{messages.closeHint}</p>
          </section>
        </div>
      )}
    </main>
  );
}

const LANDMARK_ASSETS: Record<LandmarkType, string> = {
  portal: presentationPortal,
  sign: careerSignpost,
  computer: skillsComputerBlock,
  workbench: contributionsWorkbench,
  bookshelf: educationBookshelf,
  crystal: contactCrystal,
};

function LandmarkArt({ type }: { type: LandmarkType }) {
  return <img className={styles.landmarkArt} src={LANDMARK_ASSETS[type]} alt="" aria-hidden="true" draggable={false} />;
}

function capitalize(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}
