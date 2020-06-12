import React from 'react';
import ReactDom from 'react-dom';
import {Router,Switch,Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './components/App';
import Movie from './components/Movie';
import './index.css';


//exact always remains true in js , until we explicitly changes the value exact = {false}
ReactDom.render(
    <Router history = {createBrowserHistory()}>
        <Switch>
            <Route exact path = '/' component = {App}/> 
            <Route path = '/movie' component = {Movie}/>
        </Switch>
    </Router>
    ,document.getElementById('root')
);