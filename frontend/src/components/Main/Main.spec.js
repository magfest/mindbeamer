import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import dayjs from 'dayjs';
import Main from './Main';
import mockSchedule from '../../../__mocks__/super_2019_panels_json.json';


function checkTime(duration, timeType) {
    return (dayjs().isSame(dayjs().add(duration, timeType), 'day'));
}

jest.setMock('../../../../../examples/super_2019_panels_json.json', require('../../../__mocks__/super_2019_panels_json.json'));


describe('Test if panels display', () => {

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test('Renders children', () => {
        const wrapper = mount(<Router><Main /></Router>);
        const foundName = wrapper.find('.panel-name-long');
        expect(foundName).toHaveLength(20);
    });


    test('Change Name', () => {
        mockSchedule[0].name = "Open Jamaaaan";
        const wrapper = mount(<Router><Main /></Router>);
        const foundName = wrapper.find('.panel-name-long').at(0).text();
        expect(foundName).toBe('Open Jamaaaan');
    });

    test('Clears Intervals', () => {
        const wrapper = mount(<Router><Main /></Router>);
        jest.useFakeTimers();
        wrapper.unmount();
        expect(clearInterval).toHaveBeenCalled();
    });
});

describe('Test if routes work properly', () => {
    beforeEach(() => {
        delete window.location;
    })


    test('Goes to single panel display in Panels 1', () => {
        window.location = new URL('http://localhost:3000/#/single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);
        const foundName = wrapper.find('.panel-name').at(0).text();
        const panelAmount = wrapper.find('.individual-rows.single-row').length;
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;

        expect(foundName).toContain('Welcome to MAGFest!');
        expect(panelAmount).toBe(3);
        expect(fullPanelNameAmount).toBe(0);
    });

    test('Goes to single panel display in Tabletop Discussions', () => {
        window.location = new URL('http://localhost:3000/#/single?place=Tabletop+Discussions');

        const wrapper = mount(<Router><Main /></Router>);
        const foundName = wrapper.find('.panel-name').at(0).text();
        const panelAmount = wrapper.find('.individual-rows.single-row').length;
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;

        expect(foundName).toContain('Mastering Your Dungeons: Making D&D Adventures Like a Boss!');
        expect(panelAmount).toBe(2);
        expect(fullPanelNameAmount).toBe(0);
    });

    test('Goes to full panel display', () => {
        window.location = new URL('http://localhost:3000/#/')

        const wrapper = mount(<Router><Main /></Router>);
        const foundLocation = wrapper.find('.location-area').at(0).text();
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;
        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(foundLocation).toContain('Jamspace');
        expect(singlePanelNameAmount).toBe(0);
        expect(fullPanelNameAmount).toBe(20);
    });

});

describe('Test timed events for Single Panels', () => {
    let counter;

    afterEach(() => {
        delete window.location;
        jest.clearAllMocks();
        jest.useRealTimers()
        counter = 0;
    });

    afterAll(() => {
        mockSchedule[3].start_unix = 1546534800;
        mockSchedule[3].end_unix = 1546538400;
        mockSchedule[9].start_unix = 1546536600;
        mockSchedule[9].end_unix = 1546538400;
        mockSchedule[10].start_unix = 1546538400;
        mockSchedule[10].end_unix = 1546542000;
        mockSchedule[13].start_unix = 1546542000;
        mockSchedule[13].end_unix = 1546556400;
        mockSchedule[8].start_unix = 1546536600;
        mockSchedule[8].end_unix = 1546540200;
        mockSchedule[18].start_unix = 1546542000;
        mockSchedule[18].end_unix = 1546545600;
        mockSchedule[19].start_unix = 1546543800;
        mockSchedule[19].end_unix = 1546547400;

        mockSchedule[4].start_unix = 1546534800;
        mockSchedule[4].end_unix = 1546538400;
        mockSchedule[11].start_unix = 1546540200;
        mockSchedule[11].end_unix = 1546543800;
    });

    test('Correct time & panel name is displayed', () => {
        mockSchedule[3].start_unix = 1640361627;
        mockSchedule[3].end_unix = 1640363427;

        window.location = new URL('http://localhost:3000/#/single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);
        const foundTime = wrapper.find('.times-sing.start-time-sing').at(0).text();
        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        const panelRoomListing = wrapper.find('.single-room-panel-name').at(0).text();

        expect(foundTime).toBe('Fri, 11:00');
        expect(singlePanelNameAmount).toBe(3);

        expect(panelRoomListing).toBe('Panel Room: Panels 1Gaylord Room: Cherry Blossom Ballroom');
    });

    test('Goes to single panel display with 1 event today', () => {
        // Checks to ensure mocks are within the same day before testing it
        mockSchedule[9].start_unix = dayjs().add(1, 'hour').unix();
        mockSchedule[9].end_unix = dayjs().add(2, 'hour').unix();
        if (checkTime(1, 'hour')) counter += 1;

        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Tabletop+Indie+Showcase');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(singlePanelNameAmount).toBe(counter);
    });


    test('Display has 1 event today and timers are advanced', () => {
        jest.useFakeTimers();

        // Checks to ensure mocks are within the same day before testing it
        mockSchedule[13].start_unix = dayjs().add(2, 'hour').unix();
        mockSchedule[13].end_unix = dayjs().add(3, 'hour').unix();
        if (checkTime(2, 'hour')) counter += 1;

        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Arcade');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmountInitial = wrapper.find('.individual-rows.single-row').length;

        jest.advanceTimersByTime(700000);

        const singlePanelNameAmountAdvanced = wrapper.find('.individual-rows.single-row').length;

        expect(singlePanelNameAmountInitial).toBe(counter);
        expect(singlePanelNameAmountInitial).toEqual(singlePanelNameAmountAdvanced);
    });

    test('Goes to single panel display with 2 events today', () => {
        // Checks to ensure mocks are within the same day before testing it
        mockSchedule[10].start_unix = dayjs().add(20, 'minute').unix();
        mockSchedule[10].end_unix = dayjs().add(30, 'minute').unix();
        if (checkTime(20, 'minute')) counter += 1;

        // Checks to ensure mocks are within the same day before testing it
        mockSchedule[19].start_unix = dayjs().add(10, 'minute').unix();
        mockSchedule[19].end_unix = dayjs().add(20, 'minute').unix();
        if (checkTime(10, 'minute')) counter += 1;

        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(singlePanelNameAmount).toBe(counter);
        if (checkTime(10, 'minute')) {
            expect(
                wrapper.find('.panel-name').at(0).text()
            ).toContain('TASBot and Tool-Assisted Speedruns: A History');
        }
    });

    test('Goes to single panel display with 1 event a day from now', () => {
        mockSchedule[4].start_unix = dayjs().add(1, 'day').unix();
        mockSchedule[4].end_unix = dayjs().add(2, 'day').unix();

        // Checks to ensure mocks are within the same day before testing it
        mockSchedule[11].start_unix = dayjs().add(20, 'minute').unix();
        mockSchedule[11].end_unix = dayjs().add(30, 'minute').unix();
        if (checkTime(20, 'minute')) counter += 1;

        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+3');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;
        expect(singlePanelNameAmount).toBe(counter);
    });


    test('Test 1 wrong time added', () => {
        //Tuesday, October 19, 2021 2:00:00 PM 
        mockSchedule[8].start_unix = 1634666400;
        //Tuesday, October 19, 2021 3:00:00 PM 
        mockSchedule[8].end_unix = 1634670000;

        // Checks to ensure mocks are within the same day before testing it
        mockSchedule[18].start_unix = dayjs().add(15, 'minute').unix();
        mockSchedule[18].end_unix = dayjs().add(30, 'minute').unix();
        if (checkTime(15, 'minute')) counter += 1;

        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Tabletop+Discussions');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;
        expect(singlePanelNameAmount).toBe(counter);
    });



    test('Goes to single panel display with no future events', () => {
        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+4');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;
        expect(singlePanelNameAmount).toBe(counter);
    });

});


describe('Test timed events for Full Display', () => {

    afterEach(() => {
        delete window.location;
        jest.clearAllMocks();
    });

    afterAll(() => {
        mockSchedule[4].start_unix = 1546534800;
        mockSchedule[4].end_unix = 1546538400;
        mockSchedule[7].start_unix = 1546536600;
        mockSchedule[7].end_unix = 1546542000;
        mockSchedule[9].start_unix = 1546536600;
        mockSchedule[9].end_unix = 1546538400;
    });

    test('There are no events in the future', () => {
        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered');

        const wrapper = mount(<Router><Main /></Router>);

        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;

        expect(fullPanelNameAmount).toBe(0);
    });

    test('The unfiltered full panel display', () => {
        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/');

        const wrapper = mount(<Router><Main /></Router>);
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;

        expect(fullPanelNameAmount).toBe(20);
    });


    test('There are multiple events in the future', () => {
        mockSchedule[4].start_unix = dayjs().add(4, 'hour').unix();
        mockSchedule[4].end_unix = dayjs().add(5, 'hour').unix();

        mockSchedule[7].start_unix = dayjs().add(1, 'day').add(2, 'hour').unix();
        mockSchedule[7].end_unix = dayjs().add(1, 'day').add(3, 'hour').unix();


        mockSchedule[9].start_unix = dayjs().add(4, 'day').add(4, 'hour').unix();
        mockSchedule[9].end_unix = dayjs().add(4, 'day').add(5, 'hour').unix();

        // Goes to the displays to test
        window.location = new URL('http://localhost:3000/#/filtered');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;

        expect(singlePanelNameAmount).toBe(0);
        expect(fullPanelNameAmount).toBe(3);
    });
});