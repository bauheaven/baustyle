import React from 'react';
import styled, { StyledProps } from 'styled-components';
import css from '@styled-system/css';
import variants from './variants';

interface ErrorProps {
  check: RegExp;
  children: React.ReactElement;
  active?: boolean;
}

type StyledErrorProps = StyledProps<ErrorProps>;

export const Error: React.FC<StyledErrorProps> = styled(
  ({ className, children, active }) => {
    const v = typeof active === 'boolean' ? active : false;

    console.log('v', v, typeof active);
    return v ? <div className={className}>{children}</div> : null;
  }
)`
  position: absolute;
  bottom: -1.25rem;
  font-styled: italic;

  ${({ theme }) => theme.animations && theme.animations.shake}

  ${css({
    fontFamily: 'body',
    fontSize: 0,
    color: 'text.error',
  })}
`;
Error.displayName = 'Input.Error';

const checkError = (value: string, check: RegExp) => {
  return typeof value !== 'string' ? false : !new RegExp(check).test(value);
};

export const Hint: React.FC<StyledProps<{}>> = styled(
  ({ className, children }) => {
    return <div className={className}>{children}</div>;
  }
)`
  position: absolute;
  bottom: -1.25rem;
  font-style: italic;

  ${css({
    fontFamily: 'body',
    fontSize: 0,
    color: 'text.secondary',
  })}
`;

Hint.displayName = 'Input.Hint';

const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;

  transition: ${({ theme }) => theme.transitions && theme.transitions.input};
  ${css({
    fontFamily: 'body',
    color: 'text.secondary',
    lineHeight: 'larger',
  })}
`;

const MaterialBorder = styled.div`
  // Border Effect
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  ::before {
    position: absolute;
    height: 2px;
    display: block;
    content: ' ';
    width: 100%;
    background: ${({ theme }) => theme.colors.ui.secondary};
    transition: ${({ theme }) => theme.transitions.input};
  }
  ::after {
    position: absolute;
    display: block;
    content: ' ';
    background: ${({ theme }) => theme.colors.ui.primary};
    transition: ${({ theme }) => theme.transitions.input};

    width: 0;
  }
`;

const Group = styled.div`
  position: relative;
  input,
  textarea {
    width: 100%;
  }
`;

type Input<P> = React.FC<P> & {
  Error: React.FC<StyledErrorProps>;
  Hint: React.FC<StyledProps<{}>>;
};

interface InputProps
  extends StyledProps<React.InputHTMLAttributes<HTMLElement>> {
  id?: string;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: string;
}

export const LeftIcon = styled.div(
  css({
    pl: 2,
    color: 'ui.primary',
  })
);

export const RightIcon = styled.div(
  css({
    pr: 2,
    color: 'ui.primary',
  })
);

export const InputGroup: Input<InputProps> = ({
  id,
  label,
  leftIcon,
  rightIcon,
  className,
  children,
  onChange,
  onBlur,
  onFocus,
  variant,
  ...rest
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [inputId] = React.useState<string>(
    id
      ? id
      : Math.random()
          .toString(36)
          .substring(7)
  );

  const [value, setValue] = React.useState('');

  const [focused, setFocused] = React.useState(false);

  const reactChildren = React.Children.toArray(children).filter(
    ch => typeof ch === 'object'
  );

  const [errorFn, setErrorFn] = React.useState<React.ReactElement>(
    reactChildren.find((ch: any) => {
      return (
        ch.type !== undefined &&
        (ch as JSX.Element).type.displayName === Error.displayName
      );
    }) as React.ReactElement
  );

  const [hintFn] = React.useState<React.ReactElement>(
    reactChildren.find((ch: any) => {
      return (
        ch.type !== undefined &&
        (ch as JSX.Element).type.displayName === Hint.displayName
      );
    }) as React.ReactElement
  );

  const [isValid, setIsValid] = React.useState<boolean>(true);

  const updateValidation = (valid: boolean) => {
    if (!errorFn) return;
    setIsValid(valid);
    setErrorFn(React.cloneElement(errorFn, { active: !valid }));
  };

  const props = {
    className: value && value.length > 0 ? `non-empty` : ``,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange && onChange(e);
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      errorFn && updateValidation(true);
      setFocused(true);
      onFocus && onFocus(e);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      errorFn &&
        updateValidation(!checkError(e.target.value, errorFn.props.check));
      setFocused(false);
      onBlur && onBlur(e);
    },
    ...rest,
  };

  return (
    <Group className={`${className} ${focused ? 'focus' : ''}`} role="group">
      {leftIcon ? <LeftIcon className="left_icon">{leftIcon}</LeftIcon> : null}
      <input
        id={inputId}
        ref={inputRef}
        aria-invalid={isValid ? 'false' : 'true'}
        {...props}
      />
      <Label htmlFor={inputId} className="label">
        {label}
      </Label>
      {rightIcon ? <RightIcon>{rightIcon}</RightIcon> : null}
      {errorFn}
      {isValid ? hintFn : null}
      {variant === 'material' ? <MaterialBorder className="border" /> : null}
    </Group>
  );
};

InputGroup.Error = Error;
InputGroup.Hint = Hint;

export const Input = styled(InputGroup)<InputProps>(variants);

Input.defaultProps = {
  variant: 'classic',
};
