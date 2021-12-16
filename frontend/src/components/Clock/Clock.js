import React from 'react';
import faTable from '../../assets/icons/table.svg';
import faClock from '../../assets/icons/clock.svg';
import faPhone from '../../assets/icons/phone.svg';
import "./clock.css";



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
            <img className="table-icon" src={faTable} />&nbsp;
            <b>Date:</b> {this.state.date.toLocaleDateString('en-US', options)}
          </div>
          <div className="informational-section">
            <img className="clock-icon" src={faClock} />&nbsp;
            <b>Time:</b> {this.state.date.toLocaleTimeString('en-US', { hour12: true })}
          </div>
          <div className="informational-section">
            <img className="phone-icon" src={faPhone} />&nbsp;
            <b>Security Phone:</b> 1-833-337-8732
          </div>
        </div>
      );
    }
}

export default Clock;