class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawInput: '',
            output: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleEval = this.handleEval.bind(this);
    }
    handleInput(e) {
        this.state.rawInput += e.target.innerHTML;
        // handle multiple decimal point inputs (0..1) and turn them into single decimal points (0.1).
        if (this.state.rawInput.match(/\.{2,}/g)) {
            this.setState({ output: this.state.rawInput.replace(/\.{2,}/g, '.') })
        }
        else if (this.state.rawInput.match(/(?<=\d+\.\d+)\.+/g)) {
            this.setState({ output: this.state.rawInput.replace(/(?<=\d+\.\d+)\.+/g, '') })
        }
        else {
            this.setState({ output: this.state.rawInput })
        }
    }
    //5X1+5+921233+5X6-2/4
    //40005.010.5
    handleClear() {
        this.setState({
            rawInput: '',
            output: ''
        })
    }
    handleDel() {
        let current = this.state.output;
        let newStack = current.slice(0, current.length - 1);
        this.setState({
            rawInput: newStack,
            output: newStack
        })
    }
    handleEval() {
        let result = math.evaluate(this.state.output.replace(/\X/g, '*'))
        this.setState({ output: result.toString() })
    }

    render() {
        console.log('rawInput: ', this.state.rawInput);
        console.log('output: ', this.state.output)
        return (
            <React.Fragment>
                <div id="calculator-container">
                    <div id="display" onLoad={this.handleRules}>
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