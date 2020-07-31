import React from 'react';
import styled, { StyledProps } from 'styled-components';
import { variant } from 'styled-system';
import { Icon } from '../';
import * as State from './state';
import css from '@styled-system/css';

const classic = {
  fontFamily: 'body',
  position: 'relative',
  color: 'text.secondary',
  bg: 'bg.secondary',
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'space-between',
  '[role="option"]': {
    p: 2,
  },
  '[role="listbox"]': {
    width: '100%',

    '.expanded': {
      display: 'none',
      position: 'absolute',
      width: '100%',
      '[role="option"]:hover': {
        bg: 'red',
      },
    },
  },

  '&.expanded': {
    '[role="listbox"]': {
      '.expanded': {
        display: 'block',
      },
      '.non_expanded': {
        visibility: 'invisible',
      },
    },
  },
};

const variants = {
  classic,
};

interface OptionProps {
  option: Option;
  className?: string;
}

const OptionElement: React.FC<OptionProps> = ({ className, option }) => {
  const { value, label, selected } = option;

  return (
    <div
      className={className}
      role="option"
      data-value={value}
      aria-selected={selected}
    >
      {label ? label : value}
    </div>
  );
};

interface SelectOptionProps {
  selectoptions: Option[];
  placeholder: string | undefined;
}

const SelectBlock: React.FC<SelectOptionProps> = ({
  selectoptions,
  placeholder,
}) => {
  const [selected] = selectoptions;
  const firstOption = selected.selected ? (
    <OptionElement {...{ option: selected }} />
  ) : (
    <OptionElement {...{ option: { value: '', label: placeholder } }} />
  );

  return (
    <div role="listbox">
      <div className="expanded">
        {selectoptions.map((option: Option, i: number) => (
          <OptionElement key={i} {...{ option }} />
        ))}
      </div>
      <div className="non_expanded">{firstOption}</div>
    </div>
  );
};

interface Option {
  value: string;
  label: string | undefined;
  selected?: boolean;
}

interface BlockProps {
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  className: string;
  variant?: string;
}

const IconBlock = styled.div(css({ p: 2, pb: 0 }));

const ClickBlockWrapper: React.FC<{ className: string }> = ({
  className,
  children,
}) => {
  const blockRef = React.useRef<HTMLDivElement>(null);

  const [state, dispatch] = State.useSelectContext();

  const onCollapse = () => dispatch({ type: State.ActionType.COLLAPSE });

  const clickListener = React.useCallback(
    (e: MouseEvent) => {
      if (!(blockRef.current! as any).contains(e.target)) {
        onCollapse();
      }
    },
    [blockRef.current]
  );

  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  return (
    <div
      ref={blockRef}
      className={`${state.expanded ? 'expanded' : ''} ${className}`}
      onClick={() => {
        dispatch({ type: State.ActionType.EXPAND });
      }}
    >
      {children}
    </div>
  );
};

const Block: React.FC<StyledProps<BlockProps>> = ({
  className,
  defaultValue,
  options,
  placeholder,
}) => {
  const [state, dispatch] = React.useReducer(
    State.selectStateReducer,
    State.defaultSelectContext
  );

  const defaultOption = defaultValue
    ? options.find(o => o.value === defaultValue)
    : null;

  const selectoptions = defaultOption
    ? [
        { ...defaultOption, selected: true },
        ...options.filter(o => o.value !== defaultOption.value),
      ]
    : options;

  return (
    <State.SelectContext.Provider value={[state, dispatch]}>
      <ClickBlockWrapper className={className}>
        <SelectBlock {...{ selectoptions, placeholder }} />
        {!state.expanded && (
          <IconBlock>
            <Icon.Arrowdown />
          </IconBlock>
        )}
      </ClickBlockWrapper>
    </State.SelectContext.Provider>
  );
};

export const Select = styled(Block)(
  variant({
    scale: 'forms.select',
    variants,
  })
);

Select.defaultProps = {
  variant: 'classic',
};
