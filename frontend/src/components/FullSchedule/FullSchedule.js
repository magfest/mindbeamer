import React from 'react';
import dayjs from 'dayjs';
import { determineIcon } from '../../utils/helpers';
import "./full-schedule.css";


const FullSchedule = ({ fullSchedule }) => {
    return (
        <div>
            <div className="column-headers">
                <span>Time</span>
                <span>Event</span>
                <span>Room</span>
            </div>
            <div id="scroll-schedule">
                { fullSchedule.map((element, index ) => {
                return (
                    <div className={"individual-rows full-version" + ((index % 2 !== 0) ? " tanned" : "")}>
                    <div className="gridded-area">
                            <span className="time-area">
                                <span className="times start-time">
                                    {dayjs.unix(element.start_unix).format('ddd, h:mm')}
                                </span>       
                                &mdash;
                                <span className="times end-time">
                                    {dayjs.unix(element.end_unix).format('h:mm A')}
                                </span>
                            </span>


                            <span className="panel-name-full">
                                {/* Icon on the left */}
                                <span className="icon-area">
                                    <img className="one-icon" src={determineIcon(element.location)} />
                                </span>
                                <span className="panel-name-long">
                                {
                                element.name 
                                }
                                </span>
                            </span>
                            <span className="location-area">
                                {element.location}
                            </span>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
    );
};


export default FullSchedule;