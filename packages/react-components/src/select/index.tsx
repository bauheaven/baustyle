import React from 'react';
import styled, { StyledProps } from 'styled-components';
import { variant } from 'styled-system';
import { Icon } from '../';
import * as State from './state';
import css from '@styled-system/css';
import { Theme } from '../../types/theme';

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

    '.expanded_listbox': {
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
      '.expanded_listbox': {
        left: '-20px',
        width: 'calc(100% + 20px)',
        display: 'block',
        zIndex: 1,
        bg: 'blue',

        '[role="option"]': {
          pl: (theme: Theme) => `${(theme.space as number[])[2] + 20}px`,
        },
      },
      '.non_expanded_listbox': {
        visibility: 'hidden',
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
  const [, dispatch] = State.useSelectContext();

  const { value, label, selected } = option;

  return (
    <div
      className={className}
      role="option"
      data-value={value}
      aria-selected={selected}
      onClick={_ => {
        dispatch({ type: State.ActionType.SELECT, value });
      }}
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
  const [{ selectId }, dispatch] = State.useSelectContext();

  const [selected] = selectoptions;
  const firstOption = selected.selected ? (
    <OptionElement {...{ option: selected }} />
  ) : (
    <OptionElement {...{ option: { value: '', label: placeholder } }} />
  );

  return (
    <>
      <div id={selectId} role="listbox" aria-label="select">
        <div className="expanded_listbox">
          {selectoptions.map((option: Option, i: number) => (
            <OptionElement key={i} {...{ option }} />
          ))}
        </div>
        <div
          className="non_expanded_listbox"
          onClick={_ => {
            dispatch({ type: State.ActionType.EXPAND });
          }}
        >
          {firstOption}
        </div>
      </div>
    </>
  );
};

interface Option {
  value: string;
  label: string | undefined;
  selected?: boolean;
}

interface BlockProps {
  id?: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  className: string;
  variant?: string;
}

const IconBlock = styled.div(css({ p: 2, height: 2, svg: { mt: '-3px' } }));

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

  console.log('ClickBlockWrapper state', state);

  return (
    <div
      ref={blockRef}
      className={`${state.expanded ? 'expanded' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const Block: React.FC<StyledProps<BlockProps>> = ({
  id,
  className,
  defaultValue,
  options,
  placeholder,
}) => {
  const [state, dispatch] = React.useReducer(
    State.selectStateReducer,
    State.defaultSelectContext,
    state => {
      const selected = defaultValue;
      const selectId = id
        ? id
        : `select_${Math.random()
            .toString(36)
            .substring(7)}`;
      return { ...state, selected, selectId };
    }
  );

  const selectedOption = state.selected
    ? options.find(o => o.value === state.selected)
    : null;

  const selectoptions = selectedOption
    ? [
        { ...selectedOption, selected: true },
        ...options.filter(o => o.value !== selectedOption.value),
      ]
    : options;

  return (
    <State.SelectContext.Provider value={[state, dispatch]}>
      <ClickBlockWrapper className={className}>
        <SelectBlock {...{ selectoptions, placeholder }} />

        <IconBlock
          onClick={_ => {
            dispatch({ type: State.ActionType.EXPAND });
          }}
        >
          <Icon.Arrowdown />
        </IconBlock>
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
