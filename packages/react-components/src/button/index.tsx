import 'react-dom';
import * as React from 'react';

const Button: React.FC<React.DOMAttributes<any>> = (props) => {

    return (<div onClick={props.onClick}>
        <span>{props.children}</span>
    </div>)
} 



export default Button