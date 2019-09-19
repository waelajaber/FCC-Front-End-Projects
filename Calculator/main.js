class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: '',
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }

    handleInput(e) {
        this.setState({
            stack: this.state.stack.concat(e.target.innerHTML),
        })
    }

    handleClear() {
        this.setState({ stack: '' })
    }

    handleDel() {
        let current = this.state.stack;
        let newStack = current.slice(0, current.length - 1);
        this.setState({
            stack: newStack
        })
    }

    render() {
        console.log(this.state.stack)
        return (
            <React.Fragment>
                <div id="calculator-container">
                    <div id="display">
                        {this.state.stack}
                    </div>
                    <div id="pad">
                        <div id="number-container">
                            <button onClick={this.handleInput} className="numbers" id="seven">7</button>
                            <button onClick={this.handleInput} className="numbers" id="eight">8</button>
                            <button onClick={this.handleInput} className="numbers" id="nine">9</button>
                            <button onClick={this.handleInput} className="numbers" id="four">4</button>
                            <button onClick={this.handleInput} className="numbers" id="five">5</button>
                            <button onClick={this.handleInput} className="numbers" id="six">6</button>
                            <button onClick={this.handleInput} className="numbers" id="one">1</button>
                            <button onClick={this.handleInput} className="numbers" id="two">2</button>
                            <button onClick={this.handleInput} className="numbers" id="three">3</button>
                            <button onClick={this.handleInput} className="numbers" id="zero">0</button>
                            <button onClick={this.handleInput} className="numbers" id="decimal">.</button>
                            <button className="numbers" id="equals">=</button>
                        </div>
                        <div id="ops">
                            <button onClick={this.handleDel} className="numbers" id="clear">Del</button>
                            <button onClick={this.handleClear} className="numbers" id="clear">AC</button>
                            <button onClick={this.handleInput} className="numbers" id="multiply">x</button>
                            <button onClick={this.handleInput} className="numbers" id="divide">/</button>
                            <button onClick={this.handleInput} className="numbers" id="add">+</button>
                            <button onClick={this.handleInput} className="numbers" id="subtract">-</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app-container'));
