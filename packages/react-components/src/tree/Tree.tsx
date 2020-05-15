import * as React from 'react';
import styled from '@emotion/styled'
import { color, space } from 'styled-system'



interface TreeNodeProps {
    label: string
    visible?: boolean
    childs?: TreeNodeProps[]
    onClick?: () => void
    
}

interface StyledTreeNodeProps extends TreeNodeProps {
    className?: string
}

enum TreeNodeActionTypes {
    TOGGLE_CHILD = 'TOGGLE_CHILD'
}

interface Action {
    type: TreeNodeActionTypes
}

const toggleChild = (): Action => ({type: TreeNodeActionTypes.TOGGLE_CHILD})

const reducer = (state: TreeNodeProps, action: Action): TreeNodeProps => {
    switch(action.type){
        case TreeNodeActionTypes.TOGGLE_CHILD:
            return {...state, visible: !state.visible}
        default:
            return state
    }
}




export const TreeNodeLabel: React.FC<StyledTreeNodeProps> = ({label, onClick, className}) => onClick! && <span className={className} onClick={onClick}>{label}</span>
const StyledTreeNodeLabel = styled(TreeNodeLabel)(
    {
      appearance: `none`,
      border: 0,
      outline: 0,
    },
    color,
    space
  )



export const TreeNode: React.FC<TreeNodeProps> = (props: TreeNodeProps) => {

    const [state, dispatch] = React.useReducer<typeof reducer>(reducer, props)
    return <span className="node">
        <StyledTreeNodeLabel {...{...state, onClick: () => dispatch(toggleChild())}}/>
        {state.visible && state.childs 
            ? state.childs.map((n, i) => <TreeNode key={i} {...n} />)
            : null
        }
    </span>
}

interface TreeProps {
    tree:  TreeNodeProps[]
}
const Tree: React.FC<TreeProps> = ({tree}: TreeProps) => {

    return <>{tree.map((n, i) => <TreeNode key={i} {...n}/>)}</>
}

export default Tree
