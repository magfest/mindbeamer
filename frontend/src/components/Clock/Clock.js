import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faClock } from '@fortawesome/free-solid-svg-icons';
import "./clock.scss";



class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }


    render(){
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true };
      return (
        <div id="clock-container">
          <div className="informational-section date-area">
            <FontAwesomeIcon className="table-icon" icon={faTable} />&nbsp;
            <b>Date:</b> {this.state.date.toLocaleDateString('en-US', options)}
          </div>
          <div className="informational-section">
            <FontAwesomeIcon className="clock-icon" icon={faClock} />&nbsp;
            <b>Time:</b> {this.state.date.toLocaleTimeString('en-US', { hour12: true })}
          </div>
        </div>
      );
    }
}

export default Clock;