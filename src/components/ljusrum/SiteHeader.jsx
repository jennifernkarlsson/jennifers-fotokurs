import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

// Ett menyval som inte leder någonstans än (sidan finns inte i prototypen).
function Inactive({ children }) {
  return (
    <a href="#" className="admin-nav__item is-inactive" aria-disabled="true" onClick={(e) => e.preventDefault()}>
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

// Pil som bara visas i mobilmenyn.
function Arrow() {
  return <img className="admin-nav__arrow" src="/icons/arrow-right.svg" alt="" width="14" height="12" />
}

// Toppmeny för Ljusrum. variant="admin" används på arrangörens sidor, "site" på deltagarens.
// overlay=true ger vit text över en bild (mobilens startsida).
// På mobil (under 768 px) blir menyn en panel som fälls ner under toppmenyn.
export function SiteHeader({ variant = 'site', wide = false, overlay = false }) {
  const [open, setOpen] = useState(false)
  const isAdmin = variant === 'admin'
  const close = () => setOpen(false)

  // Stäng med Esc och lås sidan bakom medan menyn är öppen.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const icon = open ? 'close' : 'hamburger'

  return (
    <header
      className={
        'admin-header' +
        (wide ? ' admin-header--wide' : '') +
        (overlay ? ' admin-header--overlay' : '') +
        (open ? ' is-menu-open' : '')
      }
    >
      <div className="admin-header__bar">
        <Link
          to={isAdmin ? '/admin' : '/'}
          className="admin-logo"
          aria-label={isAdmin ? 'Ljusrum, till workshops' : 'Ljusrum, till startsidan'}
        >
          <img className="admin-logo__mark" src="/images/logo.png" alt="" width="52" height="42" />
          <span className="admin-logo__text">
            <span className="admin-logo__name">LJUSRUM</span>
            <span className="admin-logo__tagline">Fotostudio och workshops</span>
          </span>
        </Link>

        <button
          type="button"
          className="admin-menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          onClick={() => setOpen((v) => !v)}
        >
          <img src={`/icons/${icon}${overlay && !open ? '-white' : ''}.svg`} alt="" width="45" height="44" />
        </button>

        <nav id="site-nav" className={'admin-nav' + (open ? ' is-open' : '')} aria-label="Huvudmeny">
          <p className="admin-nav__eyebrow">{isAdmin ? 'ADMIN' : 'MENY'}</p>
          <div className="admin-nav__list" onClick={close}>
            {isAdmin ? (
              <>
                <Inactive>Hem</Inactive>
                <Link to="/admin" className="admin-nav__item">
                  <span>Workshops</span>
                  <Arrow />
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="admin-nav__item">
                  <span>Hem</span>
                  <Arrow />
                </Link>
                <Link to="/" hash="workshop" className="admin-nav__item">
                  <span>Workshops</span>
                  <Arrow />
                </Link>
              </>
            )}
            <Inactive>Inställningar</Inactive>
          </div>

        </nav>

        {/* Mörk slöja över sidan under menyn; tryck för att stänga. */}
        <div className={'admin-nav__backdrop' + (open ? ' is-open' : '')} onClick={close} aria-hidden="true" />
      </div>
    </header>
  )
}
