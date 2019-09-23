class Break extends React.Component {
    render() {
        return (
            <div id="break-container">
                <div id="break-label" className="text-success">Break Length</div>
                <div id="break-duration" className="text-danger">{this.props.value}</div>
                <button id="break-decrement" className="btn btn-sm btn-primary p-2 m-1">break-decrement</button>
                <button id="break-increment" className="btn btn-sm btn-primary p-2 m-1">break-increment</button>
            </div>
        )
    }
}
class Session extends React.Component {
    render() {
        return (
            <div id="session-container">
                <div id="session-label" className="text-success" >Session Length</div>
                <div id="session-duration" className="text-danger" >{this.props.value}</div>
                <button id="session-decrement" className="btn btn-sm btn-primary p-2 m-1" >session-decrement</button>
                <button id="session-increment" className="btn btn-sm btn-primary p-2 m-1" >session-increment</button>
            </div>
        )
    }
}
class Controls extends React.Component {
    render() {
        return (
            <div id="controls-container">
                <button id="start-stop" className="btn btn-sm btn-primary p-2 m-1" >start/stop</button>
                <button id="reset" className="btn btn-sm btn-primary p-2 m-1">reset</button>
            </div>
        )
    }
}
class Display extends React.Component {
    render() {
        return (
            <div id="display-container">{this.props.value}</div>
        )
    }
}
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionTime: 25,
        };
    }
    render() {
        return (
            <div id="clock-container" className="container">
                <Display value={this.state.sessionTime} />
                <Session value={25} />
                <Break value={5} />
                <Controls />
            </div>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('app-container'));