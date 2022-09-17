import React from 'react';
//removed axios for space. Add back in as needed
// import axios from 'axios';

import { withRouter } from 'react-router-dom';
import SingleRoom from '../SingleRoom/SingleRoom';
import FullSchedule from '../FullSchedule/FullSchedule';
import GenericInfoSection from '../GenericInfoSection/GenericInfoSection';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';
import { filterTimes, filterToday, orderTimes } from '../../utils/helpers';
import './main.css';

import * as example from 'testConfig/testconfig1.json';
import * as fullSchedule from 'testConfig/super_2022.json';

import mountainsTextCombined from '../../assets/pictures/mountainsTextCombined.svg';

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFull: true,
            schedule: fullSchedule.default,
            loading: false,
            filtered: false,
            gaylordRoom: ""
        }
    }

    componentDidMount() {
        this.doPanelThings();
        this.interval = setInterval(this.doPanelThings, 600000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    doPanelThings = () => {
        let { isFull, filtered } = this.state;
        if (this.props.location.pathname.includes("filtered")) {
            filtered = true;
        } else {
            filtered = false;
        }

        if (this.props.location.pathname.includes("single")) {
            isFull = false;
        } else {
            isFull = true;
        };
        this.setState({ isFull, filtered });
        this.getPanelInfo(isFull, filtered)
    }

    getPanelInfo = (isFullCopy, isFiltered) => {

        if (!isFullCopy) {
            const returnedQuery = this.getQueryString();
            let filteredPanels = this.filterByName(returnedQuery);
            this.cleanPanelInfoTimes(true, isFiltered, filteredPanels);
        }

        // NOTE: Uncomment this when filtering and ordering is desired
        if (isFullCopy) {
            this.cleanPanelInfoTimes(false, isFiltered);
        }
    }

    /* istanbul ignore next */
    cleanPanelInfoTimes = ( isSingleSchedule = false, isFiltered = false,  filteredPanels = []) => {
        let { schedule: tempSchedule } = this.state;

        if (!isFiltered)
            return;

        if ( isSingleSchedule && filteredPanels.length > 0 ){
            tempSchedule = filterToday(filteredPanels);
        }

        tempSchedule = orderTimes(filterTimes(tempSchedule));

        this.setState({ schedule: tempSchedule });
    }

    getQueryString = () => {
        const queryToParse = new URLSearchParams(this.props.location.search);
        const query = queryToParse.get('place');
        return query;
    }

    filterByName = ( filterKeyword ) => {
        let { schedule: tempPanels } = this.state;
        let gaylordRoomExtr = "";
        const filteredPanels = tempPanels.filter( key => { 
            return key.location.includes(filterKeyword) 
        });

        if (filteredPanels.length >= 1) {
            gaylordRoomExtr = filteredPanels[0].location.match(/\(([^)]+)\)/)?.[1] ?? "N/A";
        }

        this.setState({ schedule: filteredPanels, gaylordRoom: gaylordRoomExtr });
        return filteredPanels;
    }

    render(){
        const { schedule, loading, isFull, gaylordRoom } = this.state;
        const { main_event: smallSchedule } = example.default.rooms;
        return (
            <div id="main-container">
                <div id="header">
                    <div className="generic-info-box">
                        <GenericInfoSection isFull={isFull} />
                    </div>
                    <img src={ mountainsTextCombined } className="mountainsCombined" />
                </div><div id="background-colors">
                    <div id="panels-info" 
                    className={(isFull) ? "is-full-class": "is-small-class"}
                    >
                        <div className="left-side">
                            <Map isFull={isFull} />
                        </div>
                        <div className="right-side">
                            {
                            /* istanbul ignore next */
                            (loading) ? (
                                <Loading />
                            ):(this.state.schedule.length === 0) ? (
                                <div className={"empty-message " + ((isFull)? "tan" : "orange")}>
                                    Nothing to show here!
                                </div>
                            ): 
                            ((isFull) ?
                                <div>
                                    <FullSchedule fullSchedule={ schedule } />
                                </div>
                                :
                                <div>
                                    { gaylordRoom &&
                                    <div className="single-room-panel-name">
                                        <span>
                                        <b>Panel Room:</b> { this.getQueryString() }
                                        </span>
                                        <span><b>Gaylord Room:</b> { gaylordRoom}
                                        </span>
                                    </div>
                                    }
                                    <SingleRoom schedule={ schedule } />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(Main);