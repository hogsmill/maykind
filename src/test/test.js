
import bus from '../socket.js'

const _properties = [
  {
    active: false,
    address: {
      number: 1,
      street: 'Cheyne Hill',
      postcode1: 'KT5 8BL',
      postcode2: '8BL'
    },
    status: {
      type: 'Sale',
      status: 'For Sale',
      international: false
    },
    descriptions: {
      shortdescription: 'Nice house in a nice street',
      description: 'A wonderful, large two double bedroom apartment on 3rd floor of this smart purpose-built block for residents over 60 years. The apartment is light and airy with south facing viewings overlooking the Fishponds Park and main entrance to the property. On entering the apartment, the hallway leads to the first of the two sunny bedrooms on the right. A cupboard in the hall acts as cloakroom and storage space. The main bedroom is a large double with wonderful views of the park and trees. There is plenty of room for a king-sized bed, wardrobes, and furniture. The shower room boasts a large shower, toilet, and basin and plenty of room to move around. A well-designed kitchen off the lounge can be closed off with glass doors. It has everything you need in terms of appliances, all presented in very good order. The open lounge offers ample room for relaxing in front of the tv (broadband available) and a fabulously bright space for dining table and chairs, where residents can take in the amazing views. This delightful two-bedroom flat is decorated to a high standard throughout, with fresh neutral colours and quality carpets.',
      location: 'The development is situated on a main bus route with Surbiton, Kingston and Tolworth only a short bus ride away and the local library within walking distance. Kingfisher Court is a quiet oasis amidst a busy suburban environment. Surbiton is the ideal location for those seeking easy access into London and beyond, with its excellent train service, notably the fast train to London in under 20 minutes. The town centre has many high-street shops such as M&S, Sainsbury`s and Waitrose as well as banks, Post Office, restaurants, coffee shops and even a modern hotel. Often forgotten is Surbiton"s River Thames frontage, facing Home Park and offering and riverside walk to Kingston Town Centre with a café break en-route.',
      additional: 'A care system is catered for with a new pull chord system in place in every room, for your peace of mind. The flat comes with one parking space available. The block itself is well maintained and managed, with regular window cleaning, gardening and lift maintenance plus the house manager is on hand, working on site 9-5pm daily. A residents" lounge offers a change of scene, social interaction with activities on offer and potential to host your guests. There is also a guest flat available for overnight visitors for a small charge. The laundry room has four washing machines, included for residents" use in the service charge. It is well maintained and often a meeting point for a catch up and chat. A care system is catered for with a new pull chord system in place in every room, for your peace of mind. The flat comes with one parking space available. The block itself is well maintained and managed, with regular window cleaning, gardening and lift maintenance plus the house manager is on hand, working on site 9-5pm daily. A residents" lounge offers a change of scene, social interaction with activities on offer and potential to host your guests. There is also a guest flat available for overnight visitors for a small charge. The laundry room has four washing machines, included for residents" use in the service charge. It is well maintained and often a meeting point for a catch up and chat.'
    },
    details: {
      type: 'House',
      subtype: 'Semi-detached',
      bedrooms: 3,
      bathrooms: 2,
      receptions: 2,
      garage: false,
      offstreetparking: true,
    },
    highlights: [
      'Near a school',
      'Good rails links',
      'Cool Summer house'
    ],
    price: {
      type: 'Guide Price',
      amount: 100000
    },
    lease: {
      freehold: true,
      leaselength: 0,
    },
    runningcosts: {
      groundrent: {
        amount: 0,
        frequency: ''
      },
      servicecharge: {
        amount: 0,
        frequency: ''
      },
      counciltaxband: 'E'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
    floorplan: 'floorplan.jpg',
    epc: 'epc-bar-chart.png',
    links: {
      rightmove: ''
    }
  },
  {
    active: false,
    address: {
      number: 42,
      street: 'Kingfisher Court',
      postcode1: 'KT9',
      postcode2: '4BX'
    },
    status: {
      type: 'Rental',
      status: 'For Sale',
      international: false
    },
    descriptions: {
      shortdescription: 'Nice house in a nice street',
      description: 'A wonderful, large two double bedroom apartment on 3rd floor of this smart purpose-built block for residents over 60 years. The apartment is light and airy with south facing viewings overlooking the Fishponds Park and main entrance to the property. On entering the apartment, the hallway leads to the first of the two sunny bedrooms on the right. A cupboard in the hall acts as cloakroom and storage space. The main bedroom is a large double with wonderful views of the park and trees. There is plenty of room for a king-sized bed, wardrobes, and furniture. The shower room boasts a large shower, toilet, and basin and plenty of room to move around. A well-designed kitchen off the lounge can be closed off with glass doors. It has everything you need in terms of appliances, all presented in very good order. The open lounge offers ample room for relaxing in front of the tv (broadband available) and a fabulously bright space for dining table and chairs, where residents can take in the amazing views. This delightful two-bedroom flat is decorated to a high standard throughout, with fresh neutral colours and quality carpets.',
      location: 'The development is situated on a main bus route with Surbiton, Kingston and Tolworth only a short bus ride away and the local library within walking distance. Kingfisher Court is a quiet oasis amidst a busy suburban environment. Surbiton is the ideal location for those seeking easy access into London and beyond, with its excellent train service, notably the fast train to London in under 20 minutes. The town centre has many high-street shops such as M&S, Sainsbury`s and Waitrose as well as banks, Post Office, restaurants, coffee shops and even a modern hotel. Often forgotten is Surbiton"s River Thames frontage, facing Home Park and offering and riverside walk to Kingston Town Centre with a café break en-route.',
      additional: 'A care system is catered for with a new pull chord system in place in every room, for your peace of mind. The flat comes with one parking space available. The block itself is well maintained and managed, with regular window cleaning, gardening and lift maintenance plus the house manager is on hand, working on site 9-5pm daily. A residents" lounge offers a change of scene, social interaction with activities on offer and potential to host your guests. There is also a guest flat available for overnight visitors for a small charge. The laundry room has four washing machines, included for residents" use in the service charge. It is well maintained and often a meeting point for a catch up and chat. A care system is catered for with a new pull chord system in place in every room, for your peace of mind. The flat comes with one parking space available. The block itself is well maintained and managed, with regular window cleaning, gardening and lift maintenance plus the house manager is on hand, working on site 9-5pm daily. A residents" lounge offers a change of scene, social interaction with activities on offer and potential to host your guests. There is also a guest flat available for overnight visitors for a small charge. The laundry room has four washing machines, included for residents" use in the service charge. It is well maintained and often a meeting point for a catch up and chat.'
    },
    details: {
      type: 'Flat',
      subtype: '1st Floor',
      bedrooms: 2,
      bathrooms: 1,
      receptions: 1,
      garage: false,
      offstreetparking: true,
    },
    highlights: [
      'Near a school',
      'Good rails links',
      'Cool Summer house'
    ],
    price: {
      type: '',
      amount: 1200,
      rentalfrequency: 'Month'
    },
    lease: {
      freehold: false,
      leaselength: 999,
    },
    runningcosts: {
      groundrent: {
        amount: 0,
        frequency: ''
      },
      servicecharge: {
        amount: 0,
        frequency: ''
      },
      counciltaxband: 'E'
    },
    counciltaxband: 'E',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
    floorplan: 'floorplan.jpg',
    epc: 'epc-bar-chart.png',
    links: {
      rightmove: ''
    }
  },
  {
    active: false,
    address: {
      active: false,
      number: 8,
      street: 'Mill Street',
      postcode1: 'KT1',
      postcode2: '2YY'
    },
    status: {
      type: 'Sale',
      status: 'For Sale',
      international: false
    },
    descriptions: {
      shortdescription: 'Nice house in a nice street',
      description: 'A wonderful, large two double bedroom apartment on 3rd floor of this smart purpose-built block for residents over 60 years. The apartment is light and airy with south facing viewings overlooking the Fishponds Park and main entrance to the property. On entering the apartment, the hallway leads to the first of the two sunny bedrooms on the right. A cupboard in the hall acts as cloakroom and storage space. The main bedroom is a large double with wonderful views of the park and trees. There is plenty of room for a king-sized bed, wardrobes, and furniture. The shower room boasts a large shower, toilet, and basin and plenty of room to move around. A well-designed kitchen off the lounge can be closed off with glass doors. It has everything you need in terms of appliances, all presented in very good order. The open lounge offers ample room for relaxing in front of the tv (broadband available) and a fabulously bright space for dining table and chairs, where residents can take in the amazing views. This delightful two-bedroom flat is decorated to a high standard throughout, with fresh neutral colours and quality carpets.',
      location: 'The development is situated on a main bus route with Surbiton, Kingston and Tolworth only a short bus ride away and the local library within walking distance. Kingfisher Court is a quiet oasis amidst a busy suburban environment. Surbiton is the ideal location for those seeking easy access into London and beyond, with its excellent train service, notably the fast train to London in under 20 minutes. The town centre has many high-street shops such as M&S, Sainsbury`s and Waitrose as well as banks, Post Office, restaurants, coffee shops and even a modern hotel. Often forgotten is Surbiton"s River Thames frontage, facing Home Park and offering and riverside walk to Kingston Town Centre with a café break en-route.',
      additional: 'A care system is catered for with a new pull chord system in place in every room, for your peace of mind. The flat comes with one parking space available. The block itself is well maintained and managed, with regular window cleaning, gardening and lift maintenance plus the house manager is on hand, working on site 9-5pm daily. A residents" lounge offers a change of scene, social interaction with activities on offer and potential to host your guests. There is also a guest flat available for overnight visitors for a small charge. The laundry room has four washing machines, included for residents" use in the service charge. It is well maintained and often a meeting point for a catch up and chat. A care system is catered for with a new pull chord system in place in every room, for your peace of mind. The flat comes with one parking space available. The block itself is well maintained and managed, with regular window cleaning, gardening and lift maintenance plus the house manager is on hand, working on site 9-5pm daily. A residents" lounge offers a change of scene, social interaction with activities on offer and potential to host your guests. There is also a guest flat available for overnight visitors for a small charge. The laundry room has four washing machines, included for residents" use in the service charge. It is well maintained and often a meeting point for a catch up and chat.'
    },
    details: {
      type: 'House',
      subtype: 'Detached',
      bedrooms: 4,
      bathrooms: 3,
      receptions: 2,
      garage: false,
      offstreetparking: true,
    },
    highlights: [
      'Near a school',
      'Good rails links',
      'Cool Summer house'
    ],
    price: {
      type: 'Guide Price',
      amount: 850000
    },
    lease: {
      freehold: false,
      leaselength: 999,
    },
    runningcosts: {
      groundrent: {
        amount: 0,
        frequency: ''
      },
      servicecharge: {
        amount: 0,
        frequency: ''
      },
      counciltaxband: 'E'
    },
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
    floorplan: 'floorplan.jpg',
    epc: 'epc-bar-chart.png',
    links: {
      rightmove: ''
    }
  }
]

const Test = {

  properties: function() {
    return _properties
  }
}

export default Test
