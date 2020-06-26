import * as React from 'react';


const Input = ({name, ...props} : any) => <input name={name} {...props}/>

export const InputGroup = ({names, ...props}: any) => <>{names.map((n: string, i:number) => <input key={i} name={n}  {...props} />)}</>

export default Input