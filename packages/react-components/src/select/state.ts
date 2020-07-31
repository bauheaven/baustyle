import React from 'react';

interface SelectState {
  expanded: boolean;
}

export enum ActionType {
  EXPAND = 'EXPAND',
  COLLAPSE = 'COLLAPSE',
}

type Action = { type: ActionType.EXPAND } | { type: ActionType.COLLAPSE };

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
  switch (action.type) {
    case ActionType.EXPAND:
      return { ...state, expanded: true };
    case ActionType.COLLAPSE:
      return { ...state, expanded: false };
  }

  return state;
};
