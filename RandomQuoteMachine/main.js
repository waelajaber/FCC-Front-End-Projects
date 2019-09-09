
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            quote: "",
            author: "The Dude",
        }

        this.handleNextQuote = this.handleNextQuote.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(res => res.json())
            .then(data => this.setState({ data: data }))
    }

    handleNextQuote() {
        let randomIdx = Math.round(Math.random() * this.state.data.quotes.length);
        let randomQuote = this.state.data.quotes[randomIdx].quote;
        let randomAuthor = this.state.data.quotes[randomIdx].author;

        this.setState({ quote: randomQuote, author: randomAuthor });
    }

    handleColor() {
        const colors = ['#D98880', '#C39BD3', '#7FB3D5', '#76D7C4', '#7DCEA0', '#F7DC6F', '#F0B27A', '#99A3A4'];
        let randomIdx = Math.round(Math.random() * (colors.length - 1));
        const color = colors[randomIdx];
        return color
    }

    render() {
        const mainColor = this.handleColor();
        const color = { color: mainColor, transition: 'color', transitionDuration: '1s' }
        document.body.style = `background: ${mainColor}; transition: background 1s;`
        return (
            <React.Fragment>

                <h4 className="text-center text-white mb-4">Random Quote Generator</h4>
                <div id="app-box" className="container-fluid bg-light shadow-lg rounded_border text-center p-3">
                    <i id="circle" className="fa fa-circle float-left" style={color}></i>

                    <div id="text-holder" className="row">
                        <div className="col">
                            <p className="mx-5">{/*this.state.quote*/}Quis ex velit dolor dolor laboris ea incididunt id deserunt minim qui proident . Ea ut dolor nostrud labore culpa labore deserunt quis culpa duis quis.qui proident adipisicing. Eu adipisicing quis non ut. Ea ut dolor nostrud labore culpa labore deserunt quis culpa duis quis</p>
                        </div>
                    </div>

                    <div id="author-holder" className="row">
                        <div className="col">
                            <small className="font-italic">{this.state.author}</small>
                        </div>
                    </div>

                    <div id="icons-holder" className="row">
                        <div id="social-media-icons">

                            <button id="facebook-button" className="border border-light rounded bg-light = mx-1" style={color}>
                                <i className="fa fa-facebook-f"></i>
                            </button>

                            <button id="twitter-button" className="border border-light rounded bg-light mx-1" style={color}>
                                <i className="fa fa-twitter"></i>
                            </button>

                        </div>

                        <button id="next-quote-button" className="border border-light rounded bg-light px-2" style={color} onClick={this.handleNextQuote}>
                            Next Quote
                                <i className="fa fa-arrow-right mx-2"></i>
                        </button>

                    </div>

                </div>

            </React.Fragment>
        )
    }
}



const domContainer = document.getElementById('app-container');
ReactDOM.render(<App />, domContainer);