import GoogleMapReact from 'google-map-react';
import {Paper, Rating, Typography, useMediaQuery} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import useStyles from './styles';
import mapStyles from "./mapStyles";

const Map = ({coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
          setCoordinates({lat: e.center.lat, lng: e.center.lng})
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <div
            key={index}
            className={classes.markerContainer}
            lat={Number(place.lat)}
            lng={Number(place.lng)}
          >
            {
              isDesktop ? (
                <LocationOnOutlinedIcon/>
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                    {place.name}
                  </Typography>

                  <img
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                    className={classes.pointer}
                  />

                  <Rating size='small' value={Number(place.rating)} readOnly/>
                </Paper>
              )
            }
          </div>
        ))}

        {weatherData?.list?.map((data, index) => (
          <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" height={100}/>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
