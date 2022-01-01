import React from 'react';
import { shallow } from 'enzyme';
import Clock from './Clock';


describe('Clock Renders and Functions', () => {

    afterAll(() => {
        jest.useRealTimers();
    });

    test('Clock is defined', () => {
        const wrapper = shallow(<Clock />);
        expect(wrapper).toBeDefined();
    });

    test('Checks date', () => {
        const wrapper = shallow(<Clock />);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true });
        expect(wrapper.find('.date-area').at(0).text()).toContain(formattedDate);
    });

    test('Check if tick called', () => {
        jest.useFakeTimers();
        const wrapper = shallow(<Clock />);
        const spy = jest.spyOn(wrapper.instance(), 'tick');
        jest.advanceTimersByTime(3000);
        expect(spy).toHaveBeenCalledTimes(3);
    });

})