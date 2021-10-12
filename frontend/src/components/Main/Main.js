import React from 'react';
import SingleRoom from '../SingleRoom/SingleRoom';
import FullSchedule from '../FullSchedule/FullSchedule';
import GenericInfoSection from '../GenericInfoSection/GenericInfoSection';
import * as example from 'testConfig/testconfig1.json';
import * as fullSchedule from 'testConfig/super_2019_panels_json.json';
import "./main.scss";

import mountainsTextCombined from '../../assets/pictures/mountainsTextCombined.svg';

class Main extends React.Component {
    constructor(props){
        super(props);
        // TODO: change what state it is based on api
        this.state = {
            isFull: true,
        }
    }


    render(){
        const { schedule } = example.default.rooms.main_event;
        const { isFull } = this.state;
        // TODO: include code to filter schedule based on current time
        return (
            <div id="main-container">
                <div id="header">
                    <img src={ mountainsTextCombined } className="mountainsCombined" />
                </div><div id="background-colors">
                    <div id="panels-info">
                        <GenericInfoSection isFull={isFull} />
                        { (isFull) ?
                            <FullSchedule fullSchedule={ fullSchedule.default } />
                            :
                            <SingleRoom schedule={ schedule } />
                        }
                    </div>
                </div>
            </div>
        )
    }
}



export default Main;