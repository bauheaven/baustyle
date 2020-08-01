import React from 'react';

interface SelectState {
  expanded: boolean;
  selectId?: string;
  selected?: string;
}

export enum ActionType {
  EXPAND = 'EXPAND',
  COLLAPSE = 'COLLAPSE',
  SELECT = 'SELECT',
}

type Action =
  | { type: ActionType.EXPAND }
  | { type: ActionType.COLLAPSE }
  | { type: ActionType.SELECT; value: string };

export const defaultSelectContext = {
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
  console.log('action', action);
  switch (action.type) {
    case ActionType.EXPAND:
      return { ...state, expanded: true };
    case ActionType.COLLAPSE:
      return { ...state, expanded: false };
    case ActionType.SELECT:
      return { ...state, selected: action.value, expanded: false };
  }

  return state;
};
