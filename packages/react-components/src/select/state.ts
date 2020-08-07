import React from 'react';

interface SelectState {
  expanded: boolean;
  focused: boolean;
  selectId?: string;
  value?: string;
}

export enum ActionType {
  EXPAND = 'EXPAND',
  COLLAPSE = 'COLLAPSE',
  FOCUS = 'FOCUS',
  SELECT = 'SELECT',
}

type Action =
  | { type: ActionType.EXPAND }
  | { type: ActionType.COLLAPSE }
  | { type: ActionType.SELECT; value: string }
  | { type: ActionType.FOCUS };

export const defaultSelectContext = {
  focused: false,
  expanded: false,
};

export const SelectContext = React.createContext<
  [SelectState, React.Dispatch<Action>]
>([defaultSelectContext, () => null]);

export const useSelectContext = () => React.useContext(SelectContext);

export const selectStateReducer = (
  state: SelectState,
  action: Action
): SelectState => {
  switch (action.type) {
    case ActionType.FOCUS:
      return { ...state, focused: true };
    case ActionType.EXPAND:
      return { ...state, expanded: true, focused: false };
    case ActionType.COLLAPSE:
      return { ...state, expanded: false, focused: false };
    case ActionType.SELECT:
      return { ...state, value: action.value, expanded: false };
  }

  return state;
};
