import type { InstitutionalMessages } from '../../../i18n/messages';
import { institutionalSectionOrder } from '../../../navigation/sections';
import type { Language, PortfolioContent, PortfolioSectionId } from '../../../types/portfolio';
import styles from './PortfolioSections.module.css';

interface PortfolioSectionsProps {
  content: PortfolioContent;
  language: Language;
  messages: InstitutionalMessages;
}

function SectionHeading({ id, messages, intro }: { id: Exclude<PortfolioSectionId, 'contributions'>; messages: InstitutionalMessages; intro: string }) {
  const number = String(institutionalSectionOrder.indexOf(id) + 1).padStart(2, '0');

  return (
    <header className={styles.sectionHeading}>
      <p className={styles.kicker}><span aria-hidden="true">{number}</span>{messages.sectionKickers[id]}</p>
      <h2 id={`${id}-title`}>{messages.sectionLabels[id]}</h2>
      <p className={styles.sectionIntro}>{intro}</p>
    </header>
  );
}

export function PortfolioSections({ content, language, messages }: PortfolioSectionsProps) {
  return (
    <>
      <section className={styles.section} id="career" aria-labelledby="career-title">
        <SectionHeading id="career" messages={messages} intro={messages.careerIntro} />
        <ol className={styles.careerList}>
          {content.career.map((item) => (
            <li className={styles.careerItem} key={item.company}>
              <div className={styles.careerMeta}>
                <p className={styles.period}>{item.period[language]}</p>
                {item.location && <p className={styles.location}>{item.location[language]}</p>}
              </div>
              <article className={styles.careerBody}>
                <h3>{item.company}</h3>
                <p className={styles.role}>{item.role[language]}</p>
                <p className={styles.bodyCopy}>{item.summary[language]}</p>
                {item.contributions.length > 0 && (
                  <ul className={styles.careerDetails}>
                    {item.contributions.map((contribution) => <li key={contribution[language]}>{contribution[language]}</li>)}
                  </ul>
                )}
                {item.technologies.length > 0 && (
                  <ul className={styles.careerTechnologies} aria-label={language === 'pt' ? 'Tecnologias' : 'Technologies'}>
                    {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} id="skills" aria-labelledby="skills-title">
        <SectionHeading id="skills" messages={messages} intro={messages.skillsIntro} />
        <div className={styles.skillGrid}>
          {content.skills.map((group) => (
            <section className={styles.skillGroup} key={group.category[language]} aria-label={group.category[language]}>
              <h3>{group.category[language]}</h3>
              <ul className={styles.skillList}>
                {group.items.map((item) => <li key={item[language]}>{item[language]}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.section} id="education" aria-labelledby="education-title">
        <SectionHeading id="education" messages={messages} intro={messages.educationIntro} />
        <div className={styles.educationList}>
          {content.education.map((item) => (
            <article className={styles.educationItem} key={item.course[language]}>
              <span className={styles.educationRule} aria-hidden="true" />
              <div>
                <p className={styles.period}>{item.period[language]}</p>
                <h3>{item.course[language]}</h3>
                <p className={styles.role}>{item.institution}</p>
                <p className={styles.educationMeta}>{item.status[language]} <span aria-hidden="true">·</span> {item.location[language]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
