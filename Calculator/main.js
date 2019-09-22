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
        const format = (str) => {
            while ((/\.{2,}/g).test(str) || (/(?<=\.+\d+)\.+/g).test(str)) {
                str = str.replace((/\.{2,}/g), '.')
                str = str.replace(/(?<=\.+\d+)\.+/g, '')
            }
            // match numbers and operations i.e ('02.1+004-20' => ['02.1', '+', ...]) 
            const reg = /\/|[\d\.]+|[^\d\./]/g;
            // match zeros if followed by digits decimal digits
            const reg1 = /0+(?=\d+\.\d+)/g
            // match decimal numbers
            const reg2 = /(\d+\.\d+)/g
            let result = [];

            for (let item of str.match(reg)) {
                if (reg1.test(item)) {
                    result.push(item.replace(reg1, ''))
                }
                // if item is not a decimal number, push item and replace leading zeros 
                // i.e zeros followed by numbers by an empty string
                else if (!reg2.test(item)) {
                    result.push(item.replace(/0+(?=\d+)/g, ''))
                }
                // push the operations into the the result.
                else {
                    result.push(item)
                }
            }
            return result.join('')
        }
        this.setState({ output: format(rawInput) })
    }
    handleClear() {
        this.setState({
            rawInput: '',
            output: '0',
        })
        console.log('clear')
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
        const handleContiguousOperations = (str) => {
            const removeLastElement = (str) => {
                return str.concat().slice(0, str.length - 1)
            }

            // Protect the negative number '-' by replacing it with neg
            // before filtering out all the other non negative indicating '-' signs
            // involved in contiguous operations.
            str = str.replace(/-(?=\d)/g, 'neg');
            const contiguousOpReg = /[+X*/-]{2,}/g
            // match contiguous operations
            let contiguousOperations = str.match(contiguousOpReg)
            // remove last element in each set of contiguous operations
            // because the last element is the operation that will be eventually implemented
            // i.e 5+*/9 => 5/9 
            let result = str;
            if (contiguousOpReg.test(str)) {
                contiguousOperations = contiguousOperations.map(i => removeLastElement(i))
                result = [...str.split('')].join('');
                for (let contOp of contiguousOperations) {
                    // console.log(contOp)
                    result = result.replace(contOp, '')
                }
            }
            console.log('result: ', result)
            return result.replace('neg', '-')
        }
<<<<<<< HEAD
=======

>>>>>>> development
        let result = math.evaluate(handleContiguousOperations(this.state.output.replace(/\X/g, '*')))
        this.setState({
            rawInput: result.toString(),
            output: result.toString(),
        })
    }
    render() {
        console.log(this.state.rawInput)
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