import React, { Component } from 'react'
import '../../../assets/scss/components.scss'

export default class DashboardCardList extends Component {
    render() {
        return (
            <div id="DashboardCardList">
                <div className="card mb-3">
                    <div className="card-body px-4 py-3">
                        <div className="navbar justify-content-between p-0 ">
                            <div className="name">
                                <h4 className="title mb-0">{this.props.title}</h4>
                                <p className="status m-0">{this.props.status}</p>
                            </div>
                            <div className="desc">
                                <h4 className="price mb-0">Rp{this.props.price},00</h4>
                                <p className="order m-0">{this.props.order} pesanan/hari</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
