class Display extends React.Component {
    render() {
        return (
            <div id="display-container" className="mb-3">
                <h5 id="timer-label" className="text-center">{this.props.label}</h5>
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
            <div id="break-container" className="container mb-5">
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
                <button id="start_stop" className="btn btn-sm btn-primary p-2 m-1" onClick={this.props.toggle}>
                    <i className="fa fa-play mx-2"></i>
                    <i className="fa fa-pause mx-2"></i>
                </button>
                <button id="reset" className="btn btn-sm btn-primary p-2 m-1" onClick={this.props.reset}>
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
            timeLeft: null,
            label: 'Session',
            timerOn: false,
            startStopCounter: 0,
        };
        this.handleBreakChange = this.handleBreakChange.bind(this);
        this.handleSessionChange = this.handleSessionChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleStart = this.handleStart.bind(this);

    }
    handleBreakChange(amount) {
        if (!this.state.timerOn) {
            this.setState({ breakLength: this.state.breakLength + amount })
        }
    }
    handleSessionChange(amount) {
        if (!this.state.timerOn) {
            this.setState({
                sessionLength: this.state.sessionLength + amount,
                timeLeft: `${this.state.sessionLength + amount}:00`
            })
        }
    }
    componentDidMount() {
        this.setState({
            timeLeft: `${this.state.sessionLength}:00`,
            timer: new Timer(),
        });
    }
    componentDidUpdate() {
        this.state.timer.addEventListener('secondsUpdated', (e) => {
            this.setState({
                timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
            });
        });
    }
    handleToggle() {
        console.log('handleToggle')
        this.setState({
            startStopCounter: this.state.startStopCounter + 1,
        })
        if (this.state.startStopCounter % 2 === 0) {
            console.log('toggle-if')
            this.handleStart();
        }
        else {
            console.log('toggle-else')
            this.handlePause();
        }
    }
    handleStart() {
        console.log('handleStart')
        this.state.timer.start({ countdown: true, startValues: { minutes: this.state.sessionLength, seconds: 0 } });
        this.state.timer.addEventListener('started', (e) => {
            this.setState({
                timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
            });
        });
    }
    handlePause() {
        console.log('handlePause')
        this.state.timer.pause();
    }
    handleReset() {
        this.setState({
            sessionLength: 25,
            breakLength: 5,
            timeLeft: null,
            label: 'Session',
            timerOn: false,
            startStopCounter: 0,
            sessionInterval: clearInterval(this.state.intervalSession),
        })
        this.state.timer.addEventListener('reset', (e) => {
            this.setState({
                timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
            });
        });
    }
    //                 timeLeft: timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
    render() {
        return (
            <div id="clock-container" >
                <h2 className="text-center mb-4">Pomodoro Clock</h2>
                <Display minutes={this.state.timeLeft} label={this.state.label} />
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
                <Controls reset={this.handleReset} toggle={this.handleToggle} />
            </div>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('app-container'));