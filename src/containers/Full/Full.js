import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';

import Overview from '../../views/Overview/'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <div className="container-fluid">
              <Switch>
                <Route path="/overview" name="Overview" component={Overview}/>
                <Redirect from="/" to="/overview"/>
              </Switch>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
