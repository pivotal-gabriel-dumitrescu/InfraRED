import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import {
  GetInstanceGroups,
  GetReleases,
  GetStemcells,
  GetUpdate,
  GetInstances,
  GetVms,
  GetEvents,
  GetTasks
} from '../../services/api'

class Overview extends Component {

  constructor(props) {
    super(props);
    this.refreshInstanceGroups = this.refreshInstanceGroups.bind(this)

    this.refreshInstances = this.refreshInstances.bind(this)
    this.refreshVms = this.refreshVms.bind(this)

    this.refreshReleases = this.refreshReleases.bind(this)
    this.refreshStemcells = this.refreshStemcells.bind(this)
    this.refreshUpdate = this.refreshUpdate.bind(this)

    this.refreshEvents = this.refreshEvents.bind(this)
    this.refreshTasks = this.refreshTasks.bind(this)

    this.toggle = this.toggle.bind(this);
    this.state = {
      instanceGroups: [],
      instances: [],
      vms: [],
      releases: [],
      stemcells: [],
      update: [],
      events: [],
      tasks: [],
      dropdownOpen: false,
      activeTab: '1'
    };
  }
  componentDidMount () {
    this.refreshInstanceGroups()
    this.refreshInstances()
    this.refreshVms()
    this.refreshReleases()
    this.refreshStemcells()
    this.refreshUpdate()
    this.refreshEvents()
    this.refreshTasks()
  }

