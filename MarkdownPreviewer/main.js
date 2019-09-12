
// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
});

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
}

// const converter = new showdown.Converter();

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub - heading...
### And here's some other cool stuff:

Heres some code, \`< div ></div > \`, between 2 backticks.

\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: placeholder,
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleMarkdown = this.handleMarkdown.bind(this);
    }

    componentDidMount() {
        this.setState({ markDown: marked(this.state.text, { renderer: renderer }) })
    }

    handleChange(e) {
        this.setState({
            text: e.target.value,
        })
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
                                        value={this.state.text}
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

                                <div className="row shadow border border-dark rounded rounded-lg mt-2 p-2" id='preview' dangerouslySetInnerHTML={{ __html: marked(this.state.text, { renderer: renderer }) }} />

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