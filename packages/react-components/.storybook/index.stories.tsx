import * as React from 'react';
import Tree from '../src/tree';
import { ThemeProvider } from 'emotion-theming'

export default { title: 'Tree' };
const theme = {
  background: "#fff",
  text: "#000",
  space: [0, 2, 4, 8, 16, 32],
  colors: {
    purple: 'purple'
  },
  treeNode: {
    "node": {
      cursor: 'pointer'
    },
    "active-leaf": {
      cursor: 'pointer'
    },
    "leaf": {
      cursor: 'default'
    }
  }
}

const tree = [
  {label:`tree node 1`,  onNodeClick: (e: any, props: any) => console.log('on node click', e, e.target, props), childs:
    [{label:`tree_node child 1 1`, onNodeClick: (e: any, props: any) => console.log('on leaf click', e, e.target, props)}]},
  {label:`tree node 2`, childs:
    [{label:`tree_node child 2 1`}, 
     {label:`tree_node child 2 2`, childs:
      [{label:`tree_node child 2 2 1`}]}]}
]

export const SimpleTree:  React.FC = () => 
  (<ThemeProvider theme={theme}><Tree  {...{tree}} /></ThemeProvider>)


  export const SimpleTreeDark:  React.FC = () => 
  (<ThemeProvider theme={{...theme, background:"#000", text:"#fff"}}><Tree  {...{tree}} /></ThemeProvider>)