import React from 'react';
import axios from 'axios';
import SingleRoom from '../SingleRoom/SingleRoom';
import FullSchedule from '../FullSchedule/FullSchedule';
import GenericInfoSection from '../GenericInfoSection/GenericInfoSection';
import Loading from '../Loading/Loading';
import "./main.scss";

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
        return (
            <div id="main-container">
                <div id="header">
                    <img src={ mountainsTextCombined } className="mountainsCombined" />
                </div><div id="background-colors" className={(loading)? "full-view": ""}>
                    <div id="panels-info">
                        <GenericInfoSection isFull={isFull} />
                        {
                        (loading) ? (
                            <Loading />
                        ):((isFull) ?
                            <FullSchedule fullSchedule={ schedule } />
                            :
                            <SingleRoom schedule={ example.default.rooms.main_event.schedule } />
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}



export default Main;