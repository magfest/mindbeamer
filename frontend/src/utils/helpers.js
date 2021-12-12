import faDesktop from '../assets/icons/desktop.svg';
import faMicrophone from '../assets/icons/microphone.svg';
import faFastForward from '../assets/icons/forward-fast.svg';
import faGamepad from '../assets/icons/gamepad.svg';
import faBrain from '../assets/icons/brain.svg';
import faChess from '../assets/icons/chess-king.svg';
import faTools from '../assets/icons/toolbox.svg';
import faThLarge from '../assets/icons/th-large-solid.svg';
import faMusic from '../assets/icons/music.svg';
import faGhost from '../assets/icons/ghost.svg';
import faProjectDiagram from '../assets/icons/project-diagram-solid.svg';
import faDrum from '../assets/icons/drum.svg';
import faMicrophoneAlt from '../assets/icons/microphone-alt-solid.svg';
import faCouch from '../assets/icons/couch.svg';
import faDiceD20 from '../assets/icons/dice-d20.svg';
import faTheaterMasks from '../assets/icons/theater-masks-solid.svg';
import faEdit from '../assets/icons/edit-solid.svg';
import faHandRock from '../assets/icons/hand-rock-solid.svg';
import faMask from '../assets/icons/mask.svg';
import faRobot from '../assets/icons/robot.svg';
import faBook from '../assets/icons/book.svg';
import faCocktail from '../assets/icons/cocktail-solid.svg';
import faVrCardboard from '../assets/icons/vr-cardboard.svg';
import faGlassCheers from '../assets/icons/glass-cheers-solid.svg';
import dayjs from 'dayjs';

export const determineIcon = (location) => {
    let keywords = [
        {type: 'Tabletop', icon: faChess }, 
        {type: 'Panels', icon: faDesktop }, 
        {type: 'Makerspace', icon: faTools }, 
        {type: 'magFAST', icon: faFastForward }, 
        {type: 'Jam', icon: faDrum }, 
        {type: 'Chipspace', icon: faMusic }, 
        {type: 'Arena', icon: faThLarge }, 
        {type: 'Arcade', icon: faGamepad }, 
        {type: 'Simulations', icon: faBrain },
        {type: 'Consoles', icon: faGhost },
        {type: 'LAN', icon: faProjectDiagram },
        {type: 'Concerts', icon: faMicrophone },
        {type: 'MAGES', icon: faMicrophoneAlt },
        {type: 'POSE', icon: faCouch },
        {type: 'D&D Adventurers', icon: faDiceD20 },
        {type: 'LARP', icon: faTheaterMasks },
        {type: 'Autographs', icon: faEdit },
        {type: 'Rock Island', icon: faHandRock },
        {type: 'Cosplay', icon: faMask },
        {type: 'Robotics', icon: faRobot },
        {type: 'Museum', icon: faBook },
        {type: 'Lobby Bar', icon: faCocktail },
        {type: 'VR', icon: faVrCardboard },
        {type: 'party', icon: faGlassCheers }
    ];
    let choosenIcon = keywords[1].icon;

    keywords.forEach( keyword => {
        if (location.includes(keyword.type)) {
            choosenIcon = keyword.icon;
            return;
        }
    });
    return choosenIcon;
}


export const filterTimes = (schedule) => {
    let now = dayjs();
    const filteredSchedule = schedule.filter( key => {
        return now.isBefore(dayjs.unix(key.end_unix))
    });

    return filteredSchedule;
}


export const filterToday = (schedule) => {

    const filteredSchedule = schedule.filter( key => {
        return dayjs().isSame(dayjs.unix(key.start_unix), 'day');
    });
    return filteredSchedule;
}


export const orderTimes = (schedule) => {
    return schedule.sort( (a, b) => {
        return a.start_unix - b.start_unix
    });
}