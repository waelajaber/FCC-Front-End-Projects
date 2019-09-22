class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <React.Fragment>
                <div>Hello</div>
            </React.Fragment>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app-container'));