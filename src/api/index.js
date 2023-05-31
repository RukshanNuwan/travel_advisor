import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete';

const getPlacesData = async (sw, ne) => {
  try {
    const {data: {data}} = await axios.get(URL, {
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

export {getPlacesData};