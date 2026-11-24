import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { SiteBackLink, SiteButton, SiteHero, SitePage } from '../components/ljusrum/SiteParts'
import { course, getWorkshop } from '../data/workshops'
import { saveBooking } from '../data/bookingStore'

export const Route = createFileRoute('/boka')({
  component: ConfirmBooking,
  validateSearch: (search) => ({ tid: typeof search.tid === 'string' ? search.tid : undefined }),
  head: () => ({ meta: [{ title: 'Slutför din bokning · Ljusrum' }] }),
})

const fields = [
  { name: 'name', label: 'Namn', type: 'text', autoComplete: 'name', error: 'Fyll i ditt namn.' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', error: 'Fyll i en giltig e-postadress.' },
  { name: 'phone', label: 'Telefon', type: 'tel', autoComplete: 'tel', error: 'Fyll i ditt telefonnummer.' },
]

function ConfirmBooking() {
  const { tid } = Route.useSearch()
  const navigate = useNavigate()
  const workshop = tid && getWorkshop(tid)
  const [values, setValues] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})

  function validate(v) {
    const e = {}
    if (!v.name.trim()) e.name = true
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = true
    if (v.phone.replace(/\D/g, '').length < 6) e.phone = true
    return e
  }

  function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById('field-' + Object.keys(found)[0])?.focus()
      return
    }
    saveBooking({ workshopId: workshop.id, ...values })
    navigate({ to: '/bekraftelse' })
  }

  return (
    <SitePage className="book">
      <div className="admin-top">
        <SiteHeader />
        <SiteBackLink to="/lediga-tider" search={{ tid }}>Tillbaka till lediga tider</SiteBackLink>
      </div>

      <SiteHero image="/images/bokning-hero.jpg" eyebrow="BOKNING" title="Slutför din bokning" className="only-wide-block">
        <p>Fyll i dina kontaktuppgifter och bekräfta din plats på workshopen.</p>
      </SiteHero>

      {!workshop ? (
        <div className="site-card site-card--narrow">
          <h2 className="admin-h2">Välj en tid först</h2>
          <p className="site-text">Du behöver välja ett workshoptillfälle innan du kan boka.</p>
          <SiteButton to="/lediga-tider">Se lediga tider</SiteButton>
        </div>
      ) : (
        <form className="site-card book-card" onSubmit={onSubmit} noValidate>
          <aside className="book-summary" aria-label="Din valda workshop">
            <p className="book-summary__label">
              Din valda workshop<span className="only-narrow">:</span>
            </p>
            <div className="book-summary__body">
              <p className="book-summary__title">{course.title}</p>
              <div>
                <p>{workshop.numericDate}: {workshop.time}</p>
                <p>
                  {course.area}
                  <span className="only-narrow"> / {course.price}</span>
                </p>
                <p className="only-wide-block">{course.price}</p>
                <p>Betala på plats i fotostudion</p>
              </div>
            </div>
          </aside>

          <div className="book-form">
            <h2 className="admin-h2 book-form__title only-wide-block">Fyll i dina kontaktuppgifter</h2>
            <h1 className="mobile-sr-title">Slutför din bokning</h1>
            <div className="book-fields">
              {fields.map((f) => (
                <div key={f.name} className="field">
                  <label htmlFor={'field-' + f.name}>
                    {f.label}
                    <span className="only-wide">:</span>
                  </label>
                  <input
                    id={'field-' + f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    value={values[f.name]}
                    aria-invalid={errors[f.name] ? 'true' : undefined}
                    aria-describedby={errors[f.name] ? 'error-' + f.name : undefined}
                    onChange={(e) => {
                      setValues({ ...values, [f.name]: e.target.value })
                      if (errors[f.name]) setErrors({ ...errors, [f.name]: false })
                    }}
                  />
                  {errors[f.name] && (
                    <p id={'error-' + f.name} className="form-error">{f.error}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="site-buttons book-buttons">
              <SiteButton variant="light" to="/lediga-tider" search={{ tid }} className="site-btn--semibold">
                Ändra tid
              </SiteButton>
              <SiteButton type="submit" className="site-btn--semibold">
                Bekräfta bokning
              </SiteButton>
            </div>
          </div>
        </form>
      )}
    </SitePage>
  )
}
