import axios from 'axios';

const getPlacesData = async (type, sw, ne) => {
  try {
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '074d2f3ae3mshbd5c04c0b4aa281p189a38jsn0051b16565cd',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

const getWeatherData = async (lat, lng) => {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: {lon: lng, lat: lat},
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export {getPlacesData, getWeatherData};