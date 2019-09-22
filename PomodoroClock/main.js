import Break from './components/break_display'


class App extends React.Component {
    constructor(props) {
        super(props);
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
                <Break value='5' />
                <div id="session-length" value='25'>{this.props.value}</div>
                <div id="timer-label"></div>
                <div id="timer-label"></div>
                <div id="time-left"></div>
                <button className="btn btn-sm btn-primary p-2 m-1" id="start-stop">start/stop</button>
                <button className="btn btn-sm btn-primary p-2 m-1" id="reset">reset</button>


            </React.Fragment>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app-container'));