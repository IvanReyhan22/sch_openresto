import React, { Component } from 'react'

import Navbar from '../components/Navbar'
import { IMAGE, ICON } from '../../assets/images'


import '../../assets/scss/profile.css'
import ListRestaurantCard from '../components/card/ListRestaurantCard'
import MenusCard from '../components/card/MenusCard'
import INPUTRoundBackground from '../components/input/INPUTRoundBackground'
import { AuthKey } from '../../system/Collection'
import { toast } from 'react-toastify'


export default class ProfileView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            edit: false
        }
    }

    editState = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    listFOOD = () => {

        var tempList = [];

        for (let index = 0; index < 5; index++) {
            tempList.push(
                <div className="mb-5" key={index}>
                    <MenusCard
                        title="Margarita Marinated"
                        desc="Margarita marinated flank steak tacos and I love the festive, loose atmosphere of this photo"
                        price="20K"
                        onValueChange={(e) => console.log(e, "Item Value")} />
                </div>
            )
        }

        return <div>{tempList}</div>

    }

    listRESTO = () => {

        var tempList = [];

        for (let index = 0; index < 5; index++) {
            tempList.push(
                <div className="mb-5" key={index}>
                    <ListRestaurantCard
                        onClick={() => this.props.method.goToPage("restaurant")} />
                </div>
            )
        }

        return <div>{tempList}</div>

    }

    logout = () => {
        localStorage.removeItem(AuthKey.LOGIN_DATA)
        this.forceUpdate()
        this.props.method.goToPage("login")
        toast.warn("Berhasil Logout")
    }

    render() {
        return (
            <div>

                <Navbar goBack={() => this.props.method.goBack()} />

                <div id="profile">
                    <div className="container">

                        {
                            this.state.edit === false
                                ?
                                <div className="row">
                                    {/* PROFILE */}
                                    <div className="col-12 col-md-4 col-lg-3 profile-section">
                                        <img src={IMAGE.WHITE_CAFFE} className="profile-pic" alt="" />

                                        <h2 className="mt-4">Crystal Smith</h2>
                                        <p>
                                            <img src={ICON.LOCATION} className="icon" /> &nbsp;
                                            Surabaya - Indonesia
                                        </p>
                                        <p>
                                            <img src={ICON.TELEPHONE} className="icon" /> &nbsp;
                                            Crystal.S@yandex.com
                                        </p>
                                        <p>
                                            <img src={ICON.TELEPHONE} className="icon" /> &nbsp;
                                            +62 85-2343-454
                                        </p>

                                        <button onClick={() => this.editState()}>
                                            Edit Profile
                                        </button>

                                        <button style={style.button} className="my-3" onClick={() => this.logout()}>Logout</button>

                                    </div>

                                    {/* EKSTENSI */}
                                    <div className="col-12 col-md-8 col-lg-9 right-section">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#restoran" role="tab" aria-controls="restoran" aria-selected="true">Restoran Favorit</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#makanan" role="tab" aria-controls="makanan" aria-selected="false">Makanan Favorit</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            {/* Restoran */}
                                            <div className="tab-pane fade show active" id="restoran" role="tabpanel" aria-labelledby="home-tab">
                                                {this.listRESTO()}
                                            </div>
                                            {/* Makanan */}
                                            <div className="tab-pane fade" id="makanan" role="tabpanel" aria-labelledby="profile-tab">
                                                {this.listFOOD()}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                :
                                <div className="text-center edit-profile">
                                    <img src={IMAGE.WHITE_CAFFE} className="profile-pic" alt="" />

                                    <div className="mt-4">
                                        <p>Nama Lengkap</p>
                                        <div className="input-container mx-auto mt-2">
                                            <input type="text" placeholder="Your Name" />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p>Kota / Tempat Tinggal</p>
                                        <div className="input-container mx-auto mt-2">
                                            <input type="text" placeholder="Malang, Kota Malang" />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p>Email</p>
                                        <div className="input-container mx-auto mt-2">
                                            <input type="text" placeholder="fortunecookie@gmail.com" />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p>Telephone</p>
                                        <div className="input-container mx-auto mt-2">
                                            <input type="text" placeholder="+62 098 2972 8627" />
                                        </div>
                                    </div>

                                    <button onClick={() => this.editState()}>
                                        Simpan
                                    </button>

                                    <div className="back-btn" onClick={() => this.editState()}>
                                        <img src={ICON.LEFT_ARROW} style={{ width: '100%', height: '100%' }} />
                                    </div>

                                </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const style = ({
    button : {
        background: 'transparent',
        border: '0',
        color: '#131313',
        textAlign: 'left'
    }
})