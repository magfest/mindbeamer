import React from 'react';
import dayjs from 'dayjs';
import "./single-room.scss";


const SingleRoom = ({schedule}) => (
    schedule.map((element, index ) => {
        return (
            <div className="individual-rows single-row">
                <span className="panel-time">
                    {dayjs(element.start_time).format('h:mm A')}
                </span>
                <span className="panel-name">
                    {element.name}
                </span>
            </div>
        );
    })
);


export default SingleRoom;