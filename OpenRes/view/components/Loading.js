import React, { Component } from 'react'

import { GooSpinner } from 'react-spinners-kit'

export default class Loading extends Component {
    render() {
        return <div id="loading" className="text-center mx-auto" style={{width:'max-content',height: 30, overflow:'hidden'}}>
            <GooSpinner
                size={this.props.size === undefined ? 30 : this.props.size}
                color={this.props.color === undefined ? "#89B758" : this.props.color}
                loading={true} />
        </div>
    }
}

