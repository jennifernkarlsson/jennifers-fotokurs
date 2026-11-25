import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { MobileHero, SiteBackLink, SiteButton, SiteHero, SitePage } from '../components/ljusrum/SiteParts'
import { course, workshops } from '../data/workshops'

export const Route = createFileRoute('/lediga-tider')({
  component: AvailableTimes,
  validateSearch: (search) => ({ tid: typeof search.tid === 'string' ? search.tid : undefined }),
  head: () => ({ meta: [{ title: 'Välj ett ledigt tillfälle · Ljusrum' }] }),
})

function AvailableTimes() {
  const { tid } = Route.useSearch()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(tid ?? '')
  const [showError, setShowError] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    if (!selected) {
      setShowError(true)
      return
    }
    navigate({ to: '/boka', search: { tid: selected } })
  }

  return (
    <SitePage className="times">
      <div className="admin-top">
        <SiteHeader />
        <SiteBackLink to="/" hash="workshop">Tillbaka till workshops</SiteBackLink>
      </div>

      <SiteHero image="/images/lediga-tider-hero.jpg" eyebrow="TIDSBOKNING" title="Välj ett ledigt tillfälle" className="only-wide-block">
        <p><strong>Workshop • {course.title}</strong></p>
        <p>{course.area} / {course.price}</p>
      </SiteHero>

      <MobileHero image="/images/lediga-tider-mobil.jpg" eyebrow="TIDSBOKNING" title="Välj en ledig tid">
        <p><strong>{course.title}</strong></p>
        <p>{course.area} / {course.price}</p>
      </MobileHero>

      <form className="site-card times-card" onSubmit={onSubmit} noValidate>
        <fieldset className="time-picker" aria-describedby={showError ? 'time-error' : undefined}>
          <legend className="time-picker__legend">
            <span className="only-wide">Lediga workshoptider</span>
            <span className="only-narrow mobile-sr-only">Välj en ledig tid</span>
          </legend>
          <div className="time-options">
          {workshops.map((w) => (
            <label key={w.id} className={'time-option' + (selected === w.id ? ' is-selected' : '')}>
              <input
                type="radio"
                name="tid"
                value={w.id}
                checked={selected === w.id}
                onChange={() => {}}
                onKeyDown={(e) => {
                  // Mellanslag på vald tid avmarkerar den även med tangentbordet.
                  if (e.key === ' ' && selected === w.id) {
                    e.preventDefault()
                    setSelected('')
                  }
                }}
                onClick={() => {
                  // Klick på en redan vald tid avmarkerar den, som i Figma-prototypen.
                  setSelected((current) => (current === w.id ? '' : w.id))
                  setShowError(false)
                }}
              />
              <span className="time-option__dot" aria-hidden="true">{selected === w.id ? '●' : '○'}</span>
              <span className="time-option__text">
                <span className="time-option__day">{w.dayShort}</span>
                <span className="time-option__sep">: </span>
                <span className="time-option__time">{w.time.replace(/ /g, '')}</span>
              </span>
            </label>
          ))}
          </div>
          {showError && (
            <p id="time-error" className="form-error" role="alert">Välj en tid för att gå vidare.</p>
          )}
        </fieldset>

        <div className="site-buttons site-buttons--row">
          <SiteButton variant="light" to="/">Gå till startsidan</SiteButton>
          <SiteButton type="submit">
            Granska bokning
          </SiteButton>
        </div>
      </form>
    </SitePage>
  )
}
