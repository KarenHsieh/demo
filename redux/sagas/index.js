import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import * as FilterAreaSaga from './FilterAreaSaga'


function* rootSaga() {
  yield takeLatest('FILTER_AREA', FilterAreaSaga)
}

export default rootSaga
