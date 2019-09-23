class Break extends React.Component {
    render() {
        return (
            <div id="break-length">
                {this.props.value}
            </div>
        )
    }
}
class Session extends React.Component {
    render() {
        return (
            <div id="session-length">
                {this.props.value}
            </div>
        )
    }
}
class TimeLabel extends React.Component {
    render() {
        return (
            <div id="timer-label">
                {this.props.value}
            </div>
        )
    }
}
class TimeLeft extends React.Component {
    render() {
        return (
            <div id="time-left">
                {this.props.time}
            </div>
        )
    }
}


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
            <React.Fragment>
                <div className="" id="break-label">Break Length</div>
                <div className="" id="session-label">Session Length</div>
                <button className="btn btn-sm btn-primary p-2 m-1" id="break-decrement">break-decrement</button>
                <button className="btn btn-sm btn-primary p-2 m-1" id="session-decrement">session-decrement</button>
                <button className="btn btn-sm btn-primary p-2 m-1" id="break-increment">break-increment</button>
                <button className="btn btn-sm btn-primary p-2 m-1" id="session-increment">session-increment</button>
                <Break value={5} />
                <Session value={25} />
                <TimeLabel value={'Session'} />
                <TimeLeft time={"25:00"} />
                <button className="btn btn-sm btn-primary p-2 m-1" id="start-stop">start/stop</button>
                <button className="btn btn-sm btn-primary p-2 m-1" id="reset">reset</button>
            </React.Fragment>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('app-container'));