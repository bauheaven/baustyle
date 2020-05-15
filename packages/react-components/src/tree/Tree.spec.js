import * as React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tree, {TreeNodeLabel} from './Tree';
import {  mount } from 'enzyme';


configure({ adapter: new Adapter() });



describe('Tree Basic', () => {

       test('chile node toggles up and down on click', () => {
        const tree = [
            {label:`tree node 1`, childs:
              [{label:`tree_node child 1 1`}]},
          ]
        
        const wrapper = mount(<Tree {...{tree}} />);

        expect(wrapper.find(TreeNodeLabel).length).toBe(1)

        wrapper.find(TreeNodeLabel).first().simulate('click')
        
        expect(wrapper.find(TreeNodeLabel).length).toBe(2)

        wrapper.find(TreeNodeLabel).first().simulate('click')

        expect(wrapper.find(TreeNodeLabel).length).toBe(1)

       }) 
})