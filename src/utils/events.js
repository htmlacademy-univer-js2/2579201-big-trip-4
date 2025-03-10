function getDetailedEvent(event, destinations, offers) {
  const destination = destinations.find((dest) => dest.id === event.destination);
  const availableOffers = offers.find((offer) => offer.type === event.type)?.offers || [];
  const selectedOffers = availableOffers.filter((offer) => event.offers.includes(offer.id));
  return {
    ...event,
    destination,
    offers: selectedOffers,
  };


}

function getAvailableOffers(type, offers){
  return offers.find((offer) => offer.type === type)?.offers || [];
}

function getDestinationByName(destinationName, destinations){
  return destinations.find((dest)=> dest.name === destinationName);
}

function getOfferById(offerId, allOffers){
  return allOffers.find((offer)=> offer.id === offerId);
}
export { getDetailedEvent, getAvailableOffers, getDestinationByName, getOfferById };
