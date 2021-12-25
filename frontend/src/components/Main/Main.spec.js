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


    test('Goes to single panel display', () => {
        window.location = new URL('http://localhost:3000/#/single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);
        const foundName = wrapper.find('.panel-name').at(0).text();
        const panelAmount = wrapper.find('.individual-rows.single-row').length;
        const fullPanelNameAmount = wrapper.find('.individual-rows.full-version').length;

        expect(foundName).toContain('Welcome to MAGFest!');
        expect(panelAmount).toBe(3);
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

describe('Test timed events', () => {

    beforeEach(() => {
        delete window.location;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Correct time is displayed', () => {
        delete window.location;
        mockSchedule[3].start_unix = 1640361627;
        mockSchedule[3].end_unix = 1640363427;

        window.location = new URL('http://localhost:3000/#/single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);
        const foundTime = wrapper.find('.times-sing.start-time-sing').at(0).text();

        expect(foundTime ).toBe('Fri, 11:00');
    });

    test('Goes to single panel display with 1 current event', () => {
        mockSchedule[3].start_unix = dayjs().add(1, 'hour').unix();
        mockSchedule[3].end_unix = dayjs().add(2, 'hour').unix();
        window.location = new URL('http://localhost:3000/#/filtered&single?place=Panels+1');

        const wrapper = mount(<Router><Main /></Router>);

        const singlePanelNameAmount = wrapper.find('.individual-rows.single-row').length;

        expect(singlePanelNameAmount).toBe(1);
    });

})