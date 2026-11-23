import { createFileRoute, Link } from '@tanstack/react-router'
import { AdminHeader } from '../components/admin/AdminHeader'
import { workshops, bookedCount } from '../data/workshops'

export const Route = createFileRoute('/admin/')({
  component: WorkshopOverview,
  head: () => ({ meta: [{ title: 'Kommande workshops · Ljusrum admin' }] }),
})

function WorkshopOverview() {
  return (
    <div className="admin-page admin-page--home">
      <div className="admin-top">
        <AdminHeader wide />
        <section className="admin-hero" aria-labelledby="hero-title">
          <div className="admin-hero__text">
            <p className="admin-eyebrow admin-hero__eyebrow">WORKSHOPS</p>
            <h1 id="hero-title" className="admin-h1 admin-hero__title">
              Kommande <br className="admin-hero__break" /><span className="admin-hero__foto">foto</span>workshops
            </h1>
            <p className="admin-hero__lead">
              Få överblick över kommande workshops. Välj ett tillfälle för att se bokningsöversikt och deltagare
            </p>
            <a className="admin-btn admin-btn--dark admin-hero__cta" href="#workshoplista">
              Se kommande workshops
            </a>
          </div>
        </section>
      </div>

      <ul className="workshop-list" id="workshoplista" aria-label="Kommande workshops">
        {workshops.map((w) => (
          <li key={w.id}>
            <WorkshopRow workshop={w} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function WorkshopRow({ workshop }) {
  const booked = bookedCount(workshop.id)
  return (
    <Link
      to="/admin/workshop/$workshopId"
      params={{ workshopId: workshop.id }}
      className="workshop-row"
    >
      <div
        className="workshop-row__image"
        style={{ backgroundImage: `url(${workshop.image})` }}
        aria-hidden="true"
      />
      <div className="workshop-row__info">
        <h2 className="admin-h2">{workshop.title}</h2>
        <ul className="info-list">
          <li>
            <img src="/icons/calendar-small.svg" alt="" width="25" height="26" />
            <span>{workshop.dayLabel}</span>
          </li>
          <li>
            <img src="/icons/clock-small.svg" alt="" width="24" height="24" />
            <span>{workshop.time}</span>
          </li>
          <li className="info-list__muted">
            <img src="/icons/check.svg" alt="" width="25" height="25" />
            <span>{booked} / {workshop.capacity} platser bokade</span>
          </li>
        </ul>
      </div>
      <span className="workshop-row__chevron" aria-hidden="true">
        <img src="/icons/chevron-right.svg" alt="" width="68" height="60" />
      </span>
      <span className="admin-btn admin-btn--dark workshop-row__button">Visa bokningsöversikt</span>
    </Link>
  )
}
