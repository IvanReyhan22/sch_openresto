import React, { Component } from 'react'
import ProfileView from '../view/general/ProfileView'
import { AuthKey } from '../system/Collection'
import { Restaurant } from '../Model/MRestaurant'

export default class Profile extends Component {
 
    constructor(props) {

        super(props)

        this.state = {
            restaurantList: [],
            isLoad:false
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            goBack: this.goBack.bind(this),
            logout: this._logout.bind(this)
        }
    }
    componentDidMount = () => {

        if (localStorage.getItem(AuthKey.LOGIN_DATA)) {
            console.log(localStorage.getItem(AuthKey.LOGIN_DATA))
            // this.props.history.push('')
        }
        // this.getAllRes()

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

    _logout = () => {

        localStorage.removeItem(AuthKey.LOGIN_DATA)

        this.goToPage("login")

    }

    render() {
        return <ProfileView method={this.method} state={this.state} />
    }
}
