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
                  {workshop.dayLabel.replace(/ \d{4}$/, "")}
                  <span className="only-narrow">{workshop.dayLabel.match(/ \d{4}$/)?.[0]}</span>
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

          <div className="summary__stats">
            <Stat icon="/images/booked.png" iconWidth={127} iconHeight={74} value={booked} label="Antal bokade" />
            <Stat icon="/images/seats.png" iconWidth={109} iconHeight={73} value={free} label="Lediga platser" />
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

function Stat({ icon, iconWidth, iconHeight, value, label }) {
  return (
    <div className="stat">
      <img className="stat__icon" src={icon} alt="" width={iconWidth} height={iconHeight} />
      <img className="stat__divider" src="/icons/divider.svg" alt="" width="72" height="2" />
      <p className="stat__value">{value}</p>
      <p className="stat__label">{label}</p>
    </div>
  )
}
