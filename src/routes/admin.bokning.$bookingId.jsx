import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { BackLink, MobileButton, PageTitle } from '../components/ljusrum/AdminParts'
import { getBooking, getWorkshop } from '../data/workshops'

export const Route = createFileRoute('/admin/bokning/$bookingId')({
  component: BookingDetails,
  head: () => ({ meta: [{ title: 'Bokningsdetaljer · Ljusrum admin' }] }),
})

function BookingDetails() {
  const { bookingId } = Route.useParams()
  const booking = getBooking(bookingId)
  const workshop = booking && getWorkshop(booking.workshopId)

  if (!booking || !workshop) {
    return (
      <div className="admin-page">
        <SiteHeader variant="admin" />
        <div className="admin-container">
          <h1 className="admin-h1">Bokningen finns inte</h1>
          <Link to="/admin">Tillbaka till workshops</Link>
        </div>
      </div>
    )
  }

  const rows = [
    ['Namn', booking.name],
    ['E-post', booking.email],
    ['Workshop', workshop.title],
    ['Bokat workshoptillfälle', `${workshop.shortDate}, ${workshop.time.replace(/ /g, '')}`],
    ['Antal', booking.count],
    ['Bokningsnummer', `#${booking.id}`],
    ['Bokningsdatum', booking.bookedAt],
  ]
  const overview = { to: '/admin/workshop/$workshopId', params: { workshopId: workshop.id } }

  return (
    <div className="admin-page admin-page--detail">
      <div className="admin-top">
        <SiteHeader variant="admin" />
        <BackLink {...overview}>Tillbaka till bokningsöversikt</BackLink>
      </div>

      <PageTitle eyebrow="WORKSHOPS" title="Bokningsdetaljer" hideOnMobile />

      <section className="admin-container" aria-labelledby="booking-title">
        <div className="detail-card">
          <h2 id="booking-title" className="detail-card__title admin-h2">Bokning #{booking.id}</h2>
          <dl className="detail-list">
            {rows.map(([label, value]) => (
              <div key={label} className="detail-list__row">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="admin-mobile-actions admin-mobile-actions--stack">
        <MobileButton {...overview} variant="light">Tillbaka till bokningsöversikt</MobileButton>
        <MobileButton to="/admin" variant="dark">Gå till startsida</MobileButton>
      </div>
    </div>
  )
}
