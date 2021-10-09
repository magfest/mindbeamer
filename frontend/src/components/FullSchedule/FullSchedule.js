import React from 'react';
import dayjs from 'dayjs';
import "./full-schedule.scss";


const FullSchedule = ({ fullSchedule }) => (
    fullSchedule.map((element, index ) => {
        return (
            <div className="individual-rows">
                <span className="panel-time">
                    {dayjs(element.start_unix).format('h:mm A')}
                </span>
                <span className="panel-name">
                    {element.name}
                </span>
            </div>
        );
    })
);


export default FullSchedule;