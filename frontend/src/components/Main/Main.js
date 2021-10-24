import React from 'react';
import axios from 'axios';
import SingleRoom from '../SingleRoom/SingleRoom';
import FullSchedule from '../FullSchedule/FullSchedule';
import GenericInfoSection from '../GenericInfoSection/GenericInfoSection';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';
import './main.scss';

import * as example from 'testConfig/testconfig1.json';
import * as fullSchedule from 'testConfig/super_2019_panels_json.json';

import mountainsTextCombined from '../../assets/pictures/mountainsTextCombined.svg';

class Main extends React.Component {
    constructor(props){
        super(props);
        // TODO: change what state it is based on api
        this.state = {
            isFull: true,
            schedule: fullSchedule.default,
            loading: true
        }
    }

    componentDidMount() {
        this.getPanelInfo();
        this.interval = setInterval(this.getPanelInfo, 600000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    getPanelInfo = () => {
        axios.get('https://super2019.reggie.magfest.org/schedule/panels_json')
        .then( response => {
            console.log(response);
            this.setState({ schedule: response.data, loading: false });
        })
        .catch( error => {
            this.setState({ loading: false });
            console.log(error);
        });
    }


    render(){
        const { schedule, loading, isFull } = this.state;
        const { main_event: smallSchedule } = example.default.rooms;
        return (
            <div id="main-container">
                <div id="header">
                    <img src={ mountainsTextCombined } className="mountainsCombined" />
                </div><div id="background-colors">
                    <div id="panels-info" 
                    className={(isFull) ? "is-full-class": "is-small-class"}
                    >
                        <div className="left-side">
                            <GenericInfoSection isFull={isFull} />
                            <Map isFull={isFull} />
                        </div>
                        <div className="right-side">
                            {
                            (loading) ? (
                                <Loading />
                            ):((isFull) ?
                                <div>
                                    <FullSchedule fullSchedule={ schedule } />
                                </div>
                                :
                                <div>
                                    <div className="single-room-panel-name">
                                        Panel: { smallSchedule.human_name }
                                    </div>
                                    <SingleRoom schedule={ smallSchedule.schedule } />
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Main;