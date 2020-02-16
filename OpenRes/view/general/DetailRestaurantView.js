import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import '../../assets/scss/detail_restaurant.css'

export default class DetailRestaurantView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                
                <div className="container">
                    <div className="row">
                        <div className="description col-8">
                            <div className="title">
                                <h5>Burger King dekat Alun - Alun Kota Surabaya</h5>
                                <p>Cepat saji, Burger, Barat</p>
                            </div>
                            <div className="desc">
                                <div className="alamat">
                                    Jalan Ciujung No 7, Purwantoro , Blimbing, Surabaya Pusat, Surabaya, Indonesia, 65126 
                                </div>
                                <div className="rating"></div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5>Rp0,00</h5>biaya reservasi

                                    <hr></hr>
                                    
                                    <input></input>
                                    <input></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
