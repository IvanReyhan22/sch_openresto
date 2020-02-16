import React, { Component } from 'react'
import { IMAGE, ICON } from '../../../assets/images'

export default class MenusCard extends Component {

    constructor(props) {

        super(props)

        this.state = {
            itemValue: 0
        }

    }

    plus = () => {
        this.setState({
            itemValue: this.state.itemValue + 1
        }, () => this.props.onValueChange(this.state.itemValue))
    }

    minus = () => {
        if (this.state.itemValue !== 0) {
            this.setState({
                itemValue: this.state.itemValue - 1
            }, () => this.props.onValueChangeMinus(this.state.itemValue))
        }
        () => this.props.onValueChangeMinus(this.state.itemValue)
    }

    render() {
        return (
            <div id="menus-card" className="row">
                <div className="col-4 pr-0">
                    <img src={this.props.photo} alt="" />
                </div>
                <div className="col-8 py-2 pl-3">
                    <h1>
                        {this.props.title === undefined ? "Fortune Cookie" : this.props.title}
                    </h1>
                    <p>
                        {this.props.desc === undefined ? "Margarita marinated flank steak tacos and I love the festive, loose atmosphere of this photo" : this.props.desc}
                    </p>
                    <div className="input-add">
                        <div className="inline-block">
                            <img src={ICON.MINUS} className="btn-icon" onClick={() => this.minus()} />
                            <span className="item-value mx-3">{this.state.itemValue}</span>
                            <img src={ICON.ADD} className="btn-icon" onClick={() => this.plus()} />
                        </div>
                        <h6 className="inline-block ml-4">
                            Rp <span>{this.props.price}</span>
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}
