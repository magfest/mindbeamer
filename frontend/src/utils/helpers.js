import { 
    faDesktop, faMicrophone, faFastForward, faGamepad, faBrain, faChess, faTools, faThLarge, faMusic, faGhost, faProjectDiagram, faDrum, faMicrophoneAlt, faCouch, faDiceD20, faTheaterMasks, faEdit, faHandRock, faMask, faRobot, faBook, faCocktail, faVrCardboard, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
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