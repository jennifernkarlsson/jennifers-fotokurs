import { Link } from '@tanstack/react-router'

// Bakåtlänk under toppmenyn (dator och surfplatta).
export function BackLink({ children, ...linkProps }) {
  return (
    <Link className="admin-back" {...linkProps}>
      <img src="/icons/arrow-left.svg" alt="" width="17" height="15" />
      <span>{children}</span>
    </Link>
  )
}

// Sidrubrik med liten överrubrik. På mobil döljs den visuellt men finns kvar för skärmläsare.
export function PageTitle({ eyebrow, title, hideOnMobile = false }) {
  return (
    <div className={'admin-title' + (hideOnMobile ? ' admin-title--mobile-hidden' : '')}>
      <p className="admin-eyebrow">{eyebrow}</p>
      <h1 className="admin-h1">{title}</h1>
    </div>
  )
}

// Knapp i fullbredd som används längst ned på mobil.
export function MobileButton({ variant = 'dark', children, ...linkProps }) {
  return (
    <Link className={'admin-btn admin-btn--' + variant} {...linkProps}>
      {children}
    </Link>
  )
}
