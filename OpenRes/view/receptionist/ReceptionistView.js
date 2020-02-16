import React, { Component } from 'react'
import INPUTWithIcon from '../components/input/INPUTWithIcon'
import '../../assets/scss/Receptionist.css'

export default class ReceptionistView extends Component {
    render() {
        return (
            <div>
                <div className="wrappers">
                    <h1 className="title">Cari Pesanan</h1>
                    <INPUTWithIcon />
                    <p>Isi dengan nomor transaksi yang diberikan oleh pemesan/pelanggan</p>
                </div>
            </div>
        )
    }
}
