import {useEffect, useState} from "react";
import {CssBaseline, Grid} from '@mui/material';

import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData, getWeatherData} from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurant');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data))

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
        });
    }
  }, [type, bounds])

  return (
    <>
      <CssBaseline>
        <Header setCoordinates={setCoordinates}/>

        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              rating={rating}
              setType={setType}
              setRating={setRating}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Map
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
              weatherData={weatherData}
            />
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  );
}

export default App;
