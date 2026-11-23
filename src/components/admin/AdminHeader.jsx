import { useState } from 'react'
import { Link } from '@tanstack/react-router'

// Toppmeny för arrangörens vy. På mobil visas en hamburgermeny.
export function AdminHeader({ wide = false }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={'admin-header' + (wide ? ' admin-header--wide' : '')}>
      <div className="admin-header__bar">
        <Link to="/admin" className="admin-logo" aria-label="Ljusrum, till workshops">
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
          aria-controls="admin-nav"
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          onClick={() => setOpen((v) => !v)}
        >
          <img src="/icons/hamburger.svg" alt="" width="45" height="44" />
        </button>

        <nav
          id="admin-nav"
          className={'admin-nav' + (open ? ' is-open' : '')}
          aria-label="Adminmeny"
          onClick={() => setOpen(false)}
        >
          <Link to="/">Hem</Link>
          <Link to="/admin">Workshops</Link>
          <a href="#" aria-disabled="true" onClick={(e) => e.preventDefault()}>Inställningar</a>
        </nav>
      </div>
    </header>
  )
}
