import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import Main from './Main';
import AppBar from './AppBar';
import Register from './Register';
import 'antd/dist/antd.css';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
     <div style={{overflow: 'hidden'}}>
        <AppBar style={{position: "fixed", zIndex: 100}}/>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/main' component={Main}/>
            <Route path='/register' component={Register}/>
        </Switch>
        </div>
    </BrowserRouter>
  ), document.getElementById('root'))



registerServiceWorker();

//index-----
// |----AppBar
// |----App-----
// |     |-----AppLogin (username&password)
// |----Main