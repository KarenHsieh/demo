import { useSelector, useDispatch } from 'react-redux'
import * as FilterAction from 'redux/actions'

import ProductCard from '../../components/list/ProductCard'
import OtherCard from '../../components/list/OtherCard'
import Filters from '../../components/filters/Filters'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';

import tempProduct from './temp'


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bar: {
    flexGrow: 1,
    marginBottom: '50px'
  },
  pagination: {
    margin: '15px 0',
    textAlign: 'center'
  }
});

function Results() {
  
  const classes = useStyles();

  const list = tempProduct.prodList.map(function(item){
    return(
      <Grid key={item.prod_No} item lg={4}>
        <OtherCard key={item.prod_No} product={item} />
      </Grid>
    );
  });

  return (
    <div>
      <div className={classes.bar}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <Container maxWidth='lg'>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item lg={3}>
              <Filters />
            </Grid>
            <Grid item lg={9}>
              <Grid container spacing={2}>
                { list }
              </Grid>
              <Grid container className={classes.pagination}>
                <Pagination count={10} variant="outlined" shape="rounded" />
              </Grid> 
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}


/* export async function getServerSideProps(context) {

  const res = await fetch('http://domain/searchProduct?prod_no=123');
  let data = await res.json(); // 這裡的await很重要! 沒加的話一直報 cannot be serialized as JSON 錯誤
  data = JSON.parse(JSON.stringify(data))
  console.log("getServerSideProps -> data = ")
  console.log(data)
  
  return { props: { data } }
} */

/* export async function getStaticProps(context) {
  const res = await fetch('http://domain/searchProduct?prod_no=123');
  let data = await res.json(); // 這裡的await很重要! 沒加的話一直報 cannot be serialized as JSON 錯誤
  data = JSON.parse(JSON.stringify(data))
  console.log("getStaticProps -> data = ")
  console.log(data)
  
  return { props: { data } }
}  */



export default Results;