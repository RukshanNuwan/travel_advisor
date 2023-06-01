import {AppBar, Box, InputBase, Toolbar, Typography} from '@mui/material';
import {Autocomplete} from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './styles';
import {useState} from "react";

const Header = ({setCoordinates}) => {
  const [autocomplete, setAutocomplete] = useState();

  const classes = useStyles();

  const onLoadHandler = (autoC) => setAutocomplete(autoC);

  const onPlaceChangedHandler = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({lat, lng});
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>

        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>

          <Autocomplete onLoad={onLoadHandler} onPlaceChanged={onPlaceChangedHandler}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>

              <InputBase
                placeholder="Search..."
                className={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
