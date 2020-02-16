import React, { Component } from 'react'
import '../../../assets/scss/components.css'

export default class FoodProfileCard extends Component {
    render() {
        return (
            <div id="food-profile">
                {/* CARD MENU / MEJA / PESANAN */}
                <div className="card" onClick={() => this.props.onClick(this.props.id)}>
                    <nav className="navbar justify-content-between">
                        <div className="desc">
                            <div className="title">{this.props.title}</div>
                            <div className="status">{this.props.status}</div>
                        </div>
                        <div className="desc1">
                            <div className="price">Rp{this.props.price}</div>
                            <div className="code">SB-M{this.props.code}</div>
                        </div>
                    </nav>
                </div>
            </div>
            
        )
    }
}
