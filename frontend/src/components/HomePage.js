import React, { Component } from 'react';
import MyListsPage from "./MyListsPage";
import CreateListPage from "./CreateListPage";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"; 
import List from './List'; 

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <Router>
            <Switch>
                <Route exact path = "/">
                    <h1 align="center">Welcome to WeDo</h1> 
                </Route>
                <Route path = "/create" component={CreateListPage} />
                <Route path = "/mylists" component={MyListsPage} />
                <Route path = '/List/:listCode' component={List} />
            </Switch>
        </Router>
        );
    }
}
