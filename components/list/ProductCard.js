import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {stats, prods} from './singleData';
import styles from './ProductCard.module.scss'


class ProductCard extends Component {
  state = {  }
  
  render() {
    const data = prods[0];
    const price = stats.price;
    return (
      <div className={styles.card}>
        <PreviewImage prod_img_url={data.prod_img_url} />
        <h5>{data.prod_name}</h5>
        <Content avg_rating_star={data.avg_rating_star} rating_count={data.rating_count} />
        <Price price={price}/>
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


function Content(props) {
  return (
    <div>
      {/* 評價星等 */}
      <span>星等: {props.avg_rating_star}</span> | 
      {/* 評價數 */}
      <span>評價數: {props.rating_count}</span>
    </div>
  );
}


function Price(props) {
  return (
    <>
      <div>最低價{props.price.min}</div>
      <div>最高價{props.price.max}</div>
    </>
  );
}

PreviewImage.PropTypes = {
  prod_img_url: PropTypes.string,
}


 
export default ProductCard;