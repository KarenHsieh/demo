import React, { Component } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ClickToResultPage from '../components/common'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



export default function Home() {
  const handleClick = () => {
    console.log('handleClick');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          this is home page
        </h3>

        <h3>
          <Link href="/results" as="/results">
            <a className={styles.link}>Go Result Page</a>
          </Link>
        </h3>

        <h5>
          Click <Link href={{ pathname: '/about', query: { type: 'store' }}}><a className={styles.link}>here</a></Link> to get more
        </h5>

        <Link href="/results" passHref>
          <ClickToResultPage onClick={ handleClick } />
        </Link>

        <Counter />

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    marginTop: '50px',
  }
});

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const reducer = (state = {count: 0}, action) => {
  let count = state.count;
  switch (action.type) {
    case 'INCREMENT':
      return {count: count + action.count};
    case 'DECREMENT':
      return {count: count + action.count};
    default:
      return state;
  }
}


let store = createStore(reducer);

class Counter extends React.Component {
  state = { count: 0 }

  render() {
    return(
      <Provider store={store}>
        <Card>
          <CardContent>
            <div>Count: {this.props.count}</div>
            <button type='button' onClick={this.props.onClickPlus}>+1</button>
            <button type='button' onClick={this.props.onClickMinus}>-1</button>
          </CardContent>
        </Card>
      </Provider>
    );
  }
}

function mapStateToProps (state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onClickPlus: () => dispatch(actions.INCREMENT()),
    onClickMinus: () => dispatch(actions.DECREMENT())
  };
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

