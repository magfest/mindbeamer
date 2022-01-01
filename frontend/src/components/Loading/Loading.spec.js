import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';



describe('Check if Loading Renders', () => {
    test('Loading is defined', () => {
        const wrapper = shallow(<Loading />);
        expect(wrapper).toBeDefined();
    });

    test('Check for Loading text', () => {
        const wrapper = shallow(<Loading />);
        expect(wrapper.find('.loading-text').at(0).text()).toContain('Loading...');
    });
});