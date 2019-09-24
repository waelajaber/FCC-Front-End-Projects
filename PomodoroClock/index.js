class Display extends React.Component {
    render() {
        return (
            <div id="display-container" className="font-weight-bold text-center border border-secondary rounded-lg p-2 m-4">
                {this.props.value}
            </div>
        )
    }
}
class Break extends React.Component {
    render() {
        return (
            <div id="break-container" className="container mb-5">
                <div className="row justify-content-center">
                    <div id="break-label" className="text-success text-center">Break Length</div>
                </div>
                <div className="row justify-content-center">
                    <div id="break-duration" className="text-danger">{this.props.value}</div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button id="break-decrement" className="btn btn-sm btn-primary">
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="col text-center">
                        <button id="break-increment" className="btn btn-sm btn-primary">
                            <i className="fa fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
class Session extends React.Component {
    render() {
        return (
            <div id="session-container" className="container mb-5">

                <div className="row justify-content-center">
                    <div id="session-label" className="text-success text-center">Session Length</div>
                </div>
                <div className="row justify-content-center">
                    <div id="session-duration" className="text-danger">{this.props.value}</div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button id="session-decrement" className="btn btn-sm btn-primary">
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="col text-center">
                        <button id="session-increment" className="btn btn-sm btn-primary">
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
                <button id="start-stop" className="btn btn-sm btn-primary p-2 m-1">
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
            timeLeft: null,
        };
    }
    render() {
        return (
            <div id="clock-container">
                <Display value={this.state.timeLeft} />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Break value={5} />
                        </div>
                        <div className="col">
                            <Session value={25} />
                        </div>
                    </div>
                </div>
                <Controls />
            </div>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('app-container'));