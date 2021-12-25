import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import dayjs from 'dayjs';
import Main from './Main';
import mockSchedule from '../../../__mocks__/super_2019_panels_json.json';



jest.setMock('../../../../../examples/super_2019_panels_json.json', require('../../../__mocks__/super_2019_panels_json.json'));


describe('Test if panels display', () => {

    afterEach(() => {
        jest.clearAllMocks();
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


    afterEach(() => {
        delete window.location;
        jest.clearAllMocks();
    });

    afterAll(() => {
        mockSchedule[3].start_unix = 1546534800;
        mockSchedule[3].end_unix = 1546538400;
        mockSchedule[10].start_unix = 1546538400;
        mockSchedule[10].end_unix = 1546542000;
        mockSchedule[8].start_unix = 1546536600;
        mockSchedule[8].end_unix = 1546540200;
        mockSchedule[18].start_unix = 1546542000;
        mockSchedule[18].end_unix = 1546545600;
    });

    test('Correct time is displayed', () => {
        mockSchedule[3].start_unix = 1640361627;
        mockSchedule[3].end_unix = 1640363427;

        window.location = new URL('http://localhost:3000/#/single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);
        const foundTime = wrapper.find('.times-sing.start-time-sing').at(0).text();

        expect(foundTime).toBe('Fri, 11:00');
    });

    test('Goes to single panel display with 1 event today', () => {
        mockSchedule[3].start_unix = dayjs().add(1, 'hour').unix();
        mockSchedule[3].end_unix = dayjs().add(2, 'hour').unix();
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;
        const foundName = wrapper.find('.panel-name').at(0).text();

        expect(foundName).toContain('Welcome to MAGFest!');
        expect(singlePanelNameAmount).toBe(1);
    });

    test('Goes to single panel display with 2 events today', () => {
        mockSchedule[3].start_unix = dayjs().add(1, 'hour').unix();
        mockSchedule[3].end_unix = dayjs().add(2, 'hour').unix();

        mockSchedule[10].start_unix = dayjs().add(5, 'hour').unix();
        mockSchedule[10].end_unix = dayjs().add(6, 'hour').unix();
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(singlePanelNameAmount).toBe(2);
    });

    test('Goes to single panel display with 1 event a day from now', () => {
        mockSchedule[3].start_unix = dayjs().add(1, 'day').unix();
        mockSchedule[3].end_unix = dayjs().add(2, 'day').unix();

        mockSchedule[10].start_unix = dayjs().add(5, 'hour').unix();
        mockSchedule[10].end_unix = dayjs().add(6, 'hour').unix();
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);

        const foundName = wrapper.find('.panel-name').at(0).text();
        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(foundName).toContain('How To Swadge! Use your electronic badge for good not evil!');
        expect(singlePanelNameAmount).toBe(1);
    });


    test('Test 1 wrong time added', () => {
        //Tuesday, October 19, 2021 2:00:00 PM 
        mockSchedule[8].start_unix = 1634666400;
        //Tuesday, October 19, 2021 3:00:00 PM 
        mockSchedule[8].end_unix = 1634670000;

        mockSchedule[18].start_unix = dayjs().add(3, 'hour').unix();
        mockSchedule[18].end_unix = dayjs().add(4, 'hour').unix();
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Tabletop+Discussions');

        const wrapper = mount(<Router><Main /></Router>);

        const foundName = wrapper.find('.panel-name').at(0).text();
        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(foundName).toContain('When RPGs Go Wrong');
        expect(singlePanelNameAmount).toBe(1);
    });

});


describe('Test timed events for Full Display', () => {

    afterEach(() => {
        delete window.location;
        jest.clearAllMocks();
    });


    test('There are multiple events in the future', () => {
        mockSchedule[4].start_unix = dayjs().add(4, 'hour').unix();
        mockSchedule[4].end_unix = dayjs().add(5, 'hour').unix();

        mockSchedule[7].start_unix = dayjs().add(1, 'day').add(2, 'hour').unix();
        mockSchedule[7].end_unix = dayjs().add(1, 'day').add(3, 'hour').unix();


        mockSchedule[9].start_unix = dayjs().add(4, 'day').add(4, 'hour').unix();
        mockSchedule[9].end_unix = dayjs().add(4, 'day').add(5, 'hour').unix();

        window.location = new URL('http://localhost:3000/#/filtered');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;
        const fullPanels = wrapper.find('.individual-rows.full-version');

        
        expect(singlePanelNameAmount).toBe(0);
        expect(fullPanelNameAmount).toBe(3);
    });
});