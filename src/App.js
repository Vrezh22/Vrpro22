import React, { Component } from 'react';
import Todo from './components/ToDO';
// import UseStateHook from './test/useStateHook';
// import UseEffectHook from './test/useEffectHook';
// import Request from './test/Request';
class App extends Component {
  state = {
    counter: 0
  }
  render() {
    return (
      <div>
        <Todo />
        {/* <UseStateHook /> */}
        {/* <UseEffectHook /> */}
        {/* <Request /> */}
      </div>
    )
  }
}

export default App;