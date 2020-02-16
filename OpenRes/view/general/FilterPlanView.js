import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import '../../assets/scss/filter_plan.css'
import { IMAGE, LOGO } from '../../assets/images'
import INPUTRoundBackground from '../components/input/INPUTRoundBackground'
import PrimaryBtn from '../components/btn/PrimaryBtn'
import { AuthKey } from '../../system/Collection';

export default class HomeView extends Component {

    render() {

        return (
            <div id="filter-plan" className="row w-100 mx-auto">

                <div className="col-12 col-md-4 col-lg-5 left-side px-0">

                    <img src={IMAGE.GREEN_SALAD} className="background" alt="" />

                    <div className="mask"></div> {/* Black Filter */}

                    <div className="content">
                        <div className="wrapper w-100 my-auto"> {/* Vertical & Horizontal Center */}
                            <div className="line"></div>
                            <div className="my-5"> {/* Vertical & Horizontal Margin */}
                                <h1>Delicious Dinner</h1>
                                <p>
                                    Booking meja, pesan menu tanpa antri. <br></br>
                                    Cepat praktis dan mudah.
                                </p>
                            </div>
                            <div className="line"></div>
                        </div>
                    </div>

                </div>

                <div className="col-12 col-md-8 col-lg-7 right-side">

                    {/* Navbar */}
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a className="navbar-brand" href="/filter_plan">
                            <img src={LOGO.LOGO} id="logo" alt="" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto mt-3 mt-lg-0">
                                <Link to={''} className="nav-item active">
                                    <p className="nav-link">Home <span className="sr-only">(current)</span></p>
                                </Link>
                                <Link to={'/list-restaurant'} className="nav-item">
                                    <p className="nav-link" >Restoran</p>
                                </Link>
                                {
                                    localStorage.getItem(AuthKey.LOGIN_DATA) === null
                                        ?
                                        <Link to={'/login'} className="nav-item">
                                            <p className="nav-link">Login</p>
                                        </Link>
                                        :
                                        <Link to={'/profile'} className="nav-item">
                                            <p className="nav-link">Profile</p>
                                        </Link>
                                }
                            </ul>
                        </div>
                    </nav>

                    {/* Content */}
                    <div className="content my-auto">

                        <div className="under-accent mb-5">
                            <h1>Rencana Makanmu.</h1>
                            <div className="custom-underline"></div>
                        </div>

                        <div className="my-5">
                            <h6>Menu / Restoran</h6>

                            <INPUTRoundBackground
                                name={"menu"}
                                placeholder={"Makanan, Restaurant . . ."}
                                onChange={(e) => console.log(e)}
                            />
                        </div>

                        {/* <div className="row ">

                            <div className="col-12 col-md-10 mb-4">
                                <h6>Lokasi</h6>

                                <INPUTRoundBackground
                                    name={"lokasi"}
                                    placeholder={"Makanan, Restaurant . . ."}
                                    onChange={(e) => console.log(e)}
                                />
                            </div>

                            <div className="col-12 col-md-2">
                                <h6>Meja</h6>

                                <INPUTRoundBackground
                                    name={"meja"}
                                    placeholder={"0"}
                                    onChange={(e) => console.log(e)}
                                />
                            </div>

                        </div> */}

                    </div>

                    <div className="btn-reposition" >
                        <PrimaryBtn
                            shadowed
                            title={"OK"}
                            onClick={() => this.props.method.goToPage("list-restaurant")} />
                    </div>

                </div>
            </div>
        )
    }
}
