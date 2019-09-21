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
        let rawInput = this.state.rawInput;
        //handle multiple decimal point inputs (0..1) and turn them into single decimal points (0.1).
        //handle multiple decimal points after the first decimal point and remove them (0.1.2 => 0.12).
        while (
            (/\.{2,}/g).test(rawInput) ||
            (/(?<=\.+\d+)\.+/g).test(rawInput)
        ) {
            rawInput = rawInput.replace((/\.{2,}/g), '.');
            rawInput = rawInput.replace(/(?<=\.+\d+)\.+/g, '');
        }
        const regex = /\/|[\d\.]+|[^\d\./]/g;
        const ops = ['+', '-', 'X', '/', '.'];
        // console.log('regex: ', rawInput.match(regex))
        let result = [];
        for (let item of rawInput) {
            if (ops.includes(item)) {
                result.push(item)
            } else {
                result.push(math.evaluate(Number(item)))
            }
        }
        console.log(result)
        this.setState({ output: result.join('') })
    }
    handleClear() {
        this.setState({
            rawInput: '',
            output: '0',
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
        this.setState({
            rawInput: result.toString(),
            output: result.toString(),
        })
    }
    render() {
        // console.log('rawInput: ', this.state.rawInput);
        // console.log('output: ', this.state.output)
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
                            <button onClick={this.handleDel} className="numbers" id="del">Del</button>
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