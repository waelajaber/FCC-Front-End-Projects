import React, { Component } from 'react'

export default class Break extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="bg-dark border border-rounded text-white">
                {this.props.value}
            </div>
        )
    }
}
