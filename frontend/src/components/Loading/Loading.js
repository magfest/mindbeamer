import React from 'react';
import './loading.scss';


const Loading = () => {
    return (
        <div id="loading-container">
            <div className="loading-text">Loading...</div>
            <div className="loader-animation"></div> 
        </div>
    );
}

export default Loading;