import {createRef, useEffect, useState} from "react";
import {CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from '@mui/material';

import useStyles from './styles';
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({places, childClicked, isLoading, type, rating, setType, setRating}) => {
  const [eleRefs, setEleRefs] = useState([]);

  const classes = useStyles();


  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, index) => eleRefs[index] || createRef());

    setEleRefs(refs);
  }, [places, eleRefs])

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>

      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem'/>
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => (
              <Grid key={index} item xs={12}>
                <PlaceDetails
                  details={place}
                  selected={Number(childClicked) === index}
                  refProp={eleRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default List;