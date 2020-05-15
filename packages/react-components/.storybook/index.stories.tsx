import * as React from 'react';
import Tree from '../src/tree/Tree';

export default { title: 'Tree' };


const tree = [
  {label:`tree node 1`, childs:
    [{label:`tree_node child 1 1`}]},
  {label:`tree node 2`, childs:
    [{label:`tree_node child 2 1`}, 
     {label:`tree_node child 2 2`, childs:
      [{label:`tree_node child 2 2 1`}]}]}
]
export const SimpleTree:  React.FC = () => <Tree {...{tree}} />

