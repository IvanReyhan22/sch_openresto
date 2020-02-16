import React, { Component } from 'react'

import '../../assets/scss/food_menus.css'

import { IMAGE, ICON } from '../../assets/images'
import HorizontalCategory from '../components/card/VerticalCategory'
import INPUTWithIcon from '../components/input/INPUTWithIcon'
import PrimaryBtn from '../components/btn/PrimaryBtn'
import MenusCard from '../components/card/MenusCard'
import Loading from '../components/Loading'

export default class FoodMenusView extends Component {

    render() {
        return (
            <div>
                <div id="food-menu">
                    <div className="restaurant-front">
                        <img src={this.props.state.foto1} className="big-hero" />
                        <div className="mask"></div>
                        <div className="m-auto">
                            <h1>{this.props.state.restoData.nama}</h1>
                            <div className="hr mx-auto"></div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        {/* <h3>Kategori</h3>

                        <div>
                            <HorizontalCategory highlight
                                src={ICON.CHEF}
                                title={"Semua"}
                            />

                            <HorizontalCategory
                                src={ICON.FORK}
                                title={"Makanan"}
                            />

                            <HorizontalCategory
                                src={ICON.BEER}
                                title={"Minuman"}
                            />

                            <HorizontalCategory
                                src={ICON.ICE_CREAM}
                                title={"Penutup"}
                            />

                            <HorizontalCategory
                                src={ICON.BREAD}
                                title={"Sarapan"}
                            />
                            <div style={{ display: 'inline-block' }} className="custom-caption mt-4 mt-lg-0">
                                <h3>
                                    Atur menu pemesananmu
                                    sendiri
                                    <span>
                                        <img className="icon" src={ICON.ARROW_BLACK_LONG} />
                                    </span>
                                </h3>
                            </div>

                        </div> */}

                        <h3>Menu</h3>

                        <div className="row w-100 mx-auto mt-5">

                            <div className="col-12 col-md-7 col-lg-8 mt-2 mb-4 content pl-0">

                                <INPUTWithIcon />

                                <div className="my-5">

                                    {
                                        this.props.state.isLoad === false
                                            ?
                                            this.props.state.menu.map((item, id) => {
                                                return <div className="mb-5" key={id}>
                                                    <MenusCard
                                                        photo={item.foto}
                                                        title={item.nama}
                                                        desc={item.deskripsi}
                                                        price={item.harga}
                                                        onValueChangeMinus = {(itemValue)=>this.props.method.removeOrder(item.id,item.harga, itemValue)}
                                                        onValueChange={() => this.props.method.addOrder(item.id, item.nama, item.harga)} />
                                                </div>
                                            })
                                            :
                                            <Loading />
                                    }

                                </div>

                            </div>


                            {/* SIDEBAR */}
                            <div className="col-12 col-md-5 col-lg-4 pr-2 pr-lg-0">

                                <div className="sidebar">

                                    <h5>Keranjang :</h5>

                                    <div className="item">

                                        {
                                            this.props.state.order.map((item, id) => {
                                                return <div className="row w-100 mx-auto" key={id}>
                                                    <div className="col-8 pl-0">
                                                        <h5 className="name">{item.nama}</h5>
                                                    </div>
                                                    <div className="col-1">
                                                        <h5 className="quantity">{item.quantity}</h5>
                                                    </div>
                                                    <div className="col-3 text-right pr-0">
                                                        <h4 className="price">{item.harga}</h4>
                                                    </div>
                                                </div>
                                            })
                                        }

                                    </div>


                                    <div className="SUM">
                                        <h5>
                                            Total 
                                    </h5><h5 className="total text-right">
                                            Rp <span>{this.props.state.orderPrice}</span>
                                        </h5>

                                        <div className="text-right">
                                            <PrimaryBtn
                                                onClick={() => this.props.method.checkOut()}
                                                title="Bayar" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
