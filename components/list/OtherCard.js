
import { withStyles, makeStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  buyButton: {
    color: '#FFF',
    backgroundColor: '#55d040',
    '&:hover': {
      backgroundColor: '#119d36',
      border: 'solid 1px #119d36',
      color: '#ffffff'
    }
  }
});

function OtherCard(props) {
  const classes = useStyles();

  const { product } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.imageFile[0]}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.prod_Nm}
          </Typography>
   
            <Chip
              size="small"
              label="當天出貨"
              color="primary"
              variant="outlined"
            />

            <Chip
              size="small"
              label="可退貨"
              color="secondary"
              variant="outlined"
            />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.buyButton}>購買</Button>
      </CardActions>
    </Card>
  );
}

export default OtherCard;