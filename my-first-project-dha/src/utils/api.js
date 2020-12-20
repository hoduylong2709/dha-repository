const getData = (city) => {
  switch (city) {
    case 'hanoi':
      return {
        location: 'Ha Noi',
        weather: 'Clear',
        temperature: 24,
      };
    case 'sapa':
      return {
        location: 'Sapa',
        weather: 'Sleet',
        temperature: 8,
      };
    case 'danang':
      return {
        location: 'Da Nang City',
        weather: 'Heavy Cloud',
        temperature: 24,
      };
    case 'paris':
      return {
        location: 'Paris',
        weather: 'Hail',
        temperature: 5,
      };
    case 'tokyo':
      return {
        location: 'Tokyo',
        weather: 'Thunder',
        temperature: 21,
      };
    case 'berlin':
      return {
        location: 'Berlin',
        weather: 'Snow',
        temperature: 0,
      };
    case 'hue':
      return {
        location: 'Hue City',
        weather: 'Showers',
        temperature: 22,
      };
    case 'hochiminh':
      return {
        location: 'Ho Chi Minh City',
        weather: 'Light Rain',
        temperature: 29,
      };
    case 'dalat':
      return {
        location: 'Da Lat',
        weather: 'Light Cloud',
        temperature: 18,
      };
    case 'manila':
      return {
        location: 'Manila',
        weather: 'Heavy Rain',
        temperature: 16,
      };
    default:
      return null;
  }
};

export const fetchWeather = (city) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData(city)), 200);
  });
};
