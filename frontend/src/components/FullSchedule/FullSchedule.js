import React from 'react';
import dayjs from 'dayjs';
import { determineIcon } from '../../utils/helpers';
import "./full-schedule.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';


const FullSchedule = ({ fullSchedule }) => (
    fullSchedule.map((element, index ) => {
        return (
            <div className={"individual-rows full-version" + ((index % 2 !== 0) ? " tanned" : "")}>
                <div className="gridded-area">

                    {/* Icon on the left */}
                    <span className="icon-area">
                        <FontAwesomeIcon className="one-icon" icon={determineIcon(element.location)} />
                    </span>

                    {/* Time and panel name area */}
                    <span className="text-area-full top">
                        <span className="time-area">
                            <span className="times start-time">
                                {dayjs.unix(element.start_unix).format('ddd, h:mm')}
                            </span>       
                            &mdash;
                            <span className="times end-time">
                                {dayjs.unix(element.end_unix).format('h:mm A')}:
                            </span>
                        </span>
                        <span className="panel-name-full">
                            {element.name}
                        </span>
                    </span>

                    {/* Visual divider */}
                    <hr className={"tanned-border" + ((index % 2 !== 0) ? " spacier" : " smaller")} />

                    {/* Location area */}
                    <span className="text-area-full bottom">
                        <FontAwesomeIcon icon={faAt} />
                        &nbsp;
                        <span className="location-area">
                            {element.location}
                        </span>
                    </span>

                </div>
            </div>
        );
    })
);


export default FullSchedule;