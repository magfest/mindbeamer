import React from 'react';
import dayjs from 'dayjs';
import "./single-room.css";


const SingleRoom = ({schedule}) => {
    return (
        <div>
            <div className="column-headers-single">
                <span>Time</span>
                <span>Event</span>
            </div>
            {
            schedule.map((element, index ) => {
                return (
                    <div className={"individual-rows single-row" + ((index % 2 !== 0) ? " orangish" : "")}>
                        <span className="time-area-single">
                            <span className="times-sing start-time-sing">
                                {dayjs.unix(element.start_unix).format('ddd, h:mm')}
                            </span>       
                            &mdash;
                            <span className="times-sing end-time-sing">
                                {dayjs.unix(element.end_unix).format('h:mm A')}
                            </span>
                        </span>
                        <span className="panel-name">
                            {element.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};


export default SingleRoom;