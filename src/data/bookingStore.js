import { bookings } from './workshops'

// Prototypens bokningar sparas bara i webbläsarens flik (sessionStorage).
// Inget skickas någonstans, och arrangörens vy visar fortfarande exempeldatan.
const KEY = 'ljusrum-senaste-bokning'
let memory = null

export function saveBooking({ workshopId, name, email, phone }) {
  const used = bookings.map((b) => Number(b.id.slice(1)))
  const id = 'L' + (Math.max(...used) + 1 + Math.floor(Math.random() * 20))
  const booking = { id, workshopId, name, email, phone }
  memory = booking
  try {
    sessionStorage.setItem(KEY, JSON.stringify(booking))
  } catch {
    // Lagring kan vara avstängd; minnet räcker för en sidövergång.
  }
  return booking
}

export function lastBooking() {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Ignorera och använd minnet.
  }
  return memory
}
