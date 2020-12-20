/* eslint-disable global-require */
import Clear from '../assets/clear.png';
import Hail from '../assets/hail.png';
import HeavyCloud from '../assets/heavy-cloud.png';
import LightCloud from '../assets/light-cloud.png';
import HeavyRain from '../assets/heavy-rain.png';
import LightRain from '../assets/light-rain.png';
import Showers from '../assets/showers.png';
import Sleet from '../assets/sleet.png';
import Snow from '../assets/snow.png';
import Thunder from '../assets/thunder.png';

const images = {
  Clear: Clear,
  Hail: Hail,
  'Heavy Cloud': HeavyCloud,
  'Light Cloud': LightCloud,
  'Heavy Rain': HeavyRain,
  'Light Rain': LightRain,
  Showers: Showers,
  Sleet: Sleet,
  Snow: Snow,
  Thunder: Thunder,
};

export default (weather) => images[weather];
