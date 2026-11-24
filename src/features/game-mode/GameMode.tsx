import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { GameHeader } from './GameHeader';
import type { GameMessages } from './gameMessages';
import type { Language, PortfolioContent, PortfolioMode, PortfolioSectionId } from '../../types/portfolio';
import { WORLD, createPlayer, stepCamera, stepPlayer } from './platformerSimulation';
import { findHitLandmark, findNearbyLandmark, LANDMARKS, type LandmarkType } from './landmarkRegistry';
import { getViewportPresentation } from './viewportPresentation';
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

  useEffect(() => {
    const viewport = sceneRef.current;
    if (!viewport) return;
    const measure = () => {
      const rect = viewport.getBoundingClientRect();
      const presentation = getViewportPresentation(rect.width, rect.height, WORLD);
      viewportSizeRef.current = { width: rect.width, height: rect.height, ...presentation };
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
        const activatedLandmark = findHitLandmark(previousPlayer, player);
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
          ? `${sectionLabels[nearby]} — ${messages.jumpPrompt}`
          : `${messages.positionLabel}: ${sectionLabels[nearest.id]}`;
        if (caption !== previousCaption && captionRef.current) {
          captionRef.current.textContent = caption;
          previousCaption = caption;
        }
        if (activatedLandmark) {
          input.direction = 0;
          if (!triggerRef.current) triggerRef.current = sceneRef.current;
          activeSectionRef.current = activatedLandmark.id;
          setActiveSection(activatedLandmark.id);
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [messages.jumpPrompt, messages.positionLabel, sectionLabels]);

  useEffect(() => {
    const releaseAll = () => { inputRef.current.direction = 0; inputRef.current.jumpPressed = false; };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !sceneRef.current?.contains(target) || activeSectionRef.current) return;
      const key = event.key.toLowerCase();
      if (['arrowleft', 'a'].includes(key)) { event.preventDefault(); inputRef.current.direction = -1; }
      else if (['arrowright', 'd'].includes(key)) { event.preventDefault(); inputRef.current.direction = 1; }
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
  }, []);

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
          <svg className={styles.landscape} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} preserveAspectRatio="none" aria-hidden="true" shapeRendering="crispEdges">
            <defs><linearGradient id="sky" x2="0" y2="1"><stop stopColor="#8fc8ef"/><stop offset="1" stopColor="#dff1f3"/></linearGradient></defs>
            <rect width={WORLD.width} height={WORLD.height} fill="url(#sky)"/>
            <g transform={`scale(1 ${WORLD.floorY / 488})`}>
            <g fill="#f4fbfa" opacity=".9"><path d="M170 110h92v10h-92z M188 91h28v19h-28z M215 75h31v35h-31z M246 88h24v22h-24z M420 150h60v8h-60z M433 138h22v12h-22z M455 128h18v22h-18z M2800 106h92v10h-92z M2818 86h28v20h-28z M2847 72h30v34h-30z M2877 85h25v21h-25z"/></g>
            <path d="M0 362 210 225 420 362 760 190 1030 362 1370 240 1700 362 2075 205 2400 362 2710 234 3025 362 3370 190 3700 362 4050 225 4380 362 4590 260 4800 355v130H0z" fill="#a7cfc5"/>
            <path d="M0 397 330 281 650 398 1000 275 1320 399 1660 292 2020 399 2390 274 2730 400 3070 286 3390 398 3730 266 4070 400 4440 290 4800 389v110H0z" fill="#82b9a8"/>
            <path d="M0 450q420-78 760 4t780-2 770 0 820-1 840 1 830-2v100H0z" fill="#a9cd8d"/>
            <rect y="488" width={WORLD.width} height="54" fill="#729b57"/><rect y="495" width={WORLD.width} height="12" fill="#9bbd6b"/><rect y="508" width={WORLD.width} height="28" fill="#b99262"/><rect y="536" width={WORLD.width} height="112" fill="#705b4c"/>
            <path d="M0 550h4800v8H0z" fill="#5b4a42" opacity=".45"/>
            {Array.from({ length: 32 }, (_, index) => <path key={index} d={`M${index * 155 + 18} 497h18v8h-18z M${index * 155 + 94} 500h10v6h-10z`} fill={index % 2 ? '#5e824f' : '#85a85e'} opacity=".8"/>)}
            </g>
          </svg>
          <div className={styles.distantTree} style={{ left: 700, top: 430 * (WORLD.floorY / 488) }} aria-hidden="true"><i/><i/><i/><b/></div>
          <div className={styles.distantTree} style={{ left: 3280, top: 430 * (WORLD.floorY / 488) }} aria-hidden="true"><i/><i/><i/><b/></div>
          {LANDMARKS.map((landmark) => (
            <div
              key={landmark.id}
              className={`${styles.landmark} ${styles[landmark.type]}`}
              style={{ left: landmark.x, top: `${landmark.interaction.hitbox.top}px` }}
              aria-hidden="true"
              data-landmark-id={landmark.id}
              data-world-x={landmark.x}
              data-nearby={nearbyLandmark === landmark.id}
            >
              <LandmarkArt type={landmark.type} />
              <span>{sectionLabels[landmark.id]}</span>
              {nearbyLandmark === landmark.id && (
                <span className={styles.interactionHint}>{messages.jumpPrompt}</span>
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
        <p><kbd>←</kbd><kbd>→</kbd> {language === 'pt' ? 'mover' : 'move'} <kbd>{language === 'pt' ? 'Espaço' : 'Space'}</kbd> {messages.jumpHint}</p>
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

function LandmarkArt({ type }: { type: LandmarkType }) {
  const common = { viewBox: '0 0 100 100', 'aria-hidden': true as const };
  if (type === 'portal') return <svg {...common}><path d="M14 86V48a36 36 0 0 1 72 0v38H14z" fill="#c9ad82" stroke="#705b4c" strokeWidth="6"/><path d="M27 86V48a23 23 0 0 1 46 0v38z" fill="#ffe6aa" stroke="#f4fbfa" strokeWidth="3"/><path d="M8 87h84v10H8z" fill="#9b815f"/></svg>;
  if (type === 'sign') return <svg {...common}><path d="M44 38h12v56H44z" fill="#78614d"/><path d="M10 19h74v22H10zM18 48h68v22H18z" fill="#dfbd7e" stroke="#705b4c" strokeWidth="4"/><path d="m69 25 9 5-9 5M29 54l-9 6 9 6" fill="none" stroke="#705b4c" strokeWidth="4"/></svg>;
  if (type === 'computer') return <svg {...common}><path d="M10 15h80v55H10z" fill="#587a77" stroke="#344f50" strokeWidth="6"/><path d="M17 22h66v40H17z" fill="#d3e8e5"/><path d="M45 70h10v14H45zM32 84h36v8H32z" fill="#705b4c"/><path d="m34 40 10 9-10 9M49 58h17" fill="none" stroke="#387a70" strokeWidth="4"/></svg>;
  if (type === 'workbench') return <svg {...common}><path d="M12 42h76v12H12zM19 54h10v38H19zM72 54h10v38H72z" fill="#8d6d4c"/><path d="M24 18h54v20H24zM31 22h40v12H31z" fill="#d8e9e5" stroke="#47625d" strokeWidth="4"/><path d="M45 35v12h24" fill="none" stroke="#47625d" strokeWidth="4"/></svg>;
  if (type === 'bookshelf') return <svg {...common}><path d="M13 11h74v82H13z" fill="#896846" stroke="#614b39" strokeWidth="5"/><path d="M18 40h64v6H18zM18 67h64v6H18z" fill="#e1c392"/><path d="M23 16h11v21H23zM37 19h13v18H37zM56 14h10v23H56zM70 20h8v17h-8zM22 47h14v16H22zM41 49h9v14h-9zM56 46h17v17H56zM22 75h10v14H22zM37 77h17v12H37zM61 76h14v13H61z" fill="#55776b" stroke="#384f4a" strokeWidth="2"/></svg>;
  return <svg {...common}><path d="M50 9 82 43 50 75 18 43z" fill="#d6e5d5" stroke="#a6bb9b" strokeWidth="5"/><path d="M50 17 72 43 50 66 28 43z" fill="#fff1bf"/><path d="M50 25 61 43 50 56 39 43z" fill="#fff"/><path d="M31 80h38v10H31zM22 91h56v7H22z" fill="#88755d"/></svg>;
}

function capitalize(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}
