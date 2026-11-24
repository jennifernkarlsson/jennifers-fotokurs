import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '../components/ljusrum/SiteHeader'
import { SiteButton, SitePage } from '../components/ljusrum/SiteParts'
import { course } from '../data/workshops'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({ meta: [{ title: 'Ljusrum · Fotoworkshops' }] }),
})

function Home() {
  return (
    <SitePage className="home">
      <div className="home-top">
        <SiteHeader overlay />
        <section className="home-hero" aria-labelledby="home-title">
          {/* Texterna skiljer sig mellan dator och mobil i Figma. */}
          <div className="home-hero__text">
            <p className="admin-eyebrow only-wide">WORKSHOPS</p>
            <h1 id="home-title" className="admin-h1 home-hero__title">
              <span className="only-wide">Utveckla ditt fotograferande</span>
              <span className="only-narrow">Workshops för fotografer</span>
            </h1>
            <p className="home-hero__lead">
              <span className="only-wide">
                Välj bland våra workshops inom kreativ fotografering, ljussättning och bildredigering
              </span>
              <span className="only-narrow">
                Utforska fotografins möjligheter genom kreativa fotoworkshops, utformade för att inspirera och
                utveckla fotografer på alla nivåer
              </span>
            </p>
            <SiteButton href="#workshop" className="home-hero__cta only-narrow">Se alla workshops</SiteButton>
          </div>
        </section>
      </div>

      <section className="course" id="workshop" aria-labelledby="course-title">
        <div className="course__card">
          <div
            className="course__image"
            style={{ backgroundImage: 'url(/images/kurs-workshop.jpg)' }}
            role="img"
            aria-label="Deltagare fotograferar i studion"
          />
          <div className="course__info">
            <div className="course__heading">
              <h2 id="course-title" className="admin-h2">{course.title}</h2>
              <p className="course__meta">{course.area}  / {course.price}</p>
            </div>
            <div className="course__text">
              <p>
                En workshop för vuxna nybörjare som vill komma vidare från autoläget. Dagen innehåller korta
                genomgångar och praktiska fotoövningar, både inne och ute.
              </p>
              <p>
                Deltagare får öva på bländare, slutartid, ISO, fokus, ljus och komposition. Inga tidigare
                fotokunskaper behövs.
              </p>
              <p>Gruppstorlek: Max 10 deltagare</p>
            </div>
            <div className="site-buttons">
              <SiteButton variant="light" href="#las-mer">
                <span className="only-wide">Läs mer om workshop</span>
                <span className="only-narrow">Läs mer om workshopen</span>
              </SiteButton>
              <SiteButton to="/lediga-tider">Se lediga tider</SiteButton>
            </div>
          </div>
        </div>

        <div className="course__more" id="las-mer">
          <div className="course__details">
            <div className="detail-block">
              <h3>Plats</h3>
              <p>Ljusrums fotostudio på Södermalm. Workshopen kommer pågå både inomhus i studion samt utomhus i närområdet.</p>
            </div>
            <div className="detail-block">
              <h3>Det här ingår i workshopen</h3>
              <ul className="site-list">
                <li>Handledning</li>
                <li>Övningsmaterial</li>
                <li>Fika</li>
                <li>Lunch ingår inte</li>
              </ul>
            </div>
            <div className="detail-block">
              <h3>Tid</h3>
              <p>Varje workshoptillfälle är 5 timmar långt.</p>
            </div>
            <div className="detail-block">
              <h3>Kamerakrav</h3>
              <p>
                Du behöver ta med en egen kamera, där det går att ställa in bländare, slutartid och ISO. Mobilkamera
                räcker inte. Extra objektiv och stativ behövs inte.
              </p>
            </div>
            <SiteButton to="/lediga-tider">Se lediga tider</SiteButton>
          </div>
          <div
            className="course__map"
            style={{ backgroundImage: 'url(/images/karta.jpg)' }}
            role="img"
            aria-label="Karta över Södermalm med Ljusrums fotostudio på Bondegatan 45"
          />
        </div>
      </section>
    </SitePage>
  )
}
