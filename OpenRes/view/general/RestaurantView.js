import React, { Component } from 'react'

import '../../assets/scss/Restaurant.css'

import { IMAGE, ICON } from '../../assets/images'
import HorizontalCategory from '../components/card/HorizontalCategory'
import FasilitasCard from '../components/card/FasilitasCard'
import TableCard from '../components/card/TableCard'
import Loading from '../components/Loading'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class RestaurantView extends Component {

    render() {
        const restoData = this.props.state.restoData
        return (
            <div>

                <div id="restaurant">

                    {/* Heading */}
                    <div className="row w-100 mx-auto">

                        <div className="col-12 col-md-6 col-lg-7 px-0">
                            <img src={this.props.state.foto1} className="big-image" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 pr-0">
                            <img src={this.props.state.foto2} className="big-image2" />
                            <div className="row w-100 mx-auto">
                                <div className="col-6 pl-0">
                                    <img src={this.props.state.foto3} className="big-image2" />
                                </div>
                                <div className="col-6 pr-0">
                                    <img src={restoData.logo} className="big-image2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">

                        <div className="row">
                            {/* Content */}
                            <div className="col-12 col-md-8 col-lg-8 ">

                                {
                                    this.props.state.isLoad === false
                                        ?
                                        <div>
                                            <HorizontalCategory title="Free Wifi" className="category" />

                                            <h1 className="resto-name mt-3">{restoData.nama}</h1>
                                            <p>{restoData.tags}</p>

                                            <div className="address mb-2">
                                                {restoData.alamat}
                                            </div>

                                            <p>
                                                <img src={ICON.STAR} alt="" className="icon" /> 4.8
                                                &nbsp; <img src={ICON.TELEPHONE} alt="" className="icon" /> +62 8209-090-000
                                            </p>
                                        </div>
                                        :
                                        <Loading />
                                }

                                <div className="hr"></div>

                                <h4>Fasilitas</h4>

                                <div className="fasilitas">

                                    <FasilitasCard
                                        title={"WIFI"}
                                        image={ICON.WIFI} />

                                    <FasilitasCard
                                        title={"Kursi Anak"}
                                        image={ICON.BABY} />

                                    <FasilitasCard
                                        title={"Parkir Mobil"}
                                        image={ICON.PARKED_CAR} />

                                </div>

                                <div className="hr"></div>

                                <h4>Pilih meja sesuai dengan kebutuhanmu</h4>

                                {
                                    this.props.state.isLoad === false
                                        ?
                                        this.props.state.tableData.map((item, id) => {
                                            if (item.status === "Available") {
                                                return <div className="mb-4" key={id}>
                                                    <TableCard
                                                        meja_id={item.meja_id}
                                                        no_meja={item.no_meja}
                                                        foto={item.foto}
                                                        kapasitas={item.kapasitas}
                                                        harga={item.harga}
                                                        onClick={(meja_id) => this.props.method.bookTable(meja_id, item.harga)}
                                                    />
                                                </div>
                                            }
                                        })
                                        :
                                        <Loading />
                                }

                            </div>

                            {/* Sidebar */}
                            <div className="col-12 col-md-4 col-lg-4">

                                <div className="sidebar">

                                    <div className="sidebar-head">
                                        <h4 style={{ display: 'inline-block' }} className="w-50">Rp {this.props.state.reservationFee}</h4><p style={{ display: 'inline-block' }} className="w-50 text-right">biaya reservasi</p>
                                    </div>

                                    <div className="hr"></div>

                                    <div className="inpt-container my-3">
                                        <label>Dari waktu</label>
                                        <div>
                                            <DatePicker
                                                selected={this.props.state.startDate}
                                                onChange={(date) => this.props.method.setDate("startDate", date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm:00"
                                            />
                                        </div>

                                        <br></br>

                                        <label>Sampai Waktu</label>
                                        <div>
                                            <DatePicker
                                                selected={this.props.state.endDate}
                                                onChange={(date) => this.props.method.setDate("endDate", date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm:00"
                                            />
                                        </div>
                                    </div>

                                    <button className="btn-acc mt-4 mb-3" onClick={() => this.props.method.goToPage(`menu/${this.props.state.resId}`)}>Lanjut pilih makanan</button>
                                    <p className="text-center checkout" onClick={() => this.props.method.goToPage("checkout")}>atau checkout</p>

                                    <div className="hr"></div>

                                    <p className="mt-2">
                                        Pesanan akan dibatalkan secara otomatis apabila belum ada konfirmasi terhadap pihak restoran dalam kurun waktu 15 menit atau lebih sebelum waktu yang ditentukan
                                    </p>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
