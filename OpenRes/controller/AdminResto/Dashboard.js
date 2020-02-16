import React, { Component } from 'react'
import DashboardView from '../../view/AdminResto/DashboardView'
import { AuthKey } from '../../system/Collection'
import { USER } from '../../Model/MUser'

export default class Dashboard extends Component {

    constructor(props) {

        super(props)

        this.state = {
            id: '',
            nama: '',
            email: '',
            foto: '',
            role: '',
            id_res: '',
            nama_res: '',
            tags_res: '',
            alamat_res: '',
            logo_res: '',
            foto_res: ''
        }

        this.method = {
            checkRole: this.checkRole.bind(this)
        }
    }

    componentDidMount = () => {

        if (localStorage.getItem(AuthKey.LOGIN_DATA)) {
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

        await USER.GETUSERLOGIN (headers).then(res => {

            if (USER.data) {
                this.setState({
                    id_res: USER.data.restoran.id,
                    nama_res: USER.data.restoran.nama,
                    alamat_res: USER.data.restoran.alamat,
                })
                console.log("ID RESTORAN : ", this.state.id_res)

            } else {
                toast.err("Error!")
            }

        })

            .catch(err => {
                console.log(err, "CATCH USER DATA RES");

            })
    }

    render() {
        return <DashboardView state={this.state} method={this.method}/>
    }
}
