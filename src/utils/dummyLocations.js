export const dummyLocations = [
  {
    id: 'loc-1',
    name: 'CareNest Hospital',
    safetyScore: 88,
    offset: { lat: 0.0018, lng: 0.0024 },
    description:
      'A well-lit hospital near the main road with regular foot traffic and on-duty staff.',
    whySafe:
      'The campus has CCTV coverage, visible staff presence, emergency access, and easy connection to transport.',
    categories: ['hospital'],
    supportTags: ['24/7 staff', 'Wheelchair entry', 'Emergency desk'],
    profileSupport: {
      Women: ['Maternity wing', 'Breastfeeding room'],
      Transgender: ['Gender-neutral restroom', 'Inclusive help desk'],
      Elderly: ['Elder support desk', 'Wheelchair assistance'],
      Child: ['Pediatric unit', 'Family waiting area'],
    },
  },
  {
    id: 'loc-2',
    name: 'ComfortStop Restroom Hub',
    safetyScore: 62,
    offset: { lat: -0.0014, lng: -0.0021 },
    description:
      'A monitored public restroom zone close to a busy junction with steady movement nearby.',
    whySafe:
      'It stays active during most of the day and is close to open shops, lighting, and security staff.',
    categories: ['restroom'],
    supportTags: ['CCTV nearby', 'Well-lit entry', 'Caretaker support'],
    profileSupport: {
      Women: ['Sanitary pad vending', 'Breastfeeding booth'],
      Transgender: ['Trans-friendly access', 'Gender-neutral stall'],
      Elderly: ['Grab rails', 'Low-step access'],
      Child: ['Baby changing station', 'Family cubicle'],
    },
  },
  {
    id: 'loc-3',
    name: 'HarborStay Hotel',
    safetyScore: 34,
    offset: { lat: 0.0032, lng: 0.0041 },
    description:
      'A budget hotel in a quieter lane with fewer people around after evening hours.',
    whySafe:
      'Basic security and street lighting are available, but lower activity and limited visibility reduce the safety score.',
    categories: ['hotel'],
    supportTags: ['Reception desk', 'Street lighting', 'Private rooms'],
    profileSupport: {
      Women: ['Women-friendly rooms', 'Late-night front desk'],
      Transgender: ['Inclusive check-in support'],
      Elderly: ['Lift access', 'Ground-floor room option'],
      Child: ['Family room option', 'Extra bedding'],
    },
  },
  {
    id: 'loc-4',
    name: 'City Relief Clinic',
    safetyScore: 78,
    offset: { lat: -0.0028, lng: 0.0018 },
    description:
      'A neighborhood clinic with strong daytime support and clear roadside visibility.',
    whySafe:
      'Medical staff, lit entrance, and frequent local foot traffic improve the safety feel.',
    categories: ['hospital'],
    supportTags: ['Day clinic', 'Reception support', 'CCTV nearby'],
    profileSupport: {
      Women: ['Prenatal checkup desk'],
      Transgender: ['Inclusive registration support'],
      Elderly: ['Priority seating', 'Assisted entry'],
      Child: ['Child care desk'],
    },
  },
  {
    id: 'loc-5',
    name: 'TravelEase Rest Suites',
    safetyScore: 69,
    offset: { lat: 0.0022, lng: -0.0036 },
    description:
      'A mid-range hotel with a staffed lobby and reliable lighting around the entrance.',
    whySafe:
      'The staffed reception, visible drop-off zone, and nearby stores improve comfort and visibility.',
    categories: ['hotel'],
    supportTags: ['24/7 reception', 'Lobby cameras', 'Cab access'],
    profileSupport: {
      Women: ['Women-only floor option'],
      Transgender: ['Inclusive booking support'],
      Elderly: ['Porter assistance'],
      Child: ['Family check-in support'],
    },
  },
];
