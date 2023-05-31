import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

import useStyles from './styles';

const PlaceDetails = ({details, selecetd, refProp}) => {
  const classes = useStyles();

  if (selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <Card elevation={6}>
      <CardMedia
        style={{height: 350}}
        image={details.photo ? details.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={details.name}
      />

      <CardContent>
        <Typography gutterBottom variant='h5'>{details.name}</Typography>

        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(details.rating)} readOnly/>
          <Typography gutterBottom variant='subtitle1'>out of {details.num_reviews} reviews</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{details.price_level}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{details.ranking}</Typography>
        </Box>

        {details?.awards?.map((award, index) => (
          <Box
            key={index}
            my={1}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <img src={award.images.small} alt={award.display_name}/>
            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
          </Box>
        ))}

        {details?.cuisine?.map(({name}, index) => (
          <Chip key={index} size='small' label={name} className={classes.chip}/>
        ))}

        {details?.address && (
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
            <LocationOnIcon/> {details.address}
          </Typography>
        )}

        {details?.phone && (
          <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
            <PhoneIcon/> {details.phone}
          </Typography>
        )}

        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => window.open(details.web_url, '_blank')}
          >
            Trip Advisor
          </Button>

          <Button
            size='small'
            color='primary'
            onClick={() => window.open(details.website, '_blank')}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PlaceDetails;