import { useRouter } from 'next/router'
import ProductCard from '../../components/list/ProductCard'
import Filters from '../../components/filters/Filters'
import styles from './index.module.scss'

function Results() {
  // const router = useRouter()

  return (
    <div>
      <h3>This is results/index.js</h3>
      <div className={styles.container} >
        <div className={styles.filters}>
          <Filters />
        </div>
        <div className={styles.products}> 
          <ProductCard />
          <ProductCard />
          <ProductCard />

        </div>
      </div>

    </div>
  )
}

export async function getStaticProps(context) {
  console.dir(context);
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Results;