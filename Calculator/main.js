class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: '',
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleEval = this.handleEval.bind(this);
    }

    // componentDidMount() {
    //     window.addEventListener =
    //         () => { this.setState({ output: '' }) }
    // }

    handleInput(e) {
        this.setState({
            output: this.state.output.concat(e.target.innerHTML),
        })
    }

    handleKeyPress(e) {
        document.onkeypress = (e) => {
            let pressedKey = e.key;
            if (pressedKey.match(/\d/)) {
                this.setState({
                    output: this.state.output.concat(pressedKey),
                })
            }
        }
    }

    handleClear() {
        this.setState({ output: '' })
    }

    handleDel() {
        let current = this.state.output;
        let newStack = current.slice(0, current.length - 1);
        this.setState({
            output: newStack
        })
    }



    handleEval() {
        let output = this.state.output;
        let result = math.evaluate(output.replace('X', '*'))
        this.setState({ output: result.toString() })
    }

    render() {
        this.handleKeyPress()
        console.log(this.state.output)
        return (
            <React.Fragment>
                <div id="calculator-container">
                    <div id="display">
                        {this.state.output.length === 0 ? 0 : this.state.output}
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
                            <button onClick={this.handleEval} className="numbers" id="equals">=</button>
                        </div>
                        <div id="ops">
                            <button onClick={this.handleDel} className="numbers" id="clear">Del</button>
                            <button onClick={this.handleClear} className="numbers" id="clear">AC</button>
                            <button onClick={this.handleInput} className="numbers" id="multiply">X</button>
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