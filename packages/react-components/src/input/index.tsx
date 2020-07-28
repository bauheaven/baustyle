import React from 'react';
import styled, { StyledProps } from 'styled-components';
import css from '@styled-system/css';
import variants from './variants';

interface ErrorProps {
  check: RegExp;
  children: React.ReactElement;
  value?: string;
}

type StyledErrorProps = StyledProps<ErrorProps>;

export const Error: React.FC<StyledErrorProps> = styled(
  ({ className, check, children, value }) => {
    return typeof value !== 'string' ? null : new RegExp(check).test(
        value!
      ) ? null : (
      <div className={className}>{children}</div>
    );
  }
)`
  position: absolute;
  bottom: -1.25rem;
  font-styled: italic;

  ${({ theme }) => theme.animations.shake}

  ${css({
    fontFamily: 'body',
    fontSize: 0,
    color: 'text.error',
  })}
`;
Error.displayName = 'Input.Error';

const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;

  transition: ${({ theme }) => theme.transitions.input};
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
};

interface InputProps
  extends StyledProps<React.InputHTMLAttributes<HTMLElement>> {
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

  const [value, setValue] = React.useState('');

  const [focused, setFocused] = React.useState(false);

  const reactChildren = React.Children.toArray(children).filter(
    ch => typeof ch === 'object'
  );

  const [error, setError] = React.useState(
    reactChildren.find(
      (ch: any) => (ch as JSX.Element).type.displayName === Error.displayName
    ) as React.ReactElement
  );

  const props = {
    className: value && value.length > 0 ? `non-empty` : ``,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange && onChange(e);
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      setError(React.cloneElement(error, { value: null }));
      setFocused(true);
      onFocus && onFocus(e);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      error && setError(React.cloneElement(error, { value: e.target.value }));
      setFocused(false);
      onBlur && onBlur(e);
    },
    ...rest,
  };

  return (
    <Group className={`${className} ${focused ? 'focus' : ''}`} role="group">
      {leftIcon ? <LeftIcon className="left_icon">{leftIcon}</LeftIcon> : null}
      <input ref={inputRef} {...props} />
      <Label className="label">{label}</Label>
      {rightIcon ? <RightIcon>{rightIcon}</RightIcon> : null}
      {error}
      {variant === 'material' ? <MaterialBorder className="border" /> : null}
    </Group>
  );
};

InputGroup.Error = Error;

export const Input = styled(InputGroup)<InputProps>(variants);

Input.defaultProps = {
  variant: 'classic',
};
