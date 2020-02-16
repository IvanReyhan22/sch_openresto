import React, { Component } from 'react'
import RestaurantView from '../view/general/RestaurantView'
import Navbar from '../view/components/Navbar'
import { Restaurant } from '../Model/MRestaurant'
import { Table } from '../Model/MTable'
import { toast } from 'react-toastify'
import { AuthKey } from '../system/Collection'

export default class RestaurantScreen extends Component {

    constructor(props) {

        super(props)

        this.state = {
            resId: this.props.match.params.id,
            restoData: {},
            foto1: null,
            foto2: null,
            foto3: null,
            tableData: null,
            idLoad: false,

            //table
            bookTable: [],
            reservationFee: 0,

            startDate: new Date(),
            endDate: new Date(),
            startBookingDate: null, //parsed 
            endBookingDate: null, //parsed 
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            goBack: this.goBack.bind(this),
            bookTable: this.bookTable.bind(this),
            setDate: this.setDate.bind(this)
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem(AuthKey.BOOKINGID)) {
            this.props.history.push('checkout')
        } else {
            this.getData()
        }
    }

    setDate = (pointState, date) => {

        this.setState({
            [pointState]: date
        }, () => {

            this.setState({
                startBookingDate: this.formatDate(this.state.startDate),
                endBookingDate: this.formatDate(this.state.endDate)
            })

        })


    }

    bookTable = (itemId, price) => {

        let table = {
            id: itemId,
            price: price
        };

        const result = this.state.bookTable.find(({ id }) => id === table.id);

        if (result) {

            // Get Item index based on id
            const arryIndex = this.state.bookTable.findIndex((obj => obj.id === table.id));

            // Remove item
            this.state.bookTable.splice(arryIndex, 1)

        } else {

            // Add booking table 
            this.state.bookTable.push(table)

        }

        /**
         * SUM all harga in array object order with array.reduce function
         */
        var bookPrice = this.state.bookTable.reduce(function (prev, cur) {

            return prev + cur.price;

        }, 0);

        this.setState({
            reservationFee: bookPrice
        })

    }

    getRestoTable = async () => {

        await Restaurant.GET_WITH_TABLE(this.state.resId).then(res => {

            if (Restaurant.data) {

                this.setState({ tableData: Restaurant.data.meja }, () => this.loadStats())

            }

        })
            .catch(err => {
                console.log(err, "CATCH RES DAta");
                this.loadStats();
            });
    }

    getData = async () => {

        this.loadStats();

        await Restaurant.GET_ID(this.state.resId).then(res => {

            if (Restaurant.data) {

                let fotoFile = Restaurant.data.foto;
                const split = fotoFile.split(',')

                this.setState({
                    restoData: Restaurant.data,
                    foto1: split[0],
                    foto2: split[1],
                    foto3: split[2]
                }, () => this.getRestoTable())

            } else {
                toast.err("Server timed out!")
            }
        })
            .catch(err => {
                console.log(err, "CATCH RES DAta");
                this.loadStats();
            });

    }

    goToPage = (request) => {
        if (this.state.startBookingDate && this.state.endBookingDate && this.state.bookTable) {
            this.props.history.push({
                pathname: `/${request}`,
                state: {
                    restoran_id: this.state.resId,
                    meja_id: this.state.bookTable,
                    menu_id: null,
                    qty: null,
                    mulai_date: this.state.startBookingDate,
                    selesai_date: this.state.endBookingDate,
                    reservationFee: this.state.reservationFee,
                }
            });
        } else {
            toast.warn("Mohon tentukan meja dan waktu pemesanan.")
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    loadStats = () => {
        this.setState({ isLoad: !this.state.isLoad }
            // , () => console.log(this.state.isLoad, "isLoad")
        )
    }

    formatDate(date) {

        var day = date.getDate() < 10 ? 0 + '' + date.getDate() : date.getDate();
        var monthIndex = date.getMonth() < 10 ? 0 + '' + date.getMonth() : date.getMonth();
        var year = date.getFullYear();

        var hour = date.getHours() < 10 ? 0 + '' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? 0 + '' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? 0 + '' + date.getSeconds() : date.getSeconds();

        var returnDate = year + '-' + monthIndex + '-' + day + ' ' + hour + ":" + minutes + ":" + second

        return returnDate

    }


    render() {
        return <div>
            <Navbar goBack={() => this.props.history.goBack()} />

            <RestaurantView state={this.state} method={this.method} />

        </div>
    }
}
