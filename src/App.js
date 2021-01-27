 import React, { Component } from 'react';
import Todo from './components/ToDO';


class App extends Component {
  render() {
    const { state: { toDo: { tasks } } } = this.props;
    return (
      <div>
        <Todo tasks={tasks}/>
      </div>
    )
  }
}

export default App;