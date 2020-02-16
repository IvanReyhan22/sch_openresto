import React, { Component } from 'react'


import Countdown from "react-countdown-now";
import '../../assets/scss/checkout.css'
import { LOGO } from '../../assets/images'
import Loading from '../components/Loading';

export default class CheckoutView extends Component {

    componentDidMount = () => {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div id="checkout">

                <div className="head">

                    <div class="container">

                        <div className="row mb-5">
                            {/* LOGO */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <img src={LOGO.LOGO} alt="" className="logo" />
                            </div>
                            {/* Profile Restorant */}
                            {
                                this.props.state.bookingSuccess
                                    ?
                                    <div className="col-12 col-md-6 col-lg-6 profle-restaurant">

                                        <div>
                                            <p>{this.props.state.restoran.nama}</p>
                                            <p>{this.props.state.restoran.tags}</p>
                                            <p>{this.props.state.restoran.alamat}</p>
                                        </div>

                                    </div>
                                    :
                                    <div></div>
                            }

                        </div>

                        <div style={{ marginBottom: 100 }}></div>
                        {
                            this.props.state.bookingSuccess
                                ?
                                <div className="row mt-5">
                                    {/* User Profile */}
                                    <div className="col-12 col-md-6 col-lg-6 user-profile">
                                        <h4>Pelanggan</h4>
                                        <p>{this.props.state.user.nama}</p>
                                        <p>{this.props.state.user.email}</p>
                                        <p>Saldo Rp. <p>{this.props.state.user.saldo}</p></p>
                                    </div>
                                    {/* Booking detail */}
                                    <div className="col-12 col-md-6 col-lg-6 booking-detail">
                                        <h2>Pesanan Anda</h2>

                                        <h3>No Pesanan</h3>
                                        <p>{this.props.state.transaction_id}</p>

                                        <h3>Status Pesanan</h3>
                                        <p>{this.props.state.status}</p>
                                    </div>
                                </div>
                                :
                                <div style={{ marginTop: 5 * 30 }} className="text-center">
                                    <h3>Sedang memproses pesanan...</h3>
                                    <Loading />
                                </div>
                        }


                    </div>

                </div>

                <div className="body">

                    <div className="container table-responsive">
                        <div className="table-responsive">
                            <table className="table table-borderless">
                                <thead className="thead">
                                    <tr className="tr">
                                        <th scope="col">Deskripsi Pesanan</th>
                                        <th scope="col" className="text-center">Jumlah</th>
                                        <th scope="col" className="text-right" align="right">Total Harga</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.props.state.bookingSuccess === true
                                            ?
                                            this.props.state.sMenu !== 0
                                                ?
                                                this.props.state.sMenu.map((item, id) => {
                                                    return <tr key={id}>
                                                        <td scope="row">{item.nama}</td>
                                                        <td className="text-center">{item.qty}</td>
                                                        <td className="text-right">Rp. {item.harga}</td>
                                                    </tr>
                                                })
                                                :
                                                <div></div>
                                            :
                                            <td colSpan="3" className="mb-3">
                                                <Loading />
                                            </td>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="timeline">
                                    <p>
                                        Konfirmasi dan bayar pesanan anda sebelum waktu yang telah ditentukan habis.
                                    </p>
                                    <h1>
                                        Batas Waktu  <Countdown date={this.props.state.bookingSuccess === true ? Date.now() + 7200000 : Date.now() + 0} />
                                    </h1>
                                    {
                                        this.props.state.status === "Not Paid"
                                            ?
                                            <button onClick={() => this.props.method.CancelBooking()}>
                                                Batalkan Pesanan
                                            </button>
                                            :
                                            <div>
                                                <h3>Pesanan Dikonfirmasi</h3>
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-md-6 total">
                                {
                                    this.props.state.bookingSuccess
                                        ?
                                        <div className="item">
                                            <h3>
                                                SUBTOTAL
                                        </h3><h5>
                                                Rp {this.props.state.sMenu[0].subtotal}
                                            </h5>
                                        </div>
                                        :
                                        <div></div>
                                }
                                <div className="item">
                                    <h3>
                                        Biaya Reservasi
                                    </h3><h5>
                                        Rp {this.props.state.bookingSuccess === true ? this.props.state.sMeja[0].subtotal : "---"}
                                    </h5>
                                </div>
                                <h3>
                                    Total
                                </h3><h1>
                                    Rp {this.props.state.bookingSuccess === true ? this.props.state.totalPayment : "---"}
                                </h1>

                                {
                                    this.props.state.status === "Not Paid"
                                        ?
                                        <button className="lg-hide" onClick={() => this.props.method.CancelBooking()}>
                                            Batalkan Pesanan
                                        </button>
                                        :
                                        <div>
                                            <h3>Pesanan Dikonfirmasi</h3>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
