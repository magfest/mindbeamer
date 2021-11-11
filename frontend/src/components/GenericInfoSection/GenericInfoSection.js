import React from 'react';
import Clock from '../Clock/Clock';
import './generic-info-section.scss';
import superMagfestMainQR from '../../assets/pictures/superMagfestMainQR.png';


const GenericInfoSection = ({ isFull }) => {
    return (
        <div id="generic-info-section" className={(!isFull) ? "orangish" : "yellowish"}>
            <div className="flexed-content-generic">
                <span className="guidebook-text-qrCode">
                    <span className="guidebook-text">
                        Guidebook:
                    </span>
                    <img src={superMagfestMainQR} className="qrCode" />
                </span>
                <Clock />
            </div>
        </div>
    )
};


export default GenericInfoSection;