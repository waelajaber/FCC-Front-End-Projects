class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id="drum-machine">
                    <div id="display">
                        <div id="sound1" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            Q
                        </div>
                        <div id="sound2" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            W
                        </div>
                        <div id="sound3" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            E
                        </div>
                        <div id="sound4" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            A
                        </div>
                        <div id="sound5" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            S
                        </div>
                        <div id="sound6" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            D
                        </div>
                        <div id="sound7" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            Z
                        </div>
                        <div id="sound8" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            X
                        </div>
                        <div id="sound9" className="drum-pad">
                            <audio src="" className="clip" id=""></audio>
                            C
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app-container'));