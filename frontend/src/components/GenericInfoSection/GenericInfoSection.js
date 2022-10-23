import React from 'react';
import Clock from '../Clock/Clock';
import './generic-info-section.css';
import superMagfestMainQR from '../../assets/pictures/superMagfestMainQR_purple.png';


const GenericInfoSection = ({ isFull }) => {
    return (
        <div id="generic-info-section" className={(!isFull) ? "orangish" : "yellowish"}>
            <div className="flexed-content-generic">
                <img src={superMagfestMainQR} className="qrCode" />
                <Clock />
            </div>
        </div>
    )
};


export default GenericInfoSection;