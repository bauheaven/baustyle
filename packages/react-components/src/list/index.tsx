import * as React from 'react'


interface ListItem {
    name:  string
}

const List: React.FC = ({children}) => {

    const childrenArray = React.Children.toArray(children) as React.ReactElement[]
    return <ul>{childrenArray.map(((child, i) => React.cloneElement(child, {key: i})))}</ul>
}

export default List