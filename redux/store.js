import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../redux/reducer'
import rootSaga from '../redux/sagas'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const initStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, initialState, bindMiddleware([sagaMiddleware]))
  //console.log(store.getState())
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}