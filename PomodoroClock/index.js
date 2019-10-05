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
            <div id="break-container" className="container mb-3">
                <div className="row justify-content-center">
                    <div id="break-label" className="text-center">Break Length</div>
                </div>
                <div className="row justify-content-center my-2">
                    <div id="break-length">{this.props.value}</div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button id="break-decrement" className="" onClick={this.breakDecrement.bind(this)}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="col text-center">
                        <button id="break-increment" className="" onClick={this.breakIncrement.bind(this)}>
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
            <div id="session-container" className="container mb-3">
                <div className="row justify-content-center">
                    <div id="session-label" className="text-center">Session Length</div>
                </div>
                <div className="row justify-content-center my-2">
                    <div id="session-length">{this.props.value}</div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button id="session-decrement" className="" onClick={this.sessionDecrement.bind(this)}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="col text-center">
                        <button id="session-increment" className="" onClick={this.sessionIncrement.bind(this)}>
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
                <button id="start_stop" className=" p-2 mx-1" onClick={this.props.toggle}>
                    <i className="fa fa-play mx-2"></i>
                    <i className="fa fa-pause mx-2"></i>
                </button>
                <button id="reset" className=" p-2 mx-1" onClick={this.props.reset}>
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
    }

    componentDidMount() {
        this.setState({
            timeLeft: `${this.state.sessionLength}:00`,
            // Initiating a timer so that when handleSession() is called
            // the timer.start() call will go through.
            timer: new Timer(),
        });
    }

    handleBreakChange(amount) {
        if (!this.state.timerOn) {
            this.setState({ breakLength: this.state.breakLength + amount })
        }
        if (this.state.startStopCounter > 1) {
            this.setState({ breakLengthChanged: true })
        }
    }

    handleSessionChange(amount) {
        if (!this.state.timerOn) {
            this.setState({
                sessionLength: this.state.sessionLength + amount,
                timeLeft: this.state.sessionLength < 10 ? `0${this.state.sessionLength + amount}:00` : `${this.state.sessionLength + amount}:00`
            })
        }
        // if the counter was initially started , then paused and during the pause 
        // the sessionLength was changed, set sessionLengthChanged to true.
        // this state is used to identify if the timer needs to be reset or resumed after a pause.
        // this state is used in the handleSession() method.
        if (this.state.startStopCounter > 1) {
            this.setState({ sessionLengthChanged: true })
        }
    }

    handleToggle() {
        console.log('handleToggle')
        // increase the counter every time the start-stop button is pushed
        this.setState({
            startStopCounter: this.state.startStopCounter + 1,
        })
        // start the countdown timer is the startStopCounter is odd
        if (this.state.startStopCounter % 2 === 0) {
            console.log('toggle-if');
            this.handleSession();
        }
        // pause the countdown timer is the startStopCounter is even
        else {
            console.log('toggle-else');
            this.handlePause();
        }
    }

    handleSession() {
        console.log('handleSession');
        // Re-initiate timer object in state after returning to a session
        // from a break
        if (this.state.timer === undefined) {
            this.setState({
                label: 'Session',
                timer: new Timer(),
            });
        };
        // Reset the countdown timer , if the sessionLength was changed during pause.
        if (this.state.sessionLengthChanged) {
            console.log('handleSession-after-sessionLength-change-during-pause')
            // reset the sessionLengthChanged to false, so if it is changed again it'll be caught
            this.setState({ sessionLengthChanged: false })
            this.state.timer.stop();
        }
        // Start the timer plugin
        this.state.timer.start({
            countdown: true,
            startValues: {
                minutes: this.state.sessionLength,
            }
        });
        // set state of timerOn to true and display the timer reading
        this.setState({
            timerOn: true,
            timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
        });
        // update countdown timer reading 
        this.state.timer.addEventListener('secondsUpdated', () => this.setState({
            timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
        }));
        // when the session time is over instantiate the break session

        this.state.timer.addEventListener('targetAchieved', () => {
            this.audioBeep.play();
            // setting a timeout so that the timer plugin has time to show 00:00
            setTimeout(() => {
                this.setState({
                    timer: this.state.timer.stop(),
                });
                this.handleBreak();
            }, 10000)
        });
    }

    handleBreak() {
        console.log('handleBreak');
        // Initiate and Re-initiate a Timer every time 
        // handleSession finishes 
        this.setState({
            label: 'Break',
            timer: new Timer(),
        });
        // Reset the countdown timer , if the breakLength was changed during pause.
        if (this.state.breakLengthChanged) {
            console.log('handleBreak-after-breakLength-change-during-pause')
            // reset the breakLengthChanged to false, so if it is changed again it'll be caught
            this.setState({ breakLengthChanged: false });
            this.state.timer.stop();
        }
        this.state.timer.start({
            countdown: true,
            startValues: {
                minutes: this.state.breakLength,
            }
        });
        this.setState({
            timerOn: this.state.timer.isRunning(),
            timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
        });
        // update countdown timer reading 
        this.state.timer.addEventListener('secondsUpdated', () => this.setState({
            timeLeft: this.state.timer.getTimeValues().toString().match(/(?<=00:)\d+:\d+/g).join(''),
        }));

        // when the break time is over instantiate the session
        this.state.timer.addEventListener('targetAchieved', () => {
            this.audioBeep.play();
            // setting a timeout so that the timer plugin has time to show 00:00
            setTimeout(() => {
                this.setState({
                    timer: this.state.timer.stop(),
                });
                this.handleSession();
            }, 10000);
        });
    }

    handlePause() {
        console.log('handlePause');
        this.setState({ timerOn: false });
        this.state.timer.pause();
    }

    handleReset() {
        console.log('handleReset')
        this.state.timer.stop();
        this.setState({
            timeLeft: `25:00`,
            sessionLength: 25,
            breakLength: 5,
            label: 'Session',
            timerOn: false,
            startStopCounter: 0,
        });
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
    }

    render() {
        return (
            <div id="clock-container" >
                <h2 className="text-center mb-3">Pomodoro Clock</h2>
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
                <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }} />
            </div>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('app-container'));
