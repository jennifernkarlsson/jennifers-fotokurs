// Exempeldata för prototypen. Värdena kommer från Figma-designen.
export const course = {
  title: 'Ta kontroll över din kamera',
  area: 'Södermalm, Stockholm',
  price: '1200 SEK',
}

export const workshops = [
  {
    id: '14-november',
    title: 'Ta kontroll över din kamera',
    dayLabel: 'Lördag 14 november 2026',
    shortDate: '14 november 2026',
    numericDate: '14/11/2026',
    optionLabel: '14 november: 10:00-15:00',
    dayShort: '14 november',
    time: '10:00 - 15:00',
    place: 'Ljusrums fotostudio',
    capacity: 10,
    image: '/images/workshop-1.jpg',
  },
  {
    id: '21-november',
    title: 'Ta kontroll över din kamera',
    dayLabel: 'Lördag 21 november 2026',
    shortDate: '21 november 2026',
    numericDate: '21/11/2026',
    optionLabel: '21 november: 10:00-15:00',
    dayShort: '21 november',
    time: '10:00 - 15:00',
    place: 'Ljusrums fotostudio',
    capacity: 10,
    image: '/images/workshop-2.jpg',
  },
  {
    id: '28-november',
    title: 'Ta kontroll över din kamera',
    dayLabel: 'Lördag 28 november 2026',
    shortDate: '28 november 2026',
    numericDate: '28/11/2026',
    optionLabel: '28 november: 10:00-15:00',
    dayShort: '28 november',
    time: '10:00 - 15:00',
    place: 'Ljusrums fotostudio',
    capacity: 10,
    image: '/images/workshop-3.jpg',
  },
]

export const bookings = [
  { id: 'L101', workshopId: '14-november', name: 'Alma Lind', email: 'alma.lind@example.com', count: 1, bookedAt: '27 september 2026, 12:18' },
  { id: 'L102', workshopId: '14-november', name: 'Robin Berg', email: 'robin.berg@example.com', count: 1, bookedAt: '2 oktober 2026, 09:41' },
  { id: 'L103', workshopId: '14-november', name: 'Sam Ek', email: 'sam.ek@example.com', count: 1, bookedAt: '15 oktober 2026, 19:07' },
  { id: 'L104', workshopId: '21-november', name: 'Kim Dahl', email: 'kim.dahl@example.com', count: 1, bookedAt: '20 oktober 2026, 22:53' },
  { id: 'L105', workshopId: '21-november', name: 'Alex Holm', email: 'alex.holm@example.com', count: 1, bookedAt: '24 oktober 2026, 08:30' },
  { id: 'L106', workshopId: '28-november', name: 'Noor Lund', email: 'noor.lund@example.com', count: 1, bookedAt: '29 oktober 2026, 13:45' },
]

export function getWorkshop(id) {
  return workshops.find((w) => w.id === id)
}

export function getBooking(id) {
  return bookings.find((b) => b.id === id)
}

export function getBookingsFor(workshopId) {
  return bookings.filter((b) => b.workshopId === workshopId)
}

export function bookedCount(workshopId) {
  return getBookingsFor(workshopId).reduce((sum, b) => sum + b.count, 0)
}
