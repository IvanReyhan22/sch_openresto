import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { LOGO, ICON } from '../../assets/images'
import { AuthKey } from '../../system/Collection';
import { toast } from 'react-toastify';

export default class NavbarAdmin extends Component {

  logout = () => {
    localStorage.removeItem(AuthKey.LOGIN_DATA)
    this.forceUpdate()
    toast.warning("Berhasil Logout")
  }

  render() {
    return <div>
      <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand">
              <img className="back-button" src={ICON.LEFT_ARROW} style={{ width: 18, height: 18, marginRight: 20 }} onClick={() => this.props.goBack()} />
              <a  href="/filter_plan"><img src={LOGO.LOGO} id="logo" alt="" /></a>
          </a>

          {
            this.props.noSearch === undefined
              ?
              <div id="search">
                <div className="input-group stylish-input-group">
                  <span className="input-group-addon">
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                  <input type="text" placeholder="Search" />
                </div>
              </div>
              :
            <div></div>
          }

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto mt-3 mt-lg-0">
                <div id="search-responsive">
                  <div className="input-group stylish-input-group">
                    <span className="input-group-addon">
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                    <input type="text" placeholder="Search" />
                  </div>
                </div>
                <li className="nav-item active">
                  <Link to={`/r/dashboard`}><a className="nav-link" href="/dashboard">Dashboard <span className="sr-only">(current)</span></a></Link>
                </li>
                <li className="nav-item">
                  <Link to={`/r/manage-menu`}><a className="nav-link" href="/manage-menu">Manage Menu</a></Link>
                </li>
                <li className="nav-item">
                  <Link to={`/r/manage-meja`}><a className="nav-link" href="manage-meja">Manage Meja</a></Link>
                </li>
                <li className="nav-item">
                  <Link to={`/r/manage-pesanan`}><a className="nav-link" href="/manage-pesanan">Manage Pesanan</a></Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => this.logout()}>Logout</a>
                </li>
              </ul>
          </div>
        </div>
      </nav>
  </div>
  }
}
