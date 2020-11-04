
import ProductCard from '../../components/list/ProductCard'
import Filters from '../../components/filters/Filters'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import styles from './index.module.scss'
import tempProduct from './temp'


/* 
// 相對路徑 & 絕對路徑
import path from 'path'
const resultPath = path.join(process.cwd(), 'results')
const fullPath = path.join(resultPath, 'temp.json')
console.log('fullPath = ' + fullPath); 
*/

function Results() {
//function Results({data}) {
  // console.log(data)

  const list = tempProduct.prodList.map(function(item){
    return(
      <ProductCard product={item}/>
    );
  });

  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <Filters />
          </Grid>
          <Grid item lg={9}>
            { list }
            </Grid>
        </Grid>
      </Container>
    </div>
  )
}

/* return (
  <div>
    <Container>
    <div className={styles.container} >
      <div className={styles.filters}>
        <Filters />
      </div>
      <div className={styles.products}>
        { list }
      </div>
    </div>
    </Container>
  </div>
) */

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