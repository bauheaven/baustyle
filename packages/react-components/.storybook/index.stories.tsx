import * as React from 'react';
import Tree from '../src/tree/old.index';
import Select from '../src/select'
import {ChevronDown} from "@styled-icons/boxicons-solid"
import {Check} from "@styled-icons/boxicons-regular"
import { ThemeProvider, keyframes, css } from 'styled-components';

const fadeIn  = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0.9)
  }
  to {
    opacity: 1;
    transform: scale(2.05)
  }
`

const animatedOptions = css`
        animation: ${fadeIn} 1s ease;        
`

export default { title: 'Tree' };
const theme = {
  background: "#fff",
  text: "#000",
  space: [0, 2, 4, 8, 16, 32],
  colors: {
    
    primary: 'red',
    text: "#222",
    background: '#ccc',
    hover: '#b2cbf97a',
    hover2: '#7ae873',
    secondary: 'green',
    pur: 'purple'
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
  },
  select: {
    primary: {
      bg: 'primary',
      '.options': {
        '& .option': {
            '&:hover': {
                bg: 'hover2'
            },
          },
      },
    },
    secondary: {
      color: 'pur',
      bg: 'secondary',
      '.options': {
        boxShadow: "2px 2px 2px 2px #ccc"
      }
    },
    main: {
      bg: 'pur',
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


  export const ThemelessTree:  React.FC = () => 
  (<Tree  {...{tree}} />)


const options = [{value: 'de', text: 'Deutsch'}, {value: 'en', text: 'English'}, {value: 'ru', text: 'Русский'}, {value: 've', text: 'Some Very Long named Language'}]


export const SelectDemo: React.FC = () =>{
  const [defaultValue, setDefaultValue] = React.useState<string|undefined>(undefined)

  return (<ThemeProvider theme={theme}><Select 
    
    onChange={(e: React.SyntheticEvent) => {
      
      setDefaultValue((e.target as HTMLOptionElement).value)
      
      }} 
    defaultValue={defaultValue}
    ActiveIcon={Check} 
    SelectIcon={ChevronDown}>
      {options.map((o, i) => <option value={o.value}>{o.text}</option>)}
    </Select>
    </ThemeProvider>)
  
}
