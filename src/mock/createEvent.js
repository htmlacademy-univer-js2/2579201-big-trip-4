import { mockEvents, mockDestinations, mockOffers } from './event';

function getDetailedEvents() {
  return mockEvents.map((event) => {
    const destination = mockDestinations.find((dest) => dest.id === event.destination);
    const availableOffers = mockOffers.find((offer) => offer.type === event.type)?.offers || [];
    const selectedOffers = availableOffers.filter((offer) => event.offers.includes(offer.id));
    return {
      ...event,
      destination,
      offers: selectedOffers,
    };

  });
}

function getAvailableOffers(event){
  return mockOffers.find((offer) => offer.type === event.type)?.offers || [];

}

export { getDetailedEvents, getAvailableOffers };
