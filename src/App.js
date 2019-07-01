import React, { Component } from 'react';
import './App.css';
import reframe from 'reframe.js'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <p>Call it a night once the embedded iframe is added</p>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.video = '1cH2cerUpMQ' //video id

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              reframe(e.target.a);
            }
          }
        }
      });
    };
  }
  render() {
    const style = `.max-width-1024 { max-width: 1024px; margin: 0 auto; }`;
    return (<div>
        <style>{style}</style>
      <div className="max-width-1024">
      <div className="embed-responsive embed-responsive-16by9" id="player">
      </div>
    </div>
      </div>
    );
  }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log('paused');
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
      default:
        console.log('inside default block');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
      default:
          console.log('inside default block');
          break;
    };
  };
}

export default App;