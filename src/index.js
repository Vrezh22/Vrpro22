import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
window.store = store;

export function renderComponentsTree() {
  ReactDOM.render(
    <React.StrictMode>
      <App state={store.getState()}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderComponentsTree();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();