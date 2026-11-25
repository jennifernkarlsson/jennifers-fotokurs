import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { SiteBackLink, SiteButton, SitePage } from '../components/ljusrum/SiteParts'
import { course, getWorkshop } from '../data/workshops'
import { lastBooking } from '../data/bookingStore'

export const Route = createFileRoute('/bekraftelse')({
  component: BookingConfirmation,
  head: () => ({ meta: [{ title: 'Din workshop är bokad · Ljusrum' }] }),
})

function BookingConfirmation() {
  const [booking, setBooking] = useState(() => lastBooking())
  useEffect(() => setBooking(lastBooking()), [])
  const workshop = booking && getWorkshop(booking.workshopId)

  return (
    <SitePage className="done">
      <div className="admin-top">
        <SiteHeader />
        <SiteBackLink to="/">Till startsidan</SiteBackLink>
      </div>

      {!workshop ? (
        <div className="site-card site-card--narrow">
          <h1 className="admin-h2">Ingen bokning hittades</h1>
          <p className="site-text">Välj ett workshoptillfälle för att göra en bokning.</p>
          <SiteButton to="/lediga-tider">Se lediga tider</SiteButton>
        </div>
      ) : (
        <div className="site-card done-card">
          <div className="done-box" role="status">
            <img src="/icons/verified.svg" alt="" width="61" height="61" />
            <h1 className="done-box__title">Din workshop är bokad!</h1>
            <p className="done-box__number">Bokningsnummer #{booking.id}</p>
            <p>
              Workshop<span className="only-wide"> • </span><span className="only-narrow">: </span>{course.title}
            </p>
            <p>
              <span className="date-long">{workshop.date}</span><span className="date-short">{workshop.dateShort}</span> • {workshop.time}
            </p>
          </div>

          <div className="detail-block">
            <h2>Förbered dig inför workshopen</h2>
            <ul className="site-list">
              <li>Ta med egen kamera där du kan ställa in bländare, slutare och ISO.</li>
              <li>Ta med laddade batterier och minneskort.</li>
              <li>Glöm ej kläder efter väder.</li>
              <li>Lunch ingår ej.</li>
            </ul>
          </div>

          <SiteButton to="/" className="done-card__button">Gå till startsidan</SiteButton>
        </div>
      )}
    </SitePage>
  )
}
