import React, { Component } from 'react'
import PropTypes from 'prop-types';

function Detail() {
  return(
    <div>
      <h3>商品頁</h3>
    </div>
  );
}

/* function Detail({ data }) {
  
}

// 動態資料
export async function getServerSideProps(context) {
  // const allPlayerData = getPlayerData();

  const res = await fetch('https://randomuser.me/api/');
  let data = await res.json(); // 這裡的await很重要! 沒加的話一直報 cannot be serialized as JSON 錯誤
  data = JSON.parse(JSON.stringify(data)).results[0]
  
  return { props: { data } }
}  */


export default Detail