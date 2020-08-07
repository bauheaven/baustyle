import React from 'react';
import styled, { StyledProps } from 'styled-components';
import { Icon, SVGIcon } from '../';
import variants from './variants';
import * as State from './state';

interface OptionProps {
  option: Option;
  LeftIcon?: SVGIcon;
  className?: string;
}

const OptionElement: React.FC<OptionProps> = ({
  className,
  option,
  LeftIcon,
}) => {
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
      {LeftIcon ? (
        <div className="left_icon">
          <LeftIcon />
        </div>
      ) : null}
      {label ? label : value}
    </div>
  );
};

interface SelectOptionProps {
  selectoptions: Option[];
  label?: string;
}

const SelectBlock: React.FC<SelectOptionProps> = ({ selectoptions, label }) => {
  const [{ selectId }, dispatch] = State.useSelectContext();

  const [selected] = selectoptions;
  const firstOption = selected.selected ? (
    <OptionElement {...{ option: selected }} />
  ) : (
    <OptionElement {...{ option: { value: '', label } }} />
  );

  return (
    <>
      <div id={selectId} role="listbox" aria-label="select">
        <div className="expanded_listbox">
          {selectoptions.map((option: Option, i: number) => (
            <OptionElement
              key={i}
              {...{
                LeftIcon: option.selected ? Icon.Check : undefined,
                option,
              }}
            />
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

const ClickBlockWrapper: React.FC<{ className: string }> = ({
  className,
  children,
}) => {
  const blockRef = React.useRef<HTMLDivElement>(null);

  const [{ focused, expanded }, dispatch] = State.useSelectContext();

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
      tabIndex={0}
      ref={blockRef}
      onFocus={_ => dispatch({ type: State.ActionType.FOCUS })}
      onBlur={_ => dispatch({ type: State.ActionType.COLLAPSE })}
      className={`${expanded ? 'expanded ' : ''}${
        focused ? 'focused ' : ''
      } ${className}`}
    >
      {children}
    </div>
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
  label?: string;
  className: string;
  variant?: string;
}

const Block: React.FC<StyledProps<BlockProps>> = ({
  id,
  className,
  defaultValue,
  options,
  label,
  ...rest
}) => {
  const [state, dispatch] = React.useReducer(
    State.selectStateReducer,
    State.defaultSelectContext,
    state => {
      const value = defaultValue;
      const selectId = id
        ? id
        : `select_${Math.random()
            .toString(36)
            .substring(7)}`;
      return { ...state, value, selectId };
    }
  );

  const selectedOption = state.value
    ? options.find(o => o.value === state.value)
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
        <SelectBlock {...{ selectoptions, label, ...rest }} />

        <div
          className="icon_block"
          onClick={_ => {
            dispatch({ type: State.ActionType.EXPAND });
          }}
        >
          <Icon.Arrowdown />
        </div>
      </ClickBlockWrapper>
    </State.SelectContext.Provider>
  );
};

export const Select = styled(Block)(variants);

Select.defaultProps = {
  variant: 'classic',
};
