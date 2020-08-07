import { Theme } from '../../types/theme';
import { variant } from 'styled-system';

const classic = {
  fontFamily: 'body',
  position: 'relative',
  color: 'text.secondary',
  borderRadius: 'base',

  bg: 'bg.secondary',
  border: '2px solid',

  borderColor: 'bg.secondary',
  boxShadow: (theme: Theme) => `1px 1px 1px ${theme.colors.ui.tertiary}`,
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'space-between',
  outline: 0,

  '.icon_block': {
    p: 2,
    height: 2,
    svg: { mt: '-3px' },
  },
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
        width: 'calc(100% + 20px + 2px)',
        display: 'block',
        zIndex: 1,
        bg: 'bg.primary',
        boxShadow: (theme: Theme) => `1px 1px 1px ${theme.colors.ui.tertiary}`,

        borderRadius: 'base',
        '[role="option"]': {
          position: 'relative',
          pl: (theme: Theme) => `${(theme.space as number[])[2] + 20}px`,
          '&:first-child': {
            borderTopLeftRadius: 'base',
            borderTopRightRadius: 'base',
          },
          '&:last-child': {
            borderBottomLeftRadius: 'base',
            borderBottomRightRadius: 'base',
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

const material = {
  fontFamily: 'body',
  color: 'text.secondary',
  position: 'relative',
  outline: 0,
  display: 'flex',
  justifyContent: 'space-between',

  '[role="listbox"]': {
    width: '100%',
    '[role="option"]': {
      height: 1,
      p: 2,
    },
  },
  '.expanded_listbox': {
    display: 'none',
    position: 'absolute',
  },
};
const variants = {
  classic,
  material,
};

export default variant({
  scale: 'forms.select',
  variants,
});
