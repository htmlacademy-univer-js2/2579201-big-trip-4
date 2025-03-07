import { getRandomNumber } from '../utils/utils';

const mockEvents = [
  {
    id: 'event1',
    type: 'taxi',
    destination: 'dest1',
    startDate: new Date('2019-12-25T16:00:00.000Z'),
    endDate: new Date('2019-12-25T16:30:00.000Z'),
    price: 500,
    isFavourite: false,
    offers: ['offer1', 'offer2']
  },
  {
    id: 'event2',
    type: 'flight',
    destination: 'dest2',
    startDate: new Date('2020-01-05T11:00:00.000Z'),
    endDate: new Date('2020-01-05T14:00:00.000Z'),
    price: 300,
    isFavourite: false,
    offers: ['offer4', 'offer5']
  },

  {
    id: 'event3',
    type: 'bus',
    destination: 'dest3',
    startDate: new Date('2022-01-05T11:00:00.000Z'),
    endDate: new Date('2022-01-29T11:00:00.000Z'),
    price: 200,
    isFavourite: true,
    offers: ['offer6', 'offer7']
  }
];


const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'offer1',
        title: 'Upgrade to business class',
        price: 50
      },
      {
        id: 'offer2',
        title: 'Add luggage',
        price: 20
      },
      {
        id: 'offer3',
        title: 'lorem ipsum',
        price: 20
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'offer4',
        title: 'Add meal',
        price: 15
      },
      {
        id: 'offer5',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'offer6',
        title: 'Add meal',
        price: 11
      },
      {
        id: 'offer7',
        title: 'Choose seats',
        price: 7
      }
    ]
  }
];


const mockDestinations = [
  {
    id: 'dest1',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    name: 'Geneva',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(10)}`,
        description: 'Geneva'
      }
    ]
  },
  {
    id: 'dest2',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(10)}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 'dest3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(10)}`,
        description: 'Amsterdam'
      }
    ]
  }
];

export {mockDestinations, mockEvents, mockOffers};
