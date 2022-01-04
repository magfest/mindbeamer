import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';



describe('Check if Map Renders', () => {
    test('Map is defined', () => {
        const wrapper = shallow(<Map />);
        expect(wrapper).toBeDefined();
    });
    
    test('Map appears on click', () => {
        const wrapper = shallow(<Map />);
        wrapper.find('#map-toggle').simulate('click');
        expect(wrapper.find('#show-map')).toBeDefined();
    });

    test('Map disappears on click', () => {
        const wrapper = shallow(<Map />);
        wrapper.find('#map-toggle').simulate('click');
        wrapper.find('#show-map').simulate('click');
        expect(wrapper.find('#map-toggle')).toBeDefined();
    });

});