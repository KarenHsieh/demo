> 閱讀「優雅串接 React & Redux」的筆記

<h2>1. Create mapStateToProps and connect</h2>

```js
import { connect } from 'react-redux';
function mapStateToProps(state) {
	return {
	count: state.count
}
}
export default connect(mapStateToProps)(Counter);
```
<hr>
<h2>2. Provide a store</h2>

provider 就像是跨component傳送 (like context feature) 的一個功能
connect 則像是打開一個傳送的開關

```js
import { Provider } from 'react-redux';
<Provider>
	<SomeComponent />
</Provider>
```
<hr>
<h2>3. Create store</h2>

```js
const store = createtore();
<Provider  store={store}>
	<SomeComponent />
</Provider>
```
<hr>
<h2>4. Create Reducer and this Reducer must be returned something</h2>

```js
function reducer() {
	return { count: 0 }
}

const store = createtore(reducer);
```
<hr>
<h2>5. Give a Reducer a state and action parameter，then give Initial State</h2>

```js
const initialState= {
	Count : 0
}
function reducer( state = initialState, action) {
	return state;
}
```
<hr>
<h2>6. what is Action?</h2>

Action is a object that describes a change that we want to make
like:
```js
{ type: 'INCREMENT'} and { type: 'DECREMENT'}
```

Action建立函數的表面功能看起來是建立Action物件，其實真正的意義在於封裝邏輯

以計數器來說，如果我要奇數才加一，沒有封裝這個邏輯的話，我要先去檢查是否為奇數再執行加一，如果封裝好了，我只要call這個action去做事就可以了

action裡封裝的邏輯太複雜的話，就要使用 Redux Thunk 等的中介軟體幫忙了

<hr>

<h2>7. fit actions into Reducer</h2>

```js
function reducer( state = initialState, action) {
	if ( action.type == 'INCREMENT' ) {
    return {
      count: state.count + 1
    }
  } else if ( action.type == 'DECREMENT' ) {
    return {
      count: state.count - 1
    }
  }
  return state;
}
```
<hr>

<h2>8. Where Do Actions Come From?</h2>

也可以寫成 store.dispatch(someAction) ，但一份文件只能出現一個store，像計數器有兩個地方會用到dispatch的話就會不合用

要怎麼解決這個問題
connect 這 function 會注入 mapStateToProps 和dispatch 當作 Component 的 
props 所以就可以在觸發的事件function裡這樣觸發action

```js
increment = () => {
  this.props.dispatch({ type: 'INCREMENT' });
}
```
<hr>
<h2>9. What is Redux thunk?</h2>

Redux thunk中介軟體可以讓action建立method但先不回傳action物件，而是傳回一個method，這個method可以滿足某個條件後或是延遲 dispatch 再執行 action 物件

```js
// 直接回傳action object
function increment(){
  return { type: 'INCREMENT' }
}

// 先處理一些事情再去叫指定的action做事
function incrementIfOdd() {
  return (dispatch, getSTate) => {
    const value = getState();
    if(value % 2 === 0){
      return;
    }

    dispatch(increment());
  }
}

// 延遲執行
function incrementAsync() {
  return dispatch => {
    setTimeout(()=>{
      dispatch(increment());
    }, 1000)
  }
}
```

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(increment());
store.dispatch(incrementIfOdd());
```
<hr>
<h2>10. How to use connect</h2>

- connect 的前兩個參數分別為state函數和 action Object(s)

```js

import * as ActionCreators from './actions';

export default connect(
  (state) => ({count: state.count}),
  ActionCreators
)(Counter);
```

- connect的前兩個參數為state函數和dispatch函數

```js
export default connect(
  (state) => ({count: state.count}),
  (dispatch) => ({
    increment: () => dispatch(increment()),
    incrementIfOdd: () => dispatch(incrementIfOdd())
    ...
  })
)(Counter);
```

- 類似前項，但改使用 bindActionCreators

```js
import { bindActionCreators } from 'redux';
import * as ActionCreators from './actions';

export default connect(
  (state) => ({count: state.count}),
  (dispatch) => bindActionCreators(ActionCreators, dispatch)
)(Counter);

```

- 自己綁定 event & dispatch

```js

export default connect(
  (state) => {{count: state.count}}
)(Counter);

// 雖然沒特別寫，但其實私下有傳dispatch as props 給 component
function Counter({ state, dispatch }) { 

  return (
    <>
      <button ocClick={ ()=> dispatch(increment()) }>+1</button>
      <button ocClick={ ()=> dispatch(incrementIfOdd()) }>+1 if odd</button>
    </>
  )
}

```

- 類似前項，但改為裝飾器的寫法

```js

// 1. 裝飾器需要增加在類別宣告上，所以不能用無狀態函數component
// 2. 需使用 static propTypes = {...} 宣告 props 類型

import React, {PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';

@connect(
  (state) => ({count: state.count}),
  ActionCreators
)

class Counter extends React.Component {
  static.propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired
    ...
  }

  render(){
    return(
      <>
      <button ocClick={ this.props.increment }>+1</button>
      <button ocClick={ this.props.incrementIfOdd }>+1 if odd</button>
    </>
    )
  }
}

```

<h2>10. Connect 的工作原理</h2>

Connect 元件從 context 中拿到 Provider 的 store，然後再從store裡拿到state和dispatch，將state和經過dispatch加工的action建立函數到元件上，在state變化時重新render元件。