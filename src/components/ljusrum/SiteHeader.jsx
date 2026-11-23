import { useState } from 'react'
import { Link } from '@tanstack/react-router'

// Ett menyval som inte leder någonstans än (sidan finns inte i prototypen).
function Inactive({ children }) {
  return (
    <a href="#" aria-disabled="true" onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  )
}

// Toppmeny för Ljusrum. variant="admin" används på arrangörens sidor, "site" på deltagarens.
// overlay=true ger vit text över en bild (mobilens startsida).
export function SiteHeader({ variant = 'site', wide = false, overlay = false }) {
  const [open, setOpen] = useState(false)
  const isAdmin = variant === 'admin'

  return (
    <header
      className={
        'admin-header' + (wide ? ' admin-header--wide' : '') + (overlay ? ' admin-header--overlay' : '')
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
          <img src={overlay ? '/icons/hamburger-white.svg' : '/icons/hamburger.svg'} alt="" width="45" height="44" />
        </button>

        <nav
          id="site-nav"
          className={'admin-nav' + (open ? ' is-open' : '')}
          aria-label="Huvudmeny"
          onClick={() => setOpen(false)}
        >
          {isAdmin ? (
            <>
              <Inactive>Hem</Inactive>
              <Link to="/admin">Workshops</Link>
            </>
          ) : (
            <>
              <Link to="/">Hem</Link>
              <Link to="/" hash="workshop">Workshops</Link>
            </>
          )}
          <Inactive>Inställningar</Inactive>
        </nav>
      </div>
    </header>
  )
}
