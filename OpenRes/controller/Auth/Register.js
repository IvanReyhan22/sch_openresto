import React, { Component } from 'react'

import RegisterView from '../../view/auth/RegisterView'
import { USER } from '../../Model/MUser'
import { AuthKey } from '../../system/Collection'

export default class Register extends Component {

    constructor(props) {

        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            role: 'user',
            password_confirmation: '',
            isLoading: false,

            userData: [],

            err_message: '',
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            register: this._register.bind(this),
            setForm: this._setForm.bind(this),
            checkRole: this.checkRole.bind(this)
        }
    }

    componentDidMount = () => {

        if (localStorage.getItem(AuthKey.LOGIN_DATA)) {

            if (localStorage.getItem(AuthKey.BOOKINGID)) {
                this.props.history.push('checkout')
            }

            this.props.history.push('')
        }
    }

    _register = async () => {

        if (this.state.name === '' && this.state.email === '' && this.state.password === '' && this.state.password_confirmation === '') return console.log(this.state)

        if (this.state.password !== this.state.password_confirmation) return this.setState({ err_message: 'password tidak sama' })

        let formData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            password_confirmation: this.state.password_confirmation,
        }

        await USER.REGISTER(formData).then(res => {

            if (USER.data.access_token) {

                let loginData = {
                    access_token: USER.data.access_token,
                    token_type: USER.data.token_type,
                    expires_in: USER.data.expires_in
                }

                localStorage.setItem(AuthKey.LOGIN_DATA, JSON.stringify(loginData))

                console.log(localStorage.getItem(AuthKey.LOGIN_DATA))

                if (localStorage.getItem(AuthKey.LOGIN_DATA)) {
                    this.setState({ loading: !this.state.loading })
                    this.props.history.push('')
                } else {
                    this.setState({
                        err_message: "Please re-enter your login data",
                        loading: !this.state.loading
                    })
                }

            } else {

                this.setState({
                    err_message: "Email or password is incorrect",
                    loading: !this.state.loading
                })

            }

        })

            .catch(
                err => {
                    console.log(err, "@_register");
                }
            );

    }

    _setForm = e => {

        this.setState({
            [e.target.name]: [e.target.value].toString()
        })
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
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
                    userData: USER.data,
                })
                console.log(USER.data.role)
            } else {
                toast.err("Error!")
            }

        })
        
        .catch(err => {
            console.log(err, "CATCH USER DATA RES");

        })
    }

    render() {
        return <RegisterView state={this.state} method={this.method} />
    }
}
