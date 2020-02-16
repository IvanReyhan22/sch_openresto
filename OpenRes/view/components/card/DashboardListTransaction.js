import React, { Component } from 'react'
import '../../../assets/scss/components.scss'

export default class DashboardListTransaction extends Component {
    render() {
        return (
            <div id="DashboardListTransaction">
                <div className="navbar justify-content-between p-0 m-0">
                    <div className="desc">
                        <h4 className="name m-0">{this.props.name}</h4>
                        <p className="date">{this.props.date}</p>
                    </div>
                    <div className="price">Rp{this.props.price},00</div>
                </div>
            </div>
        )
    }
}
