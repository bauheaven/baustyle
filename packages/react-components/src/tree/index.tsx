/** @jsx jsx */
import * as React from 'react';
import styled from '@emotion/styled'
import {css, jsx} from '@emotion/core'
import { color, space, variant } from 'styled-system'


interface NodeMetaProps {
    label: string
}

interface NodeProps extends NodeMetaProps {
    visible?: boolean
    childs?: NodeProps[]
    onNodeClick?: (event: React.MouseEvent, props: NodeProps) => void
}

interface TreeProps {
    tree:  NodeProps[]
}

interface StyledTreeProps extends TreeProps {
    className?: string
}

interface TreeNodeProps extends NodeProps {
    level: number    
    node: string

}

interface StyledTreeNodeProps extends TreeNodeProps {
    className?: string
}

interface StyledTreeNodeLabelProps extends TreeNodeProps {
    onToggle: () => void
    className?: string
}



const treeNode = variant({
    prop: 'node',
    key: 'treeNode'
})

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




export const TreeNodeLabel: React.FC<StyledTreeNodeLabelProps> = ({className, ...props}) => {
    const {onToggle, onNodeClick, label} = props
    
    const onClick = (e: React.MouseEvent) => { 
        onToggle(); 
        onNodeClick ? onNodeClick(e, props) : undefined 
    }

    return <div className={className} onClick={onClick}>{label}</div>
}
    


const StyledTreeNodeLabel = styled(TreeNodeLabel)(
    {
      appearance: `none`
    },
    color,
    space
  )


export const TreeNode: React.FC<StyledTreeNodeProps> = (props: StyledTreeNodeProps) => {

    const [state, dispatch] = React.useReducer<typeof reducer>(reducer, props)
    return <div className={props.className} >
        
        <StyledTreeNodeLabel {...{...state, onToggle: () => dispatch(toggleChild()) }}/>
            
        {state.visible && state.childs 
            ? state.childs.map((n, i) => {
                const node = n.childs ? "node" : n.onNodeClick ? "active-leaf" : "leaf"
                return <StyledTreeNode node={node} key={i} {...n} level={props.level + 1} ml={3} />
            })
            : null 
        }
    </div>
}

const StyledTreeNode = styled(TreeNode)(
    color,
    space,
    treeNode
)


const Tree: React.FC<StyledTreeProps> = ({tree, className}: StyledTreeProps) => {

    return <div css={theme => css`
        background-color: ${theme.background};
        color: ${theme.text};
      `} className={className}>
          {tree.map((n, i) => <StyledTreeNode node={n.childs ? "node" : "leaf"} key={i} {...n} level={1}/>)}
    </div>
}

const StyledTree = styled(Tree)(color, space)

export default StyledTree
