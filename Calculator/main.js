class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            literalStack: '0',
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleEval = this.handleEval.bind(this);
    }



    handleInput(e) {
        this.setState({
            literalStack: this.state.literalStack.concat(e.target.innerHTML),
        })
    }

    handleClear() {
        this.setState({ literalStack: '' })
    }

    handleDel() {
        let current = this.state.literalStack;
        let newStack = current.slice(0, current.length - 1);
        this.setState({
            literalStack: newStack
        })
    }

    handleKeyPress(e) {
        document.onkeypress = (e) => {
            let pressedKey = e.key;
            if (pressedKey.match(/\d/)) {
                this.setState({
                    literalStack: this.state.literalStack.concat(pressedKey),
                })
            }
        }
    }

    handleEval() {
        let literalStack = this.state.literalStack;
        const add = (a, b) => { return a + b };
        const sub = (a, b) => { return a - b };
        const mul = (a, b) => { return a * b };
        const div = (a, b) => { return a / b };
        const operations = {
            '+': add,
            '-': sub,
            'X': mul,
            '/': div
        };
        let numberRegEx = /\d\.\d|\d/g;
        let opsRegEx = /\D/g;
        console.log(literalStack)
        // let numbers = literalStack.match(numberRegEx);
        // let ops = literalStack.match(opsRegEx).filter(i => i != '.');
    }

    render() {
        this.handleKeyPress()
        return (
            <React.Fragment>
                <div id="calculator-container">
                    <div id="display">
                        {this.state.literalStack}
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