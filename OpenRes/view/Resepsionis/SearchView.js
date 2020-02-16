import React, { Component } from 'react'

/**
 * COMPONENT
 */
import '../../assets/scss/search.css'
import INPUTWithIcon from '../components/input/INPUTWithIcon'

export default class SearchView extends Component {

    render() {

        return (

            <div id="search-screen">

                <div className="mask"></div>

                <div className="search-container text-center">

                    <h1>Cari pesanan</h1>

                    <INPUTWithIcon />

                    <p>
                        Isi dengan nomor transaksi yang diberikan oleh pemesan/pelanggan
                    </p>

                </div>

            </div>
        )
    }
}
