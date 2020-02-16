import React, { Component } from 'react'
import ListRestaurantView from '../view/general/ListRestaurantView'
import Navbar from '../view/components/Navbar'
import { Restaurant } from '../Model/MRestaurant'
import { toast } from 'react-toastify'
import { AuthKey } from '../system/Collection'
import { USER } from '../Model/MUser'

export default class ListRestaurant extends Component {

    constructor(props) {

        super(props)

        this.state = {
            restaurantList: [],
            isLoad: false
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            goBack: this.goBack.bind(this)
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem(AuthKey.BOOKINGID)) {
            this.props.history.push('checkout')
        } else {
            this.getAllRes()
        }

        // this.checkRole()
    }

    getAllRes = async () => {

        this.loadStats();

        await Restaurant.ALL().then(res => {
            // is Data Exist
            if (Restaurant.data) {
                this.setState({
                    restaurantList: Restaurant.data,
                }, () => this.loadStats())
            } else {
                toast.err("Server timed out!")
                this.loadStats()
            }
        })
            .catch(err => {
                console.log(err, "CATCH GET ALL RES");
                this.loadStats();
            });

    }

    loadStats = () => {
        this.setState({ isLoad: !this.state.isLoad }
            // ,()=>console.log(this.state.isLoad,"isLoad")
        )
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    checkRole = async () => {

        const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
        const parse = JSON.parse(storage)

        let headers = {
            token_type: parse.token_type,
            access_token: parse.access_token
        }

        await USER.getUserLogin(headers).then(res => {

            if (USER.data) {
                this.setState({
                    role: USER.data.role
                })
            } else {
                toast.err("Error!")
            }

        })

            .catch(err => {
                console.log(err, "CATCH USER DATA RES");

            })
    }

    render() {
        return (
            <div>
                <Navbar isLogin={localStorage.getItem(AuthKey.LOGIN_DATA)} goBack={() => this.props.history.goBack()} />

                <ListRestaurantView state={this.state} method={this.method} />
            </div>
        )
    }
}
