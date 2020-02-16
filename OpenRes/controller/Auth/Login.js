import React, { Component } from 'react'

import LoginView from '../../view/auth/LoginView'
import { AuthKey } from '../../system/Collection'
import { USER } from '../../Model/MUser'
import { toast } from 'react-toastify'

export default class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            isLoading: false,
            role: '',
            err_message: '',
        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            login: this._login.bind(this),
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

    _login = async () => {

        if (this.state.email === '' && this.state.password === '') return this.setState({ err_message: 'Masih ada data kosong' })

        let formData = {
            email: this.state.email,
            password: this.state.password,
        }

        await USER.LOGIN(formData).then(res => {

            if (USER.data.access_token) {

                let loginData = {
                    access_token: USER.data.access_token,
                    token_type: USER.data.token_type,
                    expires_in: USER.data.expires_in
                }

                localStorage.setItem(AuthKey.LOGIN_DATA, JSON.stringify(loginData))

                if (localStorage.getItem(AuthKey.LOGIN_DATA)) {

                    this.setState({ loading: !this.state.loading })

                    this.checkRole()

                } else {
                    this.setState({
                        err_message: "Please re-enter your login data",
                        loading: !this.state.loading
                    })
                }

            } else {

                this.setState({
                    err_message: "Email or password salah",
                    loading: !this.state.loading,
                })
                toast.warning("Email atau password Anda alah, silahkan ulangi kembali")

            }

        })

            .catch(
                err => {
                    console.log(err, "@_login");
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

        await USER.GETUSERLOGIN(headers).then(res => {
            
            if (USER.data) {
                this.setState({
                    role: USER.data.role,
                    name: USER.data.nama
                })
                if (this.state.role === "superadmin") {
                    this.props.history.push('')
                    toast.success("Super Admin")
                    console.log("Login as superAdmin")
                } else if (this.state.role === "user") {
                    this.props.history.push('')
                    toast.success(`Selamat Datang ${USER.GETUSERLOGIN.data.nama}`)
                    console.log("Login as User")
                } else if (this.state.role === "admin") {
                    toast.success(`Admin Restaurant ${this.state.name}`)
                    this.props.history.push('/r/dashboard')
                }

            } else {
                toast.err("Error!")
            }

        })

            .catch(err => {
                console.log(err, "CATCH USER DATA RES");

            })
    }

    render() {
        return <LoginView state={this.state} method={this.method} />
    }
}
