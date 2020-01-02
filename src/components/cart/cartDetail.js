import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ product, add }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles  {product.description} 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Grid container spacing={1}>
      <Grid item xs>
      <Typography gutterBottom variant="h5" component="h2">
          ${product.price}
        </Typography>
        </Grid>
        <Grid item xs>
        <Button size="small" onClick={add}>
          <AddShoppingCartIcon style={{ color: green[500] }}></AddShoppingCartIcon>
        </Button>
        </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}