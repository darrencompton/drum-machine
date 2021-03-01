import "./App.css";
import { Component } from "react";
import audioTune1 from "./assets/RDM_Analog_MT40_90-01.wav";
import audioTune2 from "./assets/RDM_Analog_MT40_90-02.wav";
import audioTune3 from "./assets/RDM_Analog_SR88_90-01.wav";
import audioTune4 from "./assets/RDM_Copicat_SR88_90-02.wav";
import audioTune5 from "./assets/RDM_Analog_SY1_90-01.wav";
import audioTune6 from "./assets/RDM_Analog_SY1_90-02.wav";
import audioTune7 from "./assets/RDM_Copicat_MT40_90-01.wav";
import audioTune8 from "./assets/RDM_Copicat_SY1_90-01.wav";
import audioTune9 from "./assets/RDM_Copicat_SR88_90-01.wav";

const soundMap = {
  Q: { soundFile: audioTune1, message: "Playing Drum Loop 1" },
  W: { soundFile: audioTune2, message: "Playing Drum Loop 2" },
  E: { soundFile: audioTune3, message: "Playing Drum Loop 3" },
  A: { soundFile: audioTune4, message: "Playing Drum Loop 4" },
  S: { soundFile: audioTune5, message: "Playing Drum Loop 5" },
  D: { soundFile: audioTune6, message: "Playing Drum Loop 6" },
  Z: { soundFile: audioTune7, message: "Playing Drum Loop 7" },
  X: { soundFile: audioTune8, message: "Playing Drum Loop 8" },
  C: { soundFile: audioTune9, message: "Playing Drum Loop 9" },
};
class App extends Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.state = { displayMessage: "Not Playing Sound" };
    this.logKey = this.logKey.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.logKey);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.logKey);
  }
  async logKey(e) {
    var key = e.code[3];
    if (soundMap[key]) {
      const sound = document.getElementById(key);
      sound.currentTime = 0;
      this.setState({ displayMessage: soundMap[key].message });
      await sound.play();
    }
  }
  playSound = (key) => {
    const sound = document.getElementById(key);
    sound.currentTime = 0;
    this.setState({ displayMessage: soundMap[key].message });
    sound.play();
  };
  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <div className="header">
            <h1> Drum Machine</h1>
            <br />
          </div>
          <DrumPad keyPress="Q" playSound={this.playSound} />
          <DrumPad keyPress="W" playSound={this.playSound} />
          <DrumPad keyPress="E" playSound={this.playSound} />
          <DrumPad keyPress="A" playSound={this.playSound} />
          <DrumPad keyPress="S" playSound={this.playSound} />
          <DrumPad keyPress="D" playSound={this.playSound} />
          <DrumPad keyPress="Z" playSound={this.playSound} />
          <DrumPad keyPress="X" playSound={this.playSound} />
          <DrumPad keyPress="C" playSound={this.playSound} />
          <div className="footer">
            <h2>{this.state.displayMessage}</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

class DrumPad extends Component {
  render() {
    const { keyPress: key } = this.props;
    return (
      <div
        className="drum-pad"
        onClick={() => {
          this.props.playSound(key);
        }}
      >
        <audio id={key} src={soundMap[key].soundFile} />
        {key}
      </div>
    );
  }
}
