import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {HashRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store from "./store";

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/flightindicators.min.css';

ReactDOM.render(<Provider store={store}>
  <HashRouter>
    <Switch>
      <Route path="/" name="Home" component={App}/>
    </Switch>
  </HashRouter>
</Provider>, document.getElementById('root'));
//TODO: include registerServiceWorker again!
registerServiceWorker();
