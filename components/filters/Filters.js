import { withStyles, makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  slider: {
    width: '100%',
  }
});

function Filters() {
  return (
    <Grid item>
      <Area />
      <PriceRange />
    </Grid>
  );
}


function Area() {
  const classes = useStyles();

  const handleClick = (event) => {
    console.log(event.target.value);
    // event.preventDefault();
  }

  return (
    <Card className={classes.root}>
        <CardContent>
          <Typography id="discrete-slider" gutterBottom>
            出貨地點
          </Typography>

          <Chip
            size="small"
            label="台北"
            color="primary"
            variant="outlined"
            onClick={handleClick}
          />

          <Chip
            size="small"
            label="高雄"
            color="primary"
            variant="outlined"
            onClick={handleClick}
          />
        </CardContent>
    </Card>
  );
}

function PriceRange() {
  const classes = useStyles();

  const valuetext = (value) => {
    return `${value}元`;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.slider}>
          <Typography id="discrete-slider" gutterBottom>
            價錢篩選
          </Typography>
          <Slider
            defaultValue={100}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={100}
            marks
            min={0}
            max={1200}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Filters;