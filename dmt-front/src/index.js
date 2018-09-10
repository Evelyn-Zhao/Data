import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import Main from './Main';
import AppBar from './AppBar';
import Register from './Register';
import Exp from './Exp';
import ExpDetails from './ExpDetails';
import Data from './Data';
import ManageExps from './ManageExps';
import DownloadData from './DownloadData';
import EditPersonalInfo from './EditPersonalInfo';
//import DataDetails from './DataDetails';
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
            <Route path='/exp' component={Exp}/>
            <Route path='/experiments/:id' component={ExpDetails}/>
            <Route path='/data' component={Data}/>
            <Route path='/manageExps' component={ManageExps}/>
            <Route psth='/editPersonalInfo' component={EditPersonalInfo}/>
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