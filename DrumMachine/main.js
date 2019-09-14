class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div id="drum-machine">
                    <div id="display">
                        <div className="Row">
                            <button id="sound1" className="drum-pad">
                                <audio src='audio\CYCdh_K1close_ClHat-05.wav' className="clip" id=""></audio>
                                Q
                            </button>
                            <button id="sound2" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                W
                            </button>
                            <button id="sound3" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                E
                            </button>
                        </div>
                        <div className="Row">
                            <button id="sound4" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                A
                            </button>
                            <button id="sound5" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                S
                            </button>
                            <button id="sound6" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                D
                            </button>
                        </div>
                        <div className="Row">
                            <button id="sound7" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                Z
                            </button>
                            <button id="sound8" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                X
                            </button>
                            <button id="sound9" className="drum-pad">
                                <audio src="" className="clip" id=""></audio>
                                C
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app-container'));


// $(window).resize(function () {

//     $('.app-container').css({
//         position: 'absolute',
//         left: ($(window).width() - $('.app-container').outerWidth()) / 2,
//         top: ($(window).height() - $('.app-container').outerHeight()) / 2
//     });

// });

// // To initially run the function:
// $(window).resize();

const alwaysCenter = () => {
    let container = document.querySelector('#app-container');
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    container.style.position = 'absolute';
    container.style.marginLeft = ((window.innerWidth - width) / 2) + 'px';
    // container.style.right = ((window.innerWidth - width) / 2) + 'px';
    container.style.marginTop = ((window.innerHeight - height) / 2) + 'px';
    // container.style.marginBottom = ((window.outerHeight - height) / 2) + 'px';

}

document.addEventListener('DOMContentLoaded', () => { alwaysCenter() })
document.onload = () => { alwaysCenter() };
window.onoffline = () => { alwaysCenter() };
document.onresize = () => { alwaysCenter() };
window.onresize = () => { alwaysCenter() };
// window.onresize = () => {
//     document.getElementById('app-container').style.setProperty('top', '1000px');
//     document.getElementById('app-container').style.setProperty('left', '1000px')
// };