import React, { Component } from 'react';
import produce from 'immer';
import './styles/style.scss';

import logo from './img/drawing.svg';
import device from 'current-device'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      expired: false,
      loading: false,
      device: {
        type: "",
        orientation: ""
      }
    }
  }

  componentDidMount() {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 15, 2019 17:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(() => {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
      var hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      var minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      var seconds = String(Math.floor((distance % (1000 * 60)) / 1000));

      this.setState(produce(draft => {
        draft.days = days.length === 1 ? `0${days}` : days;
        draft.hours = hours.length === 1 ? `${hours}` : hours;
        draft.minutes = minutes.length === 1 ? `0${minutes}` : minutes;
        draft.seconds = seconds.length === 1 ? `0${seconds}` : seconds;
        draft.loading = true;
      }))

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        this.setState(produce(draft => {
          draft.expired = true;
        }))
      }
    }, 1000);

    this.setState(produce(draft => {
      draft.device = {
        type: device.type,
        orientation: device.orientation,
      }
    }))

    device.onChangeOrientation(newOrientation => {
      this.setState(produce(draft => {
        draft.device.orientation = newOrientation;
      }))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading) {
      document.getElementById('root').style.visibility = 'visible';
    }
  }

  render() {
    const { days, hours, minutes, seconds, device: { orientation, type } } = this.state;

    return (
      <div className={`App ${orientation} ${type}`}>
        <div className="__timer-container">
          <div className="__time">
            <h1>{days}</h1>
            <div>
              <p>Days</p>
            </div>
          </div>
          <div className="__colon">
            :
            </div>
          <div className="__time">
            <h1>{hours}</h1>
            <div>
              <p>Hours</p>
            </div>
          </div>
          <div className="d-none d-md-flex __colon">
            :
            </div>
          <div className="w-100 d-md-none"></div>
          <div className="__time">
            <h1>{minutes}</h1>
            <div>
              <p>Minutes</p>
            </div>
          </div>
          <div className="__colon">
            :
            </div>
          <div className="__time">
            <h1>{seconds}</h1>
            <div>
              <p>Seconds</p>
            </div>
          </div>
        </div>
        <div className="__title">
          <img src={logo} alt="system logo" />
          <p>OFFICIAL LAUNCH January 15th 5pm - PARIS</p>
        </div>
        <div className="__footer">
          <p>sales@system-studios.com</p>
          <p>commercial@system-studios.com</p>
          <p>+33 6 98 67 04 05</p>
          <p>+33 1 81 69 95 71</p>
        </div>
      </div>
    );
  }
}

export default App;
