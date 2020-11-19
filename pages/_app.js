//根組件,全局佈局樣式
import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { initStore } from '../redux/store'

import '../styles/globals.css'

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default withRedux(initStore)(withReduxSaga(MyApp))

// export default MyApp
