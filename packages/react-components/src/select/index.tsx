import * as React from 'react';
import styled, {keyframes, css} from 'styled-components'
import { space, SpaceProps, variant, VariantArgs, layout, color, ColorProps } from 'styled-system'



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

const animatedOptions = css`
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

  return <div className="options" ref={ref}>{children}</div>

} 


 const SelectWrapper =  styled.div`
    .options {
        ${animatedOptions}
    }
    
  ${({theme}) => {
    console.log('theme', theme)
    return {
      position: 'relative',
      display: 'inline-flex',  
      background: theme.colors.bg,
      option: {
          padding:theme.space[0]
      },
      '.default': {
          position: 'absolute',
          display: 'flex',
          svg: {
              cursor: 'pointer',
              '&:hover': {
                  color: 'secondary'
              }
          },
          padding: theme.space[1]
  
      },
      '.options': {
          position: 'absolute',
          'border-radius': theme.space[1],
          '& .option': {
              color: theme.colors.text,
              display: 'flex',
              cursor: 'pointer',
              transition: 'background .3s ease',
              '&:hover': {
                  background: theme.colors.hover
              },
              padding: theme.space[1]
          }
      },
      
      'svg': {
          width: theme.space[4]
      },
      
  }
  } }
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

const Select: React.FC<SelectProps>  = ({className, children, onChange, defaultValue, defaultText, SelectIcon, ActiveIcon }) => {

    const [modal, setModal] = React.useState(false)
  
    const toggleModal = () => setModal(!modal)
    
    if (children === null || children === undefined) return null

    const childrenArray = React.Children.toArray(children) as React.ReactElement[]

    const activeOption =  defaultValue
    ? childrenArray.filter(({props}) => props.value === defaultValue)
    : defaultText
    
    const selectOptions = [
        defaultValue
            ? <div  key="default"  {...{className: 'option', onClick: toggleModal}}>{activeOption}<ActiveIcon /></div>
            : null,
        ...childrenArray
          .filter(({props}) => props.value !== defaultValue)
          .map(node => React.cloneElement(node, {className: 'option', onClick: (e: React.SyntheticEvent) => {
            onChange?.(e)
            toggleModal()
          }}))]

    const options = modal
    ? <SelectOptions onClose={toggleModal}>{selectOptions}</SelectOptions>
    : <div className="default">{activeOption}<SelectIcon onClick={toggleModal} /></div>
  
    return <SelectWrapper  className={className}>{options}</SelectWrapper>
    
}




const StyledSelect = styled(Select)`
${variant({
    scale: 'select',
    variants: {
        k: {}
    }
})}
${color}
`
StyledSelect.defaultProps = {
    variant: 'primary',
}

export default StyledSelect
