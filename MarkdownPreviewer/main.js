// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
});

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultText: '# Marked in the browser\n\nRendered by **marked**.',
            text: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState(
            { text: e.target.value }
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-6">
                            <div id="editor-body" className="container">

                                <div id="title-bar-editor" className="row shadow bg-dark text-light border border-dark rounded text-center align-items-center">
                                    <div className="col">
                                        Editor
                                    </div>
                                    <div className="mr-2">
                                        <i className="fa fa-edit float-right"></i>
                                    </div>
                                </div>

                                <div className="row ">
                                    <textarea
                                        id="editor"
                                        value={this.state.text.length === 0 ? this.state.defaultText : this.state.text}
                                        onChange={this.handleChange}
                                        className="w-100 shadow border border-dark rounded rounded-lg mt-2 p-2" />
                                </div>

                            </div>
                        </div>

                        <div className="col-6">
                            <div id="preview-body" className="container">

                                <div id="title-bar-preview" className="row shadow bg-dark text-light border border-dark rounded text-center align-items-center">
                                    <div className="col">
                                        Preview
                                    </div>
                                    <div className="mr-2">
                                        <i className="fa fa-eye float-right"></i>
                                    </div>
                                </div>

                                <div
                                    id="preview"
                                    className="row shadow border border-dark rounded mt-2 p-2" dangerouslySetInnerHTML=
                                    {{ __html: this.state.text.length === 0 ? marked(this.state.defaultText) : marked(this.state.text) }}>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const domContainer = document.getElementById('app-container');
ReactDOM.render(<App />, domContainer);