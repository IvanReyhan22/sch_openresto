import React, { Component } from 'react'
import { ICON, IMAGE } from '../../../assets/images'

export default class TableCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected: false
        }
    }

    bookTable = () => {
        this.setState({
            selected: !this.state.selected
        },()=> this.props.onClick(this.props.meja_id))
    }


    render() {
        return (
            <div id={this.state.selected ? "table-card-active" : "table-card"}>
                <div className="row">
                    <div className="col-4 col-md-3 col-lg-3 pl-0 py-0">
                        <img alt="" src={this.props.foto === null ? IMAGE.TABLE : this.props.foto} className="table-pic" />
                    </div>
                    <div className="col-8 col-md-3 col-lg-9 px-md-2 pl-0 py-3">
                        <h4>Meja No {this.props.no_meja}</h4>

                        <div className="desc">
                            <div className="row w-100 mx-auto align-items-center">
                                <div className="col-6 col-md-4 pl-0">
                                    <h5 className="subtitle">Info Meja</h5>
                                    <p><img src={ICON.BABY} alt="" className="icon" /> {this.props.kapasitas === null ? 0 : this.props.kapasitas} tamu</p>
                                </div>
                                <div className="col-6 col-md-4 px-0">
                                    {/* <h5 className="subtitle">Layanan Gratis</h5>
                                    <p><img src={ICON.BABY} alt="" className="icon" /> 4 tamu (Sofa)</p>
                                    <p><img src={ICON.WIFI} alt="" className="icon" /> Wifi Gratis</p> */}
                                </div>
                                <div className="col-12 col-md-4 px-0  price text-left text-lg-right">
                                    <h4 className="m-0">Rp {this.props.harga === null ? "---" : this.props.harga} </h4>
                                    <p className="text-lg-right">per-reservasi</p>
                                    <button onClick={() => this.bookTable()} className={this.state.selected ? "btn-acc-active" : "btn-acc"}>
                                        {
                                            this.state.selected === true
                                                ?
                                                "Terpilih"
                                                :
                                                "Pilih Meja"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="desc-mobile">
                            <div className="row w-100 mx-auto">
                                <div className="col-6 col-md-4 px-0">
                                    <p><img src={ICON.BABY} alt="" className="icon" /> 4 tamu (Sofa)</p>
                                </div>
                                <div className="col-6 col-md-4 px-0">
                                    <p><img src={ICON.BABY} alt="" className="icon" /> 4 tamu (Sofa)</p>
                                </div>
                                <div className="col-6 col-md-4 px-0">
                                    <p><img src={ICON.WIFI} alt="" className="icon" /> Wifi Gratis</p>
                                </div>
                                <div className="col-12 col-md-4 px-0  price text-left text-lg-right">
                                    <h4>Rp15.000.00,00 <span> / reservasi </span></h4>
                                    <button className={this.state.selected ? "btn-acc-active" : "btn-acc"}>
                                        {
                                            this.state.selected === true
                                                ?
                                                "Terpilih"
                                                :
                                                "Pilih Meja"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
