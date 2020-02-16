import React, { Component } from 'react'
import { LOGO, ICON } from '../../assets/images'

import { Link } from 'react-router-dom'
import { AuthKey } from '../../system/Collection'

export default class Navbar extends Component {
    render() {

        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand">
                        <img className="back-button" src={ICON.LEFT_ARROW} style={{ width: 18, height: 18, marginRight: 20 }} onClick={() => this.props.goBack()} />
                        <p href="/filter_plan"><img src={LOGO.LOGO} id="logo" alt="" /></p>
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
                            <Link to={''} className="nav-item active">
                                <p className="nav-link">Home <span className="sr-only">(current)</span></p>
                            </Link>
                            <Link to={'list-restaurant'} className="nav-item">
                                <p className="nav-link" href="#">Restoaran</p>
                            </Link>

                            {
                                localStorage.getItem(AuthKey.LOGIN_DATA) === null
                                    ?
                                    <Link to={'login'} className="nav-item">
                                        <p className="nav-link" href="#">Login</p>
                                    </Link>
                                    :
                                    <Link to={'/profile'} className="nav-item">
                                        <p className="nav-link" href="#">Profile</p>
                                    </Link>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
