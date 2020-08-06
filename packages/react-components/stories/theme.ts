import { lighten, darken } from 'polished';
import {keyframes, css} from 'styled-components'

export const fonts = {
    body: '"Helvetica Neue", Roboto, sans-serif',
    heading: '"Roboto", sans-serif',
    monospace: 'Menlo, monospace',
  };
  
const sizes = [    
  '0.85rem',
  '1rem',
  '1.125rem',
  '1.25rem',
  '1.50rem',
  '1.75rem',
  '3.5rem',
  '5rem',
];

export const fontSizes = sizes

export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 800,
  };
  
export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];


const animations = {
  shake: keyframes`
    from, to {
      transform: translate3d(0, 0, 0);
    }

    20%, 60% {
      transform: translate3d(-3px, 0, 0);
    }

    40%, 80% {
      transform: translate3d(3px, 0, 0);
  }`,

  fadeIn: keyframes`
    from {
      opacity: 0.5;
      transform: scale(0.9)
    }
    to {
      opacity: 1;
      transform: scale(1.05)
    }`


}

const theme = {
    sizes,
    fontSizes,
    fonts,
    fontWeights,
    lineHeights: {
      larger: '1.3rem',
    },
    space,
    colors: {
        brand: {
          primary: '#0FACAC',
          secondary: '#A0DC8A',
          accent: '#A94B6F',
          muted: '#E7E7FB',
        },
        ui: {
          primary:  '#1b75a7',//'#178DCF',
          secondary: '#93cef1',
          tertiary: '#b2d7eb',
          quaternary: '#FFFFFF',
          disabled: '#DEDEDE',
          focus: '#1EA7FD',
          error: '#D12A2A',
          success: '#8ED690',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#F2F9FF',
          mute: '#fafafa',
        },
        text: {
          primary: '#262626',
          secondary: '#4f7582',
          disabled: '#9C9C9C',
          inverse: '#FFFFFF',
          error: '#D0421B',
          success: '#138000',
        },
        highlights: {
          primaryHighlight: darken(0.1, '#012E86'),
          primaryExtraHighlight: darken(0.2, '#012E86'),
          bgHighlight: darken(0.1, '#FFFFFF'),
        },
        modes: {
            dark: {
                brand: {
                    primary: '#298DFF',
                    secondary: '#7CAEE8',
                    accent: '#FDB447',
                    muted: '#B7CBEA',
                  },
                  ui: {
                    primary: '#FFFFFF',
                    secondary: '#A1A1A1',
                    tertiary: '#0b0b0b',
                    quaternary: '#262626',
                    disabled: '#242424',
                    focus: '#1EA7FD',
                    error: '#f47070',
                    success: '#1CBD00',
                  },
                  bg: {
                    primary: '#3b3b3b',
                    secondary: '#454545',
                    mute: '#454545',
                  },
                  text: {
                    primary: '#FFFFFF',
                    secondary: '#c2c2c2',
                    disabled: '#525252',
                    inverse: '#262626',
                    error: '#ff9797',
                    success: '#1CBD00',
                  },
                  highlights: {
                    primaryHighlight: lighten(0.1, '#298DFF'),
                    primaryExtraHighlight: lighten(0.2, '#298DFF'),
                    bgHighlight: lighten(0.1, '#111111'),
                  },
            }
        }
    },
    shadows: {
      input: '9px 9px 18px #f7f7f7, -9px -9px 18px #ffffff',
      input_focus: '9px 9px 18px #ededed, -9px -9px 18px #ffffff',
      modes: {
          dark: {
            input: '6px 6px 13px #202020, -6px -6px 13px #565656',
            input_focus: '6px 6px 13px #202020, -6px -6px 13px #565656',                    
          }
      }
    }
}


export default {
  ...theme,
  heading: {
        h1: {
            m: 0,
            pt: 2,
            pb: 2,
            
            fontFamily: 'heading',
            fontSize: 7,
            fontWeight: 'bold',
            letterSpacing: '-0.2rem',
        },
        h2: {
            m:0,
            pt: 2,
            pb: 2,
            
            fontFamily: 'heading',
            fontSize: 6,
            fontWeight: 'bold',
            letterSpacing: '-0.1rem',
        },
        h3: {
            m:0,
            pt: 2,
            pb: 2,
            
            fontFamily: 'heading',
            fontSize: 5,
            fontWeight: 'bold',

        },
        h4: {
            m:0,
            pt: 2,
            pb: 2,
            
            fontFamily: 'heading',
            fontSize: 4,
            fontWeight: 'bold',

        }
    },
    text: {
        large: {
            m:0,
            pt: 3,
            pb: 3,
            fontFamily: 'body',
            fontSize: 4

        },
        medium: {
            m:0,
            pt: 3,
            pb: 3,
            
            fontFamily: 'body',
            fontSize: 3
        },
        caption: {
            m:0,
            pt: 3,
            pb: 3,
            
            fontFamily: 'body',
            fontSize: 2,
            textTransform: 'uppercase'
        },
        normal: {
            m:0,
            pt: 3,
            pb: 3,
            
            fontFamily: 'body',
            fontSize: 1
        },
        small: {
            m:0,
            pt: 3,
            pb: 3,
            
            fontFamily: 'body',
            fontSize: 0,
            letterSpacing: '0.03rem',

        }
    },
    transitions: {
        input: 'all 0.125s cubic-bezier(0.2, 0, 0.03, 1)',
        input_focus: 'all 0.5s cubic-bezier(0.2, 0, 0.03, 1)'
    },
    animations: {
      shake: css`
          animation-duration: 0.3s;
          animation-name: ${animations.shake};
          animation-timing-function: ease;
          `,        

      fadeIn: css`
          animation-duration: 0.2s;
          animation-name: ${animations.fadeIn};
          animation-timing-function: ease;
          `        
    }
    
}




