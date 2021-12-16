import React from 'react';
import dayjs from 'dayjs';
import { determineIcon } from '../../utils/helpers';
import "./full-schedule.css";
import { ReactComponent as FaAt } from '../../assets/icons/at.svg';


const FullSchedule = ({ fullSchedule }) => {
    return (
        <div>
            <div className="column-headers">
                <span>Time</span>
                <span>Event</span>
                <span>Room</span>
            </div>
            { fullSchedule.map((element, index ) => {
             return (
                <div className={"individual-rows full-version" + ((index % 2 !== 0) ? " tanned" : "")}>
                <div className="gridded-area">


                    {/* Time and panel name area */}
                    {/* <span className="text-area-full top"> */}
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
                            {element.name}
                        </span>
                    {/* </span> */}

                    {/* Visual divider */}
                    {/* <hr className={"tanned-border" + ((index % 2 !== 0) ? " spacier" : " smaller")} /> */}

                    {/* Location area */}
                    {/* <span className="text-area-full bottom"> */}
                        {/* <FaAt fill={((index % 2 !== 0) ?  "#1F0A02" : "white")} stroke={((index % 2 !== 0) ? "#1F0A02" : "white")} className="at-icon" />
                        &nbsp; */}
                        <span className="location-area">
                            {element.location}
                        </span>
                    {/* </span> */}

                </div>
            </div>
            )
        })}
    </div>
    );
};


export default FullSchedule;