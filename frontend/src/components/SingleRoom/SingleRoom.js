import React from 'react';
import dayjs from 'dayjs';
import "./single-room.scss";


const SingleRoom = ({schedule}) => (
    schedule.map((element, index ) => {
        return (
            <div className="individual-rows">
                <span className="panel-time">
                    {dayjs(element.start_time).format('h:mm A')}
                </span>
                <span className="panel-name">
                    {element.name}
                </span>
                <div className="line-separate-place">
                    <hr className="row-divider-time" />
                    <hr className="row-divider-name" />
                </div>
            </div>
        );
    })
);


export default SingleRoom;