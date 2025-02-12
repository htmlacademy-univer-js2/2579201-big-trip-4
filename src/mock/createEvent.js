function getDetailedEvents(events, destinations, offers) {
  return events.map((event) => {
    const destination = destinations.find((dest) => dest.id === event.destination);
    const availableOffers = offers.find((offer) => offer.type === event.type)?.offers || [];
    const selectedOffers = availableOffers.filter((offer) => event.offers.includes(offer.id));
    return {
      ...event,
      destination,
      offers: selectedOffers,
    };

  });
}

function getAvailableOffers(event, offers){
  return offers.find((offer) => offer.type === event.type)?.offers || [];

}

export { getDetailedEvents, getAvailableOffers };
