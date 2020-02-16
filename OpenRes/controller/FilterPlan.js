import React, { Component } from 'react'

import FilterPlanView from '../view/general/FilterPlanView'
import { AuthKey } from '../system/Collection'
import { toast } from 'react-toastify'
import { USER } from '../Model/MUser'

export default class Home extends Component {

    constructor(props) {

        super(props)

        this.state = {
            nama: '',
            email: ''
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            goBack: this.goBack.bind(this),
            checkRole: this.checkRole.bind(this)
        }
    }

    componentDidMount(){
        if(localStorage.getItem(AuthKey.LOGIN_DATA)) {
            console.log(localStorage.getItem(AuthKey.LOGIN_DATA))
            this.checkRole()
        }
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
                    nama: USER.data.nama,
                    email: USER.data.email,
                })
                // console.log("NAMA", this.state.nama)
                toast.success(`Selamat datang ${this.state.nama}`)

            } else {
                toast.err("Error!")
            }

        })

            .catch(err => {
                console.log(err, "CATCH USER DATA RES");

            })
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return <FilterPlanView method={this.method} />
    }
}
