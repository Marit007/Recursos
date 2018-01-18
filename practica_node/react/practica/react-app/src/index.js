import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Hoc from './Components/HOC';
import Button from './Components/Button';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
