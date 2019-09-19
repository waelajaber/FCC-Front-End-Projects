class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <React.Fragment>
                <div id="calculator-container">
                    <div id="display">
                        hello
                    </div>

                    <div id="pad">

                        <div id="number-container">
                            <button className="numbers" id="seven">7</button>
                            <button className="numbers" id="eight">8</button>
                            <button className="numbers" id="nine">9</button>
                            <button className="numbers" id="four">4</button>
                            <button className="numbers" id="five">5</button>
                            <button className="numbers" id="six">6</button>
                            <button className="numbers" id="one">1</button>
                            <button className="numbers" id="two">2</button>
                            <button className="numbers" id="three">3</button>
                            <button className="numbers" id="zero">0</button>
                            <button className="numbers" id="decimal">.</button>
                            <button className="numbers" id="equals">=</button>
                        </div>
                        <div id="ops">
                            <i id="toggle" className="fa fa-toggle-on"></i>
                            <button className="numbers" id="clear">AC</button>
                            <button className="numbers" id="multiply">x</button>
                            <button className="numbers" id="divide">/</button>
                            <button className="numbers" id="add">+</button>
                            <button className="numbers" id="subtract">-</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app-container'));
