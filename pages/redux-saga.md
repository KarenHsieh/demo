[ Redux-Saga 小筆記]
<br>
## 前提: 當換成 redux-saga 的改變

  原先Redux的流程
  - 對 Component 做 connect，之後便可使用 Store 的 dispatch 觸發預先在 Reducer 中寫好的邏輯

  Redux-Saga
  - 同樣是先對 Component 做 connect，但 dispatch 觸發的事件為 React-Saga 預先訂閱的名稱，在該事件裡才依照流程去觸發需執行的 Reducer 邏輯。

> 原本被 dispatch 觸發的 Method 從 Reducer 變成 Redux-Saga。
> Redux-Saga 成為 Component 及 Reducer 之間溝通的橋樑

<hr>
<br>

## 接下來會拿原先 Redux_Counter 的檔案來改
<br> 

### 目標: 把redux改成redux saga結構並多加一個兩秒後 +1 的按紐

<br>

> 自行打開 https://github.com/KarenHsieh/Redux_Counter 比對前後差異，下面不再重複貼原程式

<br>

1. 要多觸發一個事件，就先定義action，原先的 action 直接寫在 Counter Component 裡，我們把它抽出來變成額外的 actions.js，方便之後給saga使用
<br>
<br>
```js

// action.js

export const increment = () => ({
  type: 'INCREMENT'
});

export const decrement = () => ({
  type: 'DECREMENT'
});

// 兩秒後 +1 的行為我把它命名 INCREMENT_ASYNC
export const incrementAsync = () => ({
  type: 'INCREMENT_ASYNC'
});

```
<br>
2. 有了 actions 以後，我想來把 saga 補上，想一下要 Saga 替我做甚麼事呢? 既然是兩秒後 +1 ，那我想要有一個 function 替我做停頓兩秒之後然後去呼叫原先的 INCREMENT action ，這樣就可以加一了。
<br>
<br>

```js

// counterSaga.js

import {delay} from 'redux-saga/effects'
import { put, takeEvery, all } from 'redux-saga/effects'

// 先來 say 個 Hello 我覺得不錯
function* helloSaga() {
  yield console.log('Hello Sagas!');
}

// 這就是我說的要它停個兩秒再 +1 的主要 function
function* incrementAfter2secs() {
  yield delay(2000)
  yield put({ type: 'INCREMENT' })
  // put 可以作為 dispatch 觸發 Reducer
}

// 監聽 INCREMENT_ASYNC Action 的地方，然後觸發 incrementAfter2secs function去動作
function* mySaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAfter2secs); 
}

// 包包包，把它包成一包準備丟出去，我的 Component 需要這一包
export default function* rootSaga() {
  yield all([
    helloSaga(),
    mySaga()
  ])
} // 兩個 Generators 將會同時啟動
```

> [補充1]
> 
> 通常我們會把訂閱事件統一到一個 Function 中
管理一種 Redcuer 的 State
在 Function 內可以使用 takeEvery 來訂閱相同類別的所有事件

> [補充2]
> 
> takeEvery：每次觸發 type 為 FETCH_REQUESTED 的 action 時都會執行 fetchData。<br><br>
> takeLatest：如果多次觸發 type 為 FETCH_REQUESTED 的 action 時，會以最後一次的回應為準，在之前還未完成（如，pending）的 fetchData 將會被取消。

<br>
3. 我既然要請 Saga 幫我在按下按鈕和 +1 中間停個兩秒，這是中間做的事，我需要一個中間人，那就是SagaMiddleware，middleware 如果要被建立，那我就要去找 store 好朋友，在 createStore 時幫幫我拉它一起做伙。 ( 因為store的程式碼變多了，所以單獨抽出來變成一個檔案 )



<br><br>

```js
// store.js

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga'

import reducer from './reducer';
import rootSaga from './counterSaga';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)

export default store;
```
<br>

4. 最後一關了，我要怎麼觸發這一連串的動作呢? 回到元件的地方整理我們不需要的 & 加上需要的操作。
   - 拿掉 connect 和 mapStateToProps (可以看開頭寫的【當換成 redux-saga 的改變】)
   - 在元件內取得 state 用 useSelector();
   - 用 useDispatch 取代原先的 this.props.dispatch
```js

// Counter.js

import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './actions';


function Counter() {

  // react-redux 7.1 用 useDispatch 和 useSelector 取代 connect
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  // useSelector 從 Redux 的 store 拿到 state

  return (
    <div>
      <div>Counter: {count}</div>
      <button onClick={() => { dispatch(actions.increment()); }}>+1</button>
      <button onClick={() => { dispatch(actions.decrement()); }}>-1</button>
      <button onClick={() => { dispatch(actions.incrementAsync()); }}>+1 after 2 second</button>
    </div>
  );
} 

// function mapStateToProps(state) {
//   return {
//     count: state.count
//   };
// }

// export default connect(mapStateToProps)(Counter);

export default Counter;
```
> [補充] <br>
> 
> useSelector方法類似於之前的connect的mapStateToProps參數的概念。並且useSelector會訂閱store, 當action被dispatched的時候，會運行selector。