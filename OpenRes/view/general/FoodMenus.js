import React, { Component } from 'react'
import FoodMenusView from './FoodMenusView'
import Navbar from '../components/Navbar'
import { Restaurant } from '../../Model/MRestaurant'
import { toast } from 'react-toastify'
import { Menus } from '../../Model/MMenus'
import { AuthKey } from '../../system/Collection'

export default class FoodMenus extends Component {

    constructor(props) {

        super(props)

        this.state = {
            resId: this.props.match.params.id,
            restoData: {},
            menu: [],
            foto1: null,
            foto2: null,
            foto3: null,
            idLoad: false,
            rerender: false,

            /**
             * BASKET
             */
            order: [],
            orderPrice: 0
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            goBack: this.goBack.bind(this),
            addOrder: this.addOrder.bind(this),
            removeOrder: this.removeOrder.bind(this),
            checkOut: this.checkOut.bind(this)
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        if (localStorage.getItem(AuthKey.BOOKINGID)) {
            this.props.history.push('checkout')
        }
        this.getData()
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
                }, () => this.getMenus())

            } else {

                toast.err("Server timed out!")
                this.loadStats()

            }
        })
            .catch(err => {
                console.log(err, "CATCH RES DAta");
                this.loadStats();
            });

    }

    checkOut = () => {
        /**
         * Restoran id, 
         * meja Id[], 
         * menu id[], 
         * qty [], 
         * mulai date time (2020-01-28 14:00:00), 
         * selesai date time (2020-01-28 15:00:00)
         */

        if (localStorage.getItem(AuthKey.LOGIN_DATA)) {

            const ref = this.props.location.state
            console.log(this.state.order)
            this.props.history.push({
                pathname: '/checkout',
                state: {
                    restoran_id: ref.restoran_id,
                    meja_id: ref.meja_id,
                    menu_id: null,
                    qty: null,
                    mulai_date: ref.mulai_date,
                    selesai_date: ref.selesai_date,
                    reservationFee: ref.reservationFee,
                    order: this.state.order,
                    orderPrice: this.state.orderPrice
                }
            })

        } else {

            toast.warn("Mohon login terlebih dahulu")
            this.props.history.push('/login')

        }

    }

    removeOrder = (itemId, price, itemQuantity) => {
        console.log("remove triggered")
        console.log("item id " + itemId + " price " + price + " quantity " + itemQuantity)
        /**
         * Search item id in array object order
         */
        const result = this.state.order.find(({ id }) => id === itemId);

        if (result) {

            // Get Item index based on id
            const arryIndex = this.state.order.findIndex((obj => obj.id === itemId));

            // Add quantity of an item
            this.state.order[arryIndex].quantity = itemQuantity;

            //Add Price
            console.log(this.state.order[arryIndex].harga + ' - ' + price)
            this.state.order[arryIndex].harga = this.state.order[arryIndex].harga - price;

            if (itemQuantity === 0) {
                this.state.order.splice(arryIndex, 1)
            }

            /**
             * SUM all harga in array object order with array.reduce function
             */
            var orderPrice = this.state.order.reduce(function (prev, cur) {

                return prev + cur.harga;

            }, 0);

            this.setState({ orderPrice: orderPrice });

        }

    }

    addOrder = (id, title, price) => {
        let orderPrice = 0;

        let order = {
            id: id,
            nama: title,
            quantity: 1,
            harga: price
        };

        if (this.state.order.length > 0) {

            /**
             * Search item id in array object order
             */
            const result = this.state.order.find(({ id }) => id === order.id);

            if (result) {

                // Get Item index based on id
                const arryIndex = this.state.order.findIndex((obj => obj.id === order.id));

                // Add quantity of an item
                this.state.order[arryIndex].quantity = this.state.order[arryIndex].quantity + 1;

                //Add Price
                this.state.order[arryIndex].harga = this.state.order[arryIndex].harga + order.harga;

            } else {

                // Add item in state order
                this.state.order.push(order);

            }

        } else {

            this.state.order.push(order);

            this.setState({
                orderPrice: orderPrice
            });

        }

        /**
         * SUM all harga in array object order with array.reduce function
         */
        orderPrice = this.state.order.reduce(function (prev, cur) {

            return prev + cur.harga;

        }, 0);

        this.setState({ orderPrice: orderPrice });

    }

    getMenus = async () => {

        await Menus.ALL().then(res => {

            if (Menus.data) {
                this.setState({
                    menu: Menus.data,
                    isLoad: !this.state.isLoad
                })
            }

        })
            .catch(err => {
                console.log(err, "CATCH RES DAta");
                this.loadStats();
            });

    }

    loadStats = () => {
        this.setState({ isLoad: !this.state.isLoad }
            // , () => console.log(this.state.isLoad, "isLoad")
        )
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return <div>
            <Navbar goBack={() => this.props.history.goBack()} />

            <FoodMenusView state={this.state} method={this.method} />

        </div>
    }
}
