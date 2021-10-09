import React from 'react';
import SingleRoom from '../SingleRoom/SingleRoom';
import * as example from 'testConfig/testconfig1.json';
import "./main.scss";
import mountainsTextCombined from "../../assets/pictures/mountainsTextCombined.svg";

class Main extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        const { schedule } = example.default.rooms.main_event;
        return (
            <div id="main-container">
                <div id="header">
                    <img src={ mountainsTextCombined } className="mountainsCombined" />
                </div>
                <div id="background-colors">
                    <div id="panels-info">
                        <SingleRoom schedule={schedule} />
                    </div>
                </div>
            </div>
        )
    }
}



export default Main;