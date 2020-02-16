import React, { Component } from 'react'
import CheckoutView from '../view/general/CheckoutView'
import { MCheckout } from '../Model/MCheckout'
import { toast } from 'react-toastify'
import { AuthKey } from '../system/Collection'


export default class Checkout extends Component {

    constructor(props) {

        super(props)

        this.state = {
            /**
             * show
             */
            transaction_id: null,
            user: null,
            restoran: null,
            status: null,
            sMeja: null,
            sMenu: null,


            restoran_id: null,
            meja_id: [],
            menu_id: [],
            qty: [],
            mulai_date: null,
            selesai_date: null,

            order: [],

            orderPrice: null,
            reservationFee: null,
            totalPayment: null,

            bookingSuccess: false
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            CancelBooking: this.CancelBooking.bind(this)
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        if (localStorage.getItem(AuthKey.BOOKINGID)) {
            console.log("EXIST")
            this.CheckoutReport(localStorage.getItem(AuthKey.BOOKINGID));
        } else {
            console.log("NOT EXIST")
            this.getData();
        }
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }

    CancelBooking = async () => {
        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        const transaction_id = localStorage.getItem(AuthKey.BOOKINGID);

        await MCheckout.CANCEL_RESERVATION(headers, transaction_id).then(res => {
            if (MCheckout.data.status === 200) {
                localStorage.removeItem(AuthKey.BOOKINGID)
                toast.success("Pesanan berhasil di batalkan")
                this.goToPage('')
            } else {
                toast.warn("Mohon ulang lagi")
            }
        })
            .catch(err => {
                console.log(err, "CANCEL CHECOUT");
                this.loadStats();
            });

    }

    CheckoutReport = async (transaction_id) => {
        console.log(transaction_id,"ID")
        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        await MCheckout.RESERVATION_BY_ID(headers, transaction_id).then(res => {

            if (MCheckout.data.no_transaksi) {
                this.setState({
                    transaction_id: transaction_id,
                    user: MCheckout.data.user,
                    restoran: MCheckout.data.restoran,
                    status: MCheckout.data.status,
                    totalPayment: MCheckout.data.total_harga,
                    sMeja: MCheckout.data.meja,
                    sMenu: MCheckout.data.menu,
                    bookingSuccess:true
                })
            } else {
                console.log("DATA EMPTY")
            }

        })
            .catch(err => {
                console.log(err, "REPORT CHECKOUT");
                this.loadStats();
            });

    }

    /**
     * Boooking process
     */
    CheckoutFunct = async () => {

        /**
         * Restoran id,
         * meja Id[],
         * menu id[],
         * qty [],
         * mulai date time (2020-01-28 14:00:00), 
         * selesai date time (2020-01-28 15:00:00)
         */
        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        let formData = null
        formData = new FormData();

        if (this.state.order.length > 0) {
            console.log("RUN ORDER")
            formData.append('restoran_id', parseInt(this.state.restoran_id));
            formData.append('meja_id[]', this.state.meja_id);
            formData.append('mulai', this.state.mulai_date);
            formData.append('selesai', this.state.selesai_date);
            formData.append('menu_id[]', this.state.menu_id);
            formData.append('qty[]', this.state.qty);

        } else {
            console.log("RUN WITHOUR ORDER")
            formData.append('restoran_id', parseInt(this.state.restoran_id));
            formData.append('meja_id[]', this.state.meja_id);
            formData.append('mulai', this.state.mulai_date);
            formData.append('selesai', this.state.selesai_date);
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1], "DATA");
        }

        await MCheckout.RESERVATION(headers, formData).then(res => {

            console.log(MCheckout.data, "RESPONSE")
            if (MCheckout.data.message === "Unauthenticated.") {
                toast.error("mohon login terlebih dahulu");
                localStorage.removeItem(AuthKey.LOGIN_DATA);
                this.goToPage('login');
            } else if (MCheckout.data.no_transaksi) {
                localStorage.setItem(AuthKey.BOOKINGID, MCheckout.data.no_transaksi);
                this.CheckoutReport(MCheckout.data.no_transaksi);
            } else {
                this.goToPage('list-restaurant');
                console.log(MCheckout.data, "Err #CheckoutFunct");
            }

        })
            .catch(err => {
                console.log(err, "CHECKOUT");
                this.loadStats();
            });

    }

    /**
     * GET booking table,booking time and menu order from
     * previous screen
     */
    getData = () => {
        /**
         * Restoran id, **
         * meja Id[],
         * menu id[],
         * qty [],
         * mulai date time (2020-01-28 14:00:00), 
         * selesai date time (2020-01-28 15:00:00)
         */
        const ref = this.props.location.state;

        console.log(ref.order.length,"CHECKOUT REF IF length")
        console.log(ref.order.length !== 0,"CHECKOUT REF IF")

        if (ref.order.length !== 0) {
            this.setState({
                restoran_id: ref.restoran_id,
                meja_id: ref.meja_id,
                menu_id: ref.order,
                qty: ref.order,
                mulai_date: ref.mulai_date,
                selesai_date: ref.selesai_date,
                order: ref.order,
                orderPrice: ref.orderPrice,
                reservationFee: ref.reservationFee,
                totalPayment: ref.orderPrice + ref.reservationFee
            }, () => {

                /**
                 * convert menu_id array object into original array consist of menu id
                 */
                var arr_menu_id = this.state.menu_id.map(function (obj) {
                    return obj.id
                })

                arr_menu_id.join(", ")


                /**
                 * convert meja id array object into original array consist of meja id
                 */
                var arr_meja_id = this.state.meja_id.map(function (obj) {
                    return obj.id
                })

                /**
                 * convert menu id array object into original array consist of meja id
                 */
                var arr_menu_qyt = this.state.menu_id.map(function (obj) {
                    return obj.quantity
                })

                console.log(this.state,"AFTER FORMATING BEFORE SUMBITTING")

                this.setState({
                    menu_id: arr_menu_id.join(", "),
                    meja_id: arr_meja_id.join(", "),
                    qty: arr_menu_qyt.join(", ")
                }, () => this.CheckoutFunct())

            })

        } else {
            console.log("GANOK CUK REF.ORDER BLA BLA BLA")
            this.setState({
                restoran_id: ref.restoran_id,
                meja_id: ref.meja_id,
                mulai_date: ref.mulai_date,
                selesai_date: ref.selesai_date,
            }, () => {

                /**
                 * convert meja id array object into original array consist of meja id
                 */
                var arr_meja_id = this.state.meja_id.map(function (obj) {
                    return obj.id
                })

                this.setState({
                    meja_id: arr_meja_id.join(", "),
                }, () => this.CheckoutFunct())

            })
        }

    }

    render() {
        return <CheckoutView state={this.state} method={this.method} />
    }
}
