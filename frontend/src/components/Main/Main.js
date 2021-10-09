import React from 'react';
import * as example from 'testConfig/testconfig1.json';


class Main extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        const { schedule } = example.default.rooms.main_event;
        
        // for debugging purposes
        //console.log(JSON.stringify(example.default.rooms.main_event.schedule));
        return (
            <div>
                {
                    schedule.map((element, index ) => {
                        return (
                            <div>
                                <span>{element.start_time}</span>
                            </div>
                        )
                    })
                }

                {/* hello world */}
            </div>
        )
    }
}



export default Main;