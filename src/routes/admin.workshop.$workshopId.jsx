import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { BackLink, MobileButton, PageTitle } from '../components/ljusrum/AdminParts'
import { getWorkshop, getBookingsFor, bookedCount } from '../data/workshops'

export const Route = createFileRoute('/admin/workshop/$workshopId')({
  component: BookingOverview,
  head: () => ({ meta: [{ title: 'Bokningsöversikt · Ljusrum admin' }] }),
})

function BookingOverview() {
  const { workshopId } = Route.useParams()
  const workshop = getWorkshop(workshopId)

  if (!workshop) {
    return (
      <div className="admin-page">
        <SiteHeader variant="admin" />
        <div className="admin-container">
          <h1 className="admin-h1">Workshoppen finns inte</h1>
          <Link to="/admin">Tillbaka till workshops</Link>
        </div>
      </div>
    )
  }

  const participants = getBookingsFor(workshop.id)
  const booked = bookedCount(workshop.id)
  const free = workshop.capacity - booked

  return (
    <div className="admin-page">
      <div className="admin-top">
        <SiteHeader variant="admin" />
        <BackLink to="/admin">Ändra vald workshop</BackLink>
      </div>

      <PageTitle eyebrow="WORKSHOPS" title="Bokningsöversikt" />

      <section className="admin-container" aria-labelledby="workshop-title">
        <div className="summary">
          <div className="summary__info">
            <h2 id="workshop-title" className="admin-h2">{workshop.title}</h2>
            <ul className="info-list info-list--large">
              <li>
                <img src="/icons/calendar.svg" alt="" width="30" height="30" />
                <span>
                  {workshop.date}
                </span>
              </li>
              <li>
                <img src="/icons/clock.svg" alt="" width="30" height="30" />
                <span>{workshop.time}</span>
              </li>
              <li>
                <img src="/icons/pin.svg" alt="" width="34" height="34" />
                <span>{workshop.place}</span>
              </li>
            </ul>
          </div>

          {/* Ren information, ingen kortform: siffror, etiketter och en beläggningsstapel */}
          <div className="summary__stats">
            <Stat value={booked} label="bokade" />
            <span className="stat-sep" aria-hidden="true" />
            <Stat value={free} label={`lediga av ${workshop.capacity}`} />
            <div
              className="stat-bar"
              role="img"
              aria-label={`${booked} av ${workshop.capacity} platser bokade`}
            >
              <div style={{ width: `${Math.round((booked / workshop.capacity) * 100)}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="admin-container participants" aria-labelledby="participants-title">
        <h2 id="participants-title" className="admin-h2">Deltagare</h2>
        <table className="participants-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="only-wide">Boknings-ID</span>
                <span className="only-narrow">ID</span>
              </th>
              <th scope="col" className="col-count">Antal</th>
              <th scope="col">Namn</th>
              <th scope="col" className="col-email">E-post</th>
              <th scope="col" className="col-action"><span className="visually-hidden">Åtgärd</span></th>
            </tr>
          </thead>
          <tbody>
            {participants.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td className="col-count">{b.count}</td>
                <td>{b.name}</td>
                <td className="col-email">{b.email}</td>
                <td className="col-action">
                  <Link
                    className="text-link"
                    to="/admin/bokning/$bookingId"
                    params={{ bookingId: b.id }}
                    aria-label={`Visa bokning ${b.id}, ${b.name}`}
                  >
                    <span className="only-wide">Visa bokning</span>
                    <span className="only-narrow">Visa mer</span>
                    <img src="/icons/arrow-right.svg" alt="" width="9" height="8" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="admin-mobile-actions">
        <MobileButton to="/admin" variant="light">Tillbaka till workshops</MobileButton>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <p className="stat__value">{value}</p>
      <p className="stat__label">{label}</p>
    </div>
  )
}
