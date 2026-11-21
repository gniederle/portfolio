import type { InstitutionalMessages } from '../../../i18n/messages';
import { institutionalSectionOrder } from '../../../navigation/sections';
import type { PortfolioContent } from '../../../types/portfolio';
import styles from './ContactFooter.module.css';

interface ContactFooterProps {
  content: PortfolioContent;
  messages: InstitutionalMessages;
}

export function ContactFooter({ content, messages }: ContactFooterProps) {
  const sectionNumber = String(institutionalSectionOrder.indexOf('contact') + 1).padStart(2, '0');

  return (
    <footer className={styles.footer} id="contact" aria-labelledby="contact-title">
      <div className={styles.contactGrid}>
        <div className={styles.contactIntro}>
          <p className={styles.kicker}><span aria-hidden="true">{sectionNumber}</span>{messages.sectionKickers.contact}</p>
          <h2 id="contact-title">{messages.contactTitle}</h2>
          <p>{messages.contactBody}</p>
        </div>
        <address className={styles.contactDetails}>
          <a className={styles.contactLink} href={`mailto:${content.email}`} target="_blank" rel="noopener noreferrer">
            <span>{messages.emailLabel}</span>
            <strong>{content.email}</strong>
          </a>
          <a className={styles.contactLink} href={`https://wa.me/${content.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
            <span>{messages.phoneLabel}</span>
            <strong>{content.phone}</strong>
          </a>
          <a className={styles.contactLink} href={content.github} target="_blank" rel="noopener noreferrer">
            <span>{messages.githubLabel}</span>
            <strong>github.com/gniederle</strong>
          </a>
          <a className={styles.contactLink} href={content.linkedin} target="_blank" rel="noopener noreferrer">
            <span>{messages.linkedinLabel}</span>
            <strong>linkedin.com/in/guilherme-niederle-49b59ab7</strong>
          </a>
        </address>
      </div>
      <div className={styles.footerBottom}>
        <span>{content.name}</span>
        <a href="#main-content">{messages.backToTop}<span aria-hidden="true"> ↑</span></a>
      </div>
    </footer>
  );
}
