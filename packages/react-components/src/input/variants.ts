import { variant } from 'styled-system';
import { css } from 'styled-components';
import { Theme } from '../../types/theme';
const classic = {
  marginTop: '1.9rem',
  marginBottom: '3.0rem',
  border: 'solid',
  borderWidth: '1px',
  borderColor: 'bg.secondary',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  bg: 'bg.secondary',

  '&.focus': {
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'ui.primary',
  },
  'input, textarea': {
    bg: 'bg.secondary',
    border: 0,
    color: 'text.primary',
    fontSize: 2,
    p: 2,
    pl: 2,
    '&:focus': {
      outline: 0,
    },
  },
  '.label': {
    p: 2,
    pl: 0,
    fontSize: 0,
    color: 'ui.primary',
    top: '-1.9rem',
    fontWeight: 'medium',
  },
};

const material = {
  marginTop: '1.75rem',
  marginBottom: '3.0rem',
  display: 'flex',
  bg: 'bg.secondary',
  alignItems: 'center',

  '&.focus': {
    bg: 'bg.primary',
    '.border': {
      '&::before': {
        heigth: 0,
        width: 0,
      },
      '&::after': {
        width: '100%',
        height: '2px',
      },
    },
    '.label': {
      position: 'absolute',
      fontSize: 0,
      color: 'ui.primary',
      top: '-1.75rem',
      left: 0,
    },
    '.left_icon': {
      '~ .label': {
        left: `calc(-16px - 24px)`,
      },
    },
  },

  ':not(.focus)': {
    '.left_icon': {
      '~ input.non-empty': {
        '~ .label': {
          pl: `calc(-16px - 24px)`,
        },
      },
    },
  },

  '.label': {
    p: 2,
  },
  '.left_icon': {
    '~ .label': {
      pl: `calc(16px + 24px)`,
    },
  },

  'input, textarea': {
    border: 0,
    bg: 'bg.secondary',
    color: 'text.primary',
    fontSize: 2,
    p: 2,
    pl: 2,
    '&:focus': {
      outline: 0,
      bg: 'bg.primary',
    },
    '&.non-empty ~ .label': {
      fontSize: 0,
      color: 'ui.primary',
      top: '-1.75rem',
    },
  },
};

export default variant({
  scale: 'forms.input',
  variants: {
    classic,
    material,
    neumorphism: {
      marginTop: '1.75rem',
      marginBottom: '3.0rem',
      display: 'flex',
      bg: 'bg.mute',
      alignItems: 'center',
      transition: css`
        ${(theme: Theme) => theme.transitions && theme.transitions.input_focus}
      `,

      borderRadius: '4px',
      boxShadow: 'input',
      '&.focus': {
        boxShadow: 'input_focus',
        bg: 'bg.primary',
      },
      'input, textarea': {
        border: 0,
        borderRadius: '4px',
        bg: 'bg.mute',

        color: 'text.primary',
        fontSize: 2,
        p: 2,
        pl: 3,
        '&:focus': {
          outline: 0,
          bg: 'bg.primary',
        },
      },
      '.label': {
        p: 2,
        pl: 2,
        fontSize: 0,
        color: 'ui.primary',
        top: '-1.75rem',
        fontWeight: 'medium',
      },
    },
  },
});
