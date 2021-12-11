import React from 'react';
import dayjs from 'dayjs';
import "./single-room.css";


const SingleRoom = ({schedule}) => (
    schedule.map((element, index ) => {
        return (
            <div className="individual-rows single-row">
                <span className="panel-time">
                    {dayjs.unix(element.start_unix).format('h:mm A')}
                </span>
                <span className="panel-name">
                    {element.name}
                </span>
            </div>
        );
    })
);


export default SingleRoom;