import React, { useState } from 'react'
import styled from 'styled-components'
import { shakeAnimation } from './themes'
import css from '@styled-system/css'




const EeseCircle = styled.div`
position: relative;
transition: left 0.125s cubic-bezier(0.2, 0, 0.03, 1);

width: 30px;
height: 30px;
border-radius: 30px;
left: 0px;
&.ease {
    left: 100px;    
}
${css({
    bg: 'ui.primary'
})}
`


export const InputTransitionEasing = () => {

    
    const [isEase, togglerEase] = useState(false)
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            togglerEase(!isEase)
        }, 1000)

        return () => clearTimeout(timeout)

    }, [isEase])

    return <EeseCircle className={isEase? 'ease': ''} />


}


const Shake = styled.div`
    ${({theme}) => theme.animations.shake}
    animation-delay: 1s;
    animation-iteration-count: infinite;
        ${css({
        color: 'ui.error',
        fontFamily: 'body'
    })}
`

export const ShakeAnimation = ({children}) => {


    return <Shake>{children}</Shake>

}
