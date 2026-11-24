import { Link } from '@tanstack/react-router'
import './ljusrum.css'
import './site.css'

// Ram runt deltagarens sidor.
export function SitePage({ className = '', children }) {
  return (
    <div className="ljusrum">
      <div className={'site-page ' + className}>{children}</div>
    </div>
  )
}

// Bakåtlänk under toppmenyn (visas på dator och surfplatta).
export function SiteBackLink({ children, ...linkProps }) {
  return (
    <Link className="admin-back site-back" {...linkProps}>
      <img src="/icons/arrow-left.svg" alt="" width="17" height="15" />
      <span>{children}</span>
    </Link>
  )
}

// Stor bild med rubrik överst på sidan (dator och surfplatta).
export function SiteHero({ image, eyebrow, title, children, className = '' }) {
  return (
    <section className={'site-hero ' + className} style={{ backgroundImage: `url(${image})` }}>
      <div className="site-hero__inner">
        <div className="site-hero__top">
          <p className="admin-eyebrow">{eyebrow}</p>
          <h1 className="admin-h1 site-hero__title">{title}</h1>
        </div>
        {children && <div className="site-hero__lead">{children}</div>}
      </div>
    </section>
  )
}

// Knapp eller länk i Ljusrums stil. variant: "dark" eller "light".
export function SiteButton({ variant = 'dark', to, href, className = '', children, ...rest }) {
  const cls = `admin-btn admin-btn--${variant} site-btn ${className}`
  if (to) return <Link className={cls} to={to} {...rest}>{children}</Link>
  if (href) return <a className={cls} href={href} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}
