import * as React from 'react';
import styled, {keyframes} from 'styled-components'
import { space, SpaceProps, variant, VariantArgs, layout, color } from 'styled-system'


const fadeIn  = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0.9)
  }
  to {
    opacity: 1;
    transform: scale(1.05)
  }
`

const SelectOptionsWrapper = styled.div`
  position: absolute;
  transition: background .3s ease;
  background: #ccc;
  border-radius: 3px;
  animation: ${fadeIn} 0.2s ease;
`


const SelectOptions: React.FC<{onClose: () => void}> =  ({children, onClose}) => {

  const ref = React.useRef(null)

  const clickListener = React.useCallback((e: MouseEvent) => {
    if(!(ref.current! as any).contains(e.target)){
      onClose()
    }
  }, [ref.current])

  React.useEffect(() => {
    document.addEventListener('click', clickListener)

    return () => {
      document.removeEventListener('click', clickListener)
    }

  }, [])

  return <SelectOptionsWrapper  ref={ref}>{children}</SelectOptionsWrapper>

} 



const DefaultOption = styled.div`
position: absolute;
 display: flex;
 svg {
  cursor: pointer;
   &:hover {
     color: #ccc;
   }
 }
 `


 const SelectWrapper =  styled.div`
  position: relative;
  display: inline-flex;
  .option {
    display: flex; 
    cursor: pointer;
    &:hover {
        background: #ddd
    }
  }
  svg {
    width: 15px;
  }
  ${variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'primary',
       
      },
      secondary: {
        color: 'white',
        bg: 'secondary',
      },
    }
  })}
`
interface Base {
    className?: string
    variant?: string
}
interface SelectProps extends Base {
    onChange?: (e: React.SyntheticEvent) => void
    defaultValue?: string|number
    defaultText?: string
    SelectIcon: React.FC<{onClick?: (e: React.SyntheticEvent) => void }>
    ActiveIcon: React.FC
}

const Select: React.FC<SelectProps>  = ({children, onChange, defaultValue, defaultText, SelectIcon, ActiveIcon }) => {

    const [modal, setModal] = React.useState(false)
  
    const toggleModal = () => setModal(!modal)
    
    if (children === null || children === undefined) return null

    const childrenArray = React.Children.toArray(children) as React.ReactElement[]

    const activeOption =  defaultValue
    ? childrenArray.filter(({props}) => props.value === defaultValue)
    : defaultText
    
    const selectOptions = [
        defaultValue
            ? <div  key="default"  {...{className: 'active option', onClick: toggleModal}}>{activeOption}</div>
            : null,
        ...childrenArray
          .filter(({props}) => props.value !== defaultValue)
          .map(node => React.cloneElement(node, {className: 'option', onClick: (e: React.SyntheticEvent) => {
            onChange?.(e)
            toggleModal()
          }}))]

    const options = modal
    ? <SelectOptions onClose={toggleModal}>{selectOptions}</SelectOptions>
    : <DefaultOption>{activeOption}</DefaultOption>
  
    return <SelectWrapper>{options}</SelectWrapper>
    
}



const SelectPure: React.FC<SelectProps> = ({children, className, onChange, defaultValue, defaultText, SelectIcon, ActiveIcon}) => {

    const [modal, setModal] = React.useState(false)
  
    const toggleModal = () => setModal(!modal)
    
    if (children === null || children === undefined) return null

    const childrenArray = React.Children.toArray(children) as React.ReactElement[]

    const activeOption =  defaultValue
    ? childrenArray.filter(({props}) => props.value === defaultValue)
    : defaultText
    
    const selectOptions = [
        defaultValue
            ? <div  key="default"  {...{className: 'active option', onClick: toggleModal}}>{activeOption}<ActiveIcon /></div>
            : null,
        ...childrenArray
          .filter(({props}) => props.value !== defaultValue)
          .map(node => React.cloneElement(node, {className: 'option', onClick: (e: React.SyntheticEvent) => {
            onChange?.(e)
            toggleModal()
          }}))]

    const options = modal
    ? <SelectOptions onClose={toggleModal}>{selectOptions}</SelectOptions>
    : <DefaultOption>{activeOption}<SelectIcon onClick={toggleModal} /></DefaultOption>
  
    return <SelectWrapper className={className}>{options}</SelectWrapper>
    
}

const Box = styled(SelectPure)`
margin: 10px;
padding: 40px;
${variant({
    scale: 'select',
    variants: {
        k: {}
    }
})}
${color}
`
Box.defaultProps = {
    variant: 'primary',
}

export default Box
