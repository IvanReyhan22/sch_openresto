import React, { Component } from 'react'
import { IMAGE, ICON } from '../../../assets/images'

export default class ListRestaurantCard extends Component {
    render() {
        return (
            <div id="restaurant-card" onClick={() => this.props.onClick("restaurant")}>
                <div className="card">
                    <div className="card-body p-0">
                        <div className="row w-100 mx-auto"> {/* Row Container */}
                            
                            <div className="img col-4 col-md-3">
                                <img src={this.props.image === undefined ? IMAGE.RESTAURANT : this.props.image}></img>
                            </div>

                            <div className="desc col-8 col-md-6">
                                <h4 className="title">{this.props.title}</h4>
                                <div className="tagline mt-2 mb-0 my-md-0">{this.props.tagline}</div>
                                <div className="breadcum-container">
                                    <a href="" className="btn btn-sm px-3">Free Wifi</a>
                                    <a href="" className="btn btn-sm px-3">Pembatalan Gratis</a>
                                    <a href="" className="btn btn-sm px-3">Ulang Tahun</a>
                                </div>
                                <div className="desc2">
                                    <div className="row w-100 mx-auto mt-0 align-items-center">
                                        <div className="col-2 pl-0">
                                            <img className="icon" src={ICON.STAR} />
                                        </div>
                                        <div className="col-10 pl-0">
                                            <div className="rating">{this.props.rating}</div>
                                        </div>
                                        <div className="col-2 pl-0">
                                            <img className="icon" src={ICON.LOCATION} />
                                        </div>
                                        <div className="col-10 pl-0">
                                            <div className="rating">{this.props.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="prices col-12 col-md-3 px-3">
                                <div className="row w-100 mx-auto align-items-center pb-2">
                                    <div className="col-7 px-0">
                                        <div className="rating">
                                            <h5 className="title">Sangat Baik</h5>
                                            {/* <div className="value">732 ulasan</div> */}
                                        </div>
                                    </div>
                                    <div className="col-5 pr-0">
                                        <button>
                                            Lihat Resto
                                        </button>
                                    </div>
                                </div>
                                <h5 className="total">
                                    Harga mulai dari
                                    <div className="harga">
                                        Rp {this.props.price},00
                                    </div>
                                </h5>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
