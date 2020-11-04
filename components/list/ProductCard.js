import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
// import {stats, prods} from './singleData';
import styles from './ProductCard.module.scss';


class ProductCard extends Component {
  state = {  }
  
  render() {
    const product = this.props.product;
    console.log("ProductCard -> render -> product", product)
    //const price = stats.price;
    return (
      <div className={styles.card}>
        <PreviewImage prod_img_url={product.imageFile[0]} />
        <h5>{product.prod_Nm}</h5>
        <p>{product.prod_No}</p>

        <Price price={product.minMarket_price}/>
        
        <Link href="/product" as="/product">
          <a className={styles.detailButton}>購買</a>
        </Link>
      </div>
    );
  }
}


function PreviewImage(props) {
  return (
    <div className={styles.imageBlock}>
      <img className={styles.previewImage} src={props.prod_img_url} />
    </div>
  );
}



function Price(props) {
  return (
    <>
      <div>價錢{props.price}</div>
    </>
  );
}

PreviewImage.propTypes = {
  prod_img_url: PropTypes.string,
}


 
export default ProductCard;