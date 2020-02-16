import React, { Component } from 'react'
import ManagePesananView from '../../view/admin/ManagePesananView'
import { MCheckout } from '../../Model/MCheckout'
import { AuthKey } from '../../system/Collection'
import { toast } from 'react-toastify'

export default class ManagePesanan extends Component {

    constructor(props) {
        super(props)

        this.state = {
            booking: [],

            /**
             * EDIT PANEL
             */
            selectedItem: null,
            menu: [],

            listLoading: false
        }

        this.method = {
            setPanel: this.setPanel.bind(this),
            bookingConfirm: this.bookingConfirm.bind(this),
            bookingCancel: this.bookingCancel.bind(this)
        }

    }

    componentDidMount = () => {
        this.getAllBooking()

    }

    bookingCancel = async () => {
        console.log("CANCEL")
        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        await MCheckout.CANCEL_RESERVATION(headers, this.state.selectedItem.no_transaksi).then(res => {

            if (MCheckout.data.status === 200) {
                toast.success("Pesanan berhasil di batalkan")
                this.setState({
                    selectedItem: null,
                    menu: []
                }, () => this.getAllBooking())
            } else {
                toast.warn("Mohon ulang lagi")
            }
        })
            .catch(err => {
                console.log(err, "CANCEL CHECOUT");
                this.loadStats();
            });

    }

    bookingConfirm = async () => {
        console.log("CONFIRM")
        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        await MCheckout.UPDATE_RESERVATION(headers, this.state.selectedItem.no_transaksi, 1).then(res => {

            if (MCheckout.data.status === 200) {
                toast.success("Pesanan berhasil di konfirmasi")
                this.setState({
                    selectedItem: null,
                    menu: []
                }, () => this.getAllBooking())
            } else {
                toast.warn("Mohon ulang lagi")
            }
        })
            .catch(err => {
                console.log(err, "konfirm CHECOUT");
                this.loadStats();
            });

    }

    setPanel = (item) => {
        this.setState({
            selectedItem: item,
            menu: item.menu
        }, () => console.log(this.state.selectedItem))
    }

    getAllBooking = async () => {
        this.setListLoading()

        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        await MCheckout.ALL(headers).then(res => {

            if (MCheckout.data.length > 0) {

                this.setState({
                    booking: MCheckout.data,
                }, () => this.setListLoading())

            } else {

                this.setListLoading()

            }


        })

    }


    setListLoading = () => {
        this.setState({ listLoading: !this.state.listLoading })
    }

    render() {
        return <ManagePesananView state={this.state} method={this.method} />
    }
}
