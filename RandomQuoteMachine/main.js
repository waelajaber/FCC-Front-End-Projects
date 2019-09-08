
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            quote: "Yeah, well, you know, that's just, like, your opinion, man. ...",
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

                <h3 className="text-center text-white mb-4">Random Quote Generator</h3>
                <div id="app-box" className="container-fluid bg-light shadow-lg rounded_border text-center p-3">
                    <i id="circle" className="fa fa-circle float-left" style={color}></i>

                    <div id="text-holder" className="row mt-5">
                        <div className="col">
                            <p className="mx-5">{this.state.quote}</p>
                        </div>
                    </div>

                    <div className="row mt-2 mx-5">
                        <div className="col">
                            <small className="font-italic">{this.state.author}</small>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-5">
                            <button className="border border-light rounded bg-light mt-5 mx-3" style={color}>
                                <i className="fa fa-facebook-f"></i>
                            </button>
                            <button className="border border-light rounded bg-light mt-5 mx-3" style={color}>
                                <i className="fa fa-twitter"></i>
                            </button>
                        </div>
                        <div className="col-auto"></div>
                        <div className="col-5">
                            <button className="border border-light rounded bg-light px-2 mt-5" style={color} onClick={this.handleNextQuote}>
                                Next Quote
                                <i className="fa fa-arrow-right mx-2"></i>
                            </button>
                        </div>
                    </div>
                    <div id='test'></div>
                </div>

            </React.Fragment>
        )
    }
}



const domContainer = document.getElementById('app-container');
ReactDOM.render(<App />, domContainer);