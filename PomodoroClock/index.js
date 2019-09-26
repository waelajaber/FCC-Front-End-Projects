class Display extends React.Component {
    render() {
        return (
            <div id="display-container" className="mb-3">
                <h5 id="timer-label" className="text-center">Session</h5>
                <div id="time-left" className="font-weight-bold text-center">
                    {this.props.minutes}
                </div>
            </div>
        )
    }
}
class Break extends React.Component {
    breakIncrement() {
        this.props.change(this.props.state.breakLength < 60 ? 1 : 0);
    }
    breakDecrement() {
        this.props.change(this.props.state.breakLength > 1 ? -1 : 0);
    }
    render() {
        return (
            <div id="break-container" className="container">
                <div className="row justify-content-center">
                    <div id="break-label" className="text-success text-center">Break Length</div>
                </div>
                <div className="row justify-content-center my-2">
                    <div id="break-length" className="text-danger">{this.props.value}</div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button id="break-decrement" className="btn btn-sm btn-primary" onClick={this.breakDecrement.bind(this)}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="col text-center">
                        <button id="break-increment" className="btn btn-sm btn-primary" onClick={this.breakIncrement.bind(this)}>
                            <i className="fa fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
class Session extends React.Component {
    sessionIncrement() {
        this.props.change(this.props.state.sessionLength < 60 ? 1 : 0);
    }
    sessionDecrement() {
        this.props.change(this.props.state.sessionLength > 1 ? -1 : 0);
    }
    render() {
        return (
            <div id="session-container" className="container mb-5">

                <div className="row justify-content-center">
                    <div id="session-label" className="text-success text-center">Session Length</div>
                </div>
                <div className="row justify-content-center my-2">
                    <div id="session-length" className="text-danger">{this.props.value}</div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button id="session-decrement" className="btn btn-sm btn-primary" onClick={this.sessionDecrement.bind(this)}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="col text-center">
                        <button id="session-increment" className="btn btn-sm btn-primary" onClick={this.sessionIncrement.bind(this)}>
                            <i className="fa fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
class Controls extends React.Component {
    render() {
        return (
            <div id="controls-container" className="justify-content-center text-center">
                <button id="start_stop" className="btn btn-sm btn-primary p-2 m-1" onClick={this.props.start}>
                    <i className="fa fa-play mx-2"></i>
                    <i className="fa fa-pause mx-2"></i>
                </button>

                <button id="reset" className="btn btn-sm btn-primary p-2 m-1">
                    <i className="fa fa-refresh"></i>
                </button>
            </div>
        )
    }
}
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            timeDisplay: null,
            endTime: null,
        };
        this.handleBreakChange = this.handleBreakChange.bind(this);
        this.handleSessionChange = this.handleSessionChange.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }
    componentDidMount() {
        this.setState({ timeDisplay: `${this.state.sessionLength}:00` })
    }

    handleBreakChange(amount) {
        this.setState({ breakLength: this.state.breakLength + amount })
    }

    handleSessionChange(amount) {
        this.setState({
            sessionLength: this.state.sessionLength + amount,
            timeDisplay: this.state.sessionLength + amount,
        })
    }

    startTimer() {
        this.setState({ endTime: Date.now() + (this.state.sessionLength * 60 * 1000) })
        setInterval(() => {
            let minutesRemaining = (this.state.endTime - Date.now()) / 60 / 1000;
            let result = (minutesRemaining).toFixed(2)
            let timerMinutes = result.replace(/(?<=\.)\d+/, '').replace('.', '');
            let timerSeconds = Math.round((Number(result.match(/(?<=\.)\d+/)[0])) * (60 / 100));
            this.setState({
                timeDisplay: `${timerMinutes}:${timerSeconds}`
            })
        }, 1000)
    }

    render() {
        return (
            <div id="clock-container">
                <h2 className="text-center mb-4">Pomodoro Clock</h2>
                <Display minutes={this.state.timeDisplay} />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Break value={this.state.breakLength} state={this.state} change={this.handleBreakChange} />
                        </div>
                        <div className="col">
                            <Session value={this.state.sessionLength} state={this.state} change={this.handleSessionChange} />
                        </div>
                    </div>
                </div>
                <Controls start={this.startTimer} />
            </div>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('app-container'));