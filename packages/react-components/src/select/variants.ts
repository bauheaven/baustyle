import { Theme } from '../../types/theme';
import { variant } from 'styled-system';

const classic = {
  fontFamily: 'body',
  position: 'relative',
  color: 'text.secondary',
  borderRadius: '4px',

  bg: 'bg.secondary',
  border: '2px solid',

  borderColor: 'bg.secondary',
  boxShadow: (theme: Theme) => `1px 1px 1px ${theme.colors.ui.tertiary}`,
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'space-between',
  outline: 0,
  '&.focused': {
    border: '2px solid',
    borderColor: 'ui.focus',
  },
  '[role="option"]': {
    p: 2,
    height: 1,
  },
  '[role="listbox"]': {
    width: '100%',

    '.expanded_listbox': {
      display: 'none',
      position: 'absolute',
      width: '100%',
      '[role="option"]:hover': {
        bg: 'brand.primary',
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
        bg: 'bg.primary',
        boxShadow: (theme: Theme) => `1px 1px 1px ${theme.colors.ui.tertiary}`,

        borderRadius: '4px',
        '[role="option"]': {
          position: 'relative',
          pl: (theme: Theme) => `${(theme.space as number[])[2] + 20}px`,
          '&:first-child': {
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
          },
          '&:last-child': {
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          },
          '.left_icon': {
            position: 'absolute',
            left: 0,
            pl: 1,
            mt: '-3px',
            svg: {
              width: '20px',
            },
          },
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

export default variant({
  scale: 'forms.select',
  variants,
});
