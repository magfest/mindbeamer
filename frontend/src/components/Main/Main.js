import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import SingleRoom from '../SingleRoom/SingleRoom';
import FullSchedule from '../FullSchedule/FullSchedule';
import GenericInfoSection from '../GenericInfoSection/GenericInfoSection';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';
import { filterTimes, orderTimes } from '../../utils/helpers';
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
        this.doPanelThings();
        this.interval = setInterval(this.doPanelThings, 600000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    doPanelThings = () => {
        this.getPanelInfo();
        if (this.props.location.pathname.includes("single")) {
            this.setState({ isFull: false });
        } else {
            this.setState({ isFull: true });
        };
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
        })
        .finally( () => {
            // do some processing or cleanup once the promise is settled, regardless of its outcome

            if (!this.state.isFull && this.props.location.pathname.includes("single")) {
                const returnedQuery = this.getQueryString();
                this.filterByName(returnedQuery);
            }

            // NOTE: Uncomment this when filtering and ordering is desired
            // this.cleanPanelInfoTimes();
        });
    }


    cleanPanelInfoTimes = ( inputSchedule ) => {
        let { schedule: tempSchedule } = this.state;

        if (inputSchedule)
            tempSchedule = inputSchedule;

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

        const filteredPanels = tempPanels.filter( key => { 
            return key.location.includes(filterKeyword) 
        });

        this.setState({ schedule: filteredPanels });
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
                                        Panel Room: { this.getQueryString() }
                                    </div>
                                    <SingleRoom schedule={ schedule } />
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



export default withRouter(Main);