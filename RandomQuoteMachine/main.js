
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            quote: "This will not stand, ya know, this aggression will not stand, man. ...",
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
        const colors = ['#D98880', '#C39BD3', '#7FB3D5', '#76D7C4', '#7DCEA0', '#F0B27A', '#99A3A4'];
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

                <h4 id="random-quote-generator">Random Quote Generator</h4>
                <div id="app-box">
                    <i id="circle" className="fa fa-quote-left float-left" style={color}></i>

                    <div id="text-author">
                        <p id="text" style={color}>{this.state.quote}</p>
                        <small id="author" style={color}>{this.state.author}</small>
                    </div>


                    <div id="icons-holder">
                        <div id="social-media-icons">
                            <button id="facebook-button" style={color}>
                                <i className="fa fa-facebook-f"></i>
                            </button>

                            <button id="twitter-button" style={color}>
                                <i className="fa fa-twitter"></i>
                            </button>

                            <button id="twitter-button" style={color}>
                                <i className="fa fa-instagram"></i>
                            </button>
                        </div>

                        <button id="next-quote-button" style={color} onClick={this.handleNextQuote}>
                            Next Quote
                                <i className="fa fa-arrow-right"></i>
                        </button>

                    </div>

                </div>

            </React.Fragment>
        )
    }
}



const domContainer = document.getElementById('app-container');
ReactDOM.render(<App />, domContainer);