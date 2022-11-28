import React, { useState } from 'react';
import './map.css';
import map1 from '../../assets/pictures/2022-01-03-GaylordMap.jpg';
import squareXmark from '../../assets/icons/square-xmark.svg';

const Map = ({isFull}) => {
    return (
        <div id="map-container" className="map-col-normal">
            <div id="map-section">
                <div className="map-header">
                    <span id="header-text">Convention Maps</span>
                </div>
                <img src={map1} className="mapPictures" />
            </div>
        </div>
    )
}


export default Map;