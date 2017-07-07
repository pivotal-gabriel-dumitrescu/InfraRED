import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import {
  GetInfo
} from '../../services/api'

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.refreshInfo = this.refreshInfo.bind(this)
    this.state = {
      info: []
    }
  }

  componentDidMount () {
    this.refreshInfo()
  }
  refreshInfo () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetInfo()
          .then(response => {
            resolve(
              self.setState({
                info: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  render() {
    const listInfo = this.state.info.map((inf, index) =>
      <div className="row" key={index}>
        <div className="col-lg-12">
          <div className="card card-inverse card-primary">
            <div className="card-header">
              <i className="fa icon-badge"></i>Bosh Lite Director
              <span className="badge badge-success float-right"></span>
            </div>
            <div className="card-block">
              <div><small>Version: {inf.version}</small></div>
              <div><small>CPI: {inf.cpi}</small></div>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/overview'} className="nav-link" activeClassName="active">
                <i className="icon-grid"></i> Overview <span className="badge badge-primary">NEW</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/deployments'} className="nav-link" activeClassName="active">
                <i className="icon-drawer"></i> Deployments <span className="badge badge-danger">WIP</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/events'} className="nav-link" activeClassName="active">
                <i className="icon-drawer"></i> Events <span className="badge badge-danger">WIP</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/releases'} className="nav-link" activeClassName="active">
                <i className="icon-drawer"></i> Releases <span className="badge badge-danger">WIP</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/stemcells'} className="nav-link" activeClassName="active">
                <i className="icon-drawer"></i> Stemcells <span className="badge badge-danger">WIP</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/tasks'} className="nav-link" activeClassName="active">
                <i className="icon-drawer"></i> Tasks<span className="badge badge-danger">WIP</span>
              </NavLink>
            </li>
            <li className="divider"></li>
            <li className="nav-item">
              {listInfo}
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
