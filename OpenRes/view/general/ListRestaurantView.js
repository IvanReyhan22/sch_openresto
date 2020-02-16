import React, { Component } from 'react'

import '../../assets/scss/list_restauran.css'

import { IMAGE, ICON } from '../../assets/images'
import ListRestaurantCard from '../components/card/ListRestaurantCard'
import Loading from '../components/Loading'

export default class ListRestaurantView extends Component {
    render() {
        return (
            <div>

                <div id="list-restaurant">

                    <div className="tag">
                        <div className="container">
                            <div className="row w-100 mx-auto">
                                <a href="" className="btn btn-md px-3">Free Wifi</a>
                            </div>
                        </div>
                    </div>

                    <div className="container">

                        <div className="row">
                            {/* Sidebar */}
                            <div className="left-container col-lg-3 col-md-12 col-sm-12 mb-5 mb-lg-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="header">Kategori</h5>
                                        <p>Cepat saji</p>
                                        <p>Makanan Tradisional</p>

                                        <hr></hr>

                                        <h5 className="header">Lokasi</h5>
                                        <p>Jabodetabek</p>
                                        <p>DKI Jakarta</p>
                                        <p>Kota Bandung</p>
                                        <p>Kota Surabaya</p>

                                        <hr></hr>

                                        <h5 className="header">Harga</h5>

                                        <div className="search-container mb-2">
                                            <strong>Rp. &nbsp;</strong>
                                            <input type="text" placeholder="Minimum"></input>
                                        </div>
                                        <div className="search-container">
                                            <strong>Rp. &nbsp;</strong>
                                            <input type="text" placeholder="Maximum"></input>
                                        </div>

                                        <hr></hr>

                                        <h5 className="header">Rating</h5>
                                        <div className="row p-0 m-0">
                                            <img className="icon" src={ICON.STAR} />&nbsp;<div className="rating">4 keatas</div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="right-container col-lg-9 col-md-12 col-sm-12">

                                <h5 className="tagline">
                                    Menampilkan restoran dengan harga terbaik
                                </h5>

                                {
                                    this.props.state.isLoad === false //Detect if data loading
                                        ?
                                        this.props.state.restaurantList.length > 0 // detect if data exist
                                            ?
                                            this.props.state.restaurantList.map((item, id) => {
                                                return <div key={id}>
                                                    <ListRestaurantCard
                                                        image={item.logo}
                                                        title={item.nama}
                                                        tagline={item.tags}
                                                        rating={"7.2"}
                                                        address={item.alamat}
                                                        price={"15.000"}
                                                        onClick={() => this.props.method.goToPage(`restaurant/${item.id}`)} />
                                                </div>
                                            })
                                            :
                                            <div className="text-center my-5">
                                                <h3 className="empty-placeholder">Hasil tidak ditemukan</h3>
                                            </div>
                                        :
                                        <Loading />
                                }

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
