export const SEARCH_CATEGORY_KEYWORDS = {
  hospital: ['hospital', 'hospitals', 'clinic', 'clinics', 'medical'],
  restroom: [
    'restroom',
    'restrooms',
    'toilet',
    'toilets',
    'washroom',
    'washrooms',
    'bathroom',
    'bathrooms',
  ],
  hotel: ['hotel', 'hotels', 'stay', 'stays', 'lodge', 'lodges'],
};

export function normalizeSearchCategory(value) {
  const query = value.trim().toLowerCase();

  if (!query) {
    return '';
  }

  const matchedCategory = Object.entries(SEARCH_CATEGORY_KEYWORDS).find(
    ([, keywords]) => keywords.some((keyword) => query.includes(keyword)),
  );

  return matchedCategory ? matchedCategory[0] : query;
}