  refreshInstanceGroups () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetInstanceGroups()
          .then(response => {
            resolve(
              self.setState({
                instanceGroups: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshInstances () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetInstances()
          .then(response => {
            resolve(
              self.setState({
                instances: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshVms () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetVms()
          .then(response => {
            resolve(
              self.setState({
                vms: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshReleases () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetReleases()
          .then(response => {
            resolve(
              self.setState({
                releases: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshStemcells () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetStemcells()
          .then(response => {
            resolve(
              self.setState({
                stemcells: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshUpdate() {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetUpdate()
          .then(response => {
            resolve(
              self.setState({
                update: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshEvents () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetEvents()
          .then(response => {
            resolve(
              self.setState({
                events: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }
  refreshTasks () {
    var self = this
    return new Promise(
      (resolve, reject) => {
        GetTasks()
          .then(response => {
            resolve(
              self.setState({
                tasks: response
              })
            )
          })
          .catch(error => {
            reject(error)
          })
      }
    )
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const listInstanceGroups = this.state.instanceGroups.map((igs, index) =>
        <div className="col-lg-6" key={index}>
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify"></i> {igs.name}
            </div>
            <div className="card-block">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>name:</td>
                    <td>{igs.name}</td>
                  </tr>
                  <tr>
                    <td>azs:</td>
                    <td>z1, z2, z3</td>
                  </tr>
                  <tr>
                    <td>instances:</td>
                    <td>{igs.instances}</td>
                  </tr>
                  <tr>
                    <td>jobs:</td>
                    <td>zookeeper</td>
                  </tr>
                  <tr>
                    <td>lifecycle:</td>
                    <td>{igs.lifecycle || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>networks:</td>
                    <td>default</td>
                  </tr>
                  <tr>
                    <td>persistent_disk:</td>
                    <td>{igs.persistent_disk || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>stemcell:</td>
                    <td>{igs.stemcell}</td>
                  </tr>
                  <tr>
                    <td>vm_type:</td>
                    <td>{igs.vm_type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
    const listInstances = this.state.instances.map((instance, index) =>
      <div className="row" key={index}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-block">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>id:</td>
                    <td>{instance.id}</td>
                  </tr>
                  <tr>
                    <td>job:</td>
                    <td>{instance.job}</td>
                  </tr>
                  <tr>
                    <td>agent_id:</td>
                    <td>{instance.agent_id || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>cid:</td>
                    <td>{instance.cid || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>az:</td>
                    <td>{instance.az}</td>
                  </tr>
                  <tr>
                    <td>ips:</td>
                    <td>[{instance.ips.length > 0 ? instance.ips : 'N/A'}]</td>
                  </tr>
                  <tr>
                    <td>expects_vm:</td>
                    <td>{instance.expects_vm ? 'true' : 'false'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
    const listVms = this.state.vms.map((vm, index) =>
      <div className="row" key={index}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-block">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>id:</td>
                    <td>{vm.id}</td>
                  </tr>
                  <tr>
                    <td>job:</td>
                    <td>{vm.job}</td>
                  </tr>
                  <tr>
                    <td>agent_id:</td>
                    <td>{vm.agent_id}</td>
                  </tr>
                  <tr>
                    <td>cid:</td>
                    <td>{vm.cid}</td>
                  </tr>
                  <tr>
                    <td>az:</td>
                    <td>{vm.az}</td>
                  </tr>
                  <tr>
                    <td>ips:</td>
                    <td>[{vm.ips.length > 0 ? vm.ips : 'N/A'}]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
    const listReleases = this.state.releases.map((release, index) =>
      <div className="col-lg-12" key={index}>
        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify"></i> {release.name}
          </div>
          <div className="card-block">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>name:</td>
                  <td>{release.name}</td>
                </tr>
                <tr>
                  <td>sha1:</td>
                  <td>{release.sha1}</td>
                </tr>
                <tr>
                  <td>url:</td>
                  <td>{release.url}</td>
                </tr>
                <tr>
                  <td>version:</td>
                  <td>{release.version}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
    const listStemcells = this.state.stemcells.map((stemcell, index) =>
      <div className="col-lg-12" key={index}>
        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify"></i> {stemcell.name}
          </div>
          <div className="card-block">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>name:</td>
                  <td>{stemcell.name || 'N/A (optional)'}</td>
                </tr>
                <tr>
                  <td>alias:</td>
                  <td>{stemcell.alias}</td>
                </tr>
                <tr>
                  <td>os:</td>
                  <td>{stemcell.os}</td>
                </tr>
                <tr>
                  <td>version:</td>
                  <td>{stemcell.version}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
    const listUpdate = this.state.update.map((up, index) =>
      <div className="col-lg-12" key={index}>
        <div className="card">
          <div className="card-block">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>canaries:</td>
                  <td>{up.canaries}</td>
                </tr>
                <tr>
                  <td>canary_watch_time:</td>
                  <td>{up.canary_watch_time}</td>
                </tr>
                <tr>
                  <td>max_in_flight:</td>
                  <td>{up.max_in_flight}</td>
                </tr>
                <tr>
                  <td>update_watch_time:</td>
                  <td>{up.update_watch_time}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

    const events = [...this.state.events.slice(0, 5)]
    const listEvents = events.map((evt) =>
      <tr key={evt.id}>
        <td><i className="fa fa-warning"></i></td>
        <td>{evt.id}</td>
        <td>{evt.user}</td>
        <td>{evt.action}</td>
      </tr>
    )

    const listTasks = this.state.tasks.map((task) =>
      <tr key={task.id}>
        <td><i className="fa fa-check-square"></i></td>
        <td>{task.id}</td>
        <td>{task.description}</td>
        <td>{task.state}</td>
      </tr>
    )
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i>Deployment Overview
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-lg-8">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }} >
                          Instance Groups
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }} >
                          Instances
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }} >
                          VMs
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '4' })}
                          onClick={() => { this.toggle('4'); }} >
                          Releases
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '5' })}
                          onClick={() => { this.toggle('5'); }} >
                          Stemcells
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '6' })}
                          onClick={() => { this.toggle('6'); }} >
                          Update
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div className="row">
                          {listInstanceGroups}
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        {listInstances}
                      </TabPane>
                      <TabPane tabId="3">
                        {listVms}
                      </TabPane>
                      <TabPane tabId="4">
                        {listReleases}
                      </TabPane>
                      <TabPane tabId="5">
                        {listStemcells}
                      </TabPane>
                      <TabPane tabId="6">
                        {listUpdate}
                      </TabPane>
                    </TabContent>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-header">
                        <i className="fa fa-align-justify"></i> Events
                      </div>
                      <div className="card-block">
                        <table className="table table-sm">
                          <tbody>
                            {listEvents}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <i className="fa fa-align-justify"></i> Tasks
                      </div>
                      <div className="card-block">
                        <table className="table table-sm">
                          <tbody>
                            {listTasks}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Overview;
