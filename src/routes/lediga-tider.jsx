import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { SiteBackLink, SiteButton, SiteHero, SitePage } from '../components/ljusrum/SiteParts'
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
        <p><strong>{course.title}</strong></p>
        <p>{course.area} / {course.price}</p>
      </SiteHero>

      {/* Mobil: rubrik och bild ovanför tidsvalet */}
      <div className="times-intro only-narrow-block">
        <h1 className="times-intro__title">{course.title}</h1>
        <p className="times-intro__meta">{course.area}  / {course.price}</p>
        <div className="times-intro__image" style={{ backgroundImage: 'url(/images/kurs-workshop.jpg)' }} aria-hidden="true" />
      </div>

      <form className="site-card times-card" onSubmit={onSubmit} noValidate>
        <fieldset className="time-picker" aria-describedby={showError ? 'time-error' : undefined}>
          <legend className="time-picker__legend">
            <span className="only-wide">Välj en ledig tid</span>
            <span className="only-narrow">Välj en ledig tid:</span>
          </legend>
          {workshops.map((w) => (
            <label key={w.id} className={'time-option' + (selected === w.id ? ' is-selected' : '')}>
              <input
                type="radio"
                name="tid"
                value={w.id}
                checked={selected === w.id}
                onChange={() => {
                  setSelected(w.id)
                  setShowError(false)
                }}
              />
              <span className="time-option__dot" aria-hidden="true">{selected === w.id ? '●' : '○'}</span>
              <span>{w.optionLabel}</span>
            </label>
          ))}
          {showError && (
            <p id="time-error" className="form-error" role="alert">Välj en tid för att gå vidare.</p>
          )}
        </fieldset>

        <div className="site-buttons site-buttons--row">
          <SiteButton variant="light" to="/">Gå till startsidan</SiteButton>
          <SiteButton type="submit">
            <span className="only-wide">Granska tider</span>
            <span className="only-narrow">Granska bokning</span>
          </SiteButton>
        </div>
      </form>
    </SitePage>
  )
}
