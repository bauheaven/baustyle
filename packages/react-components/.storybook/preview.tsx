import React from 'react'
import { addParameters, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y';
import {ThemeProvider} from 'styled-components'
import theme from '../stories/theme'
import {Box} from '../src'

const ThemeDecorator = (storyFn: any) => (<>
<ThemeProvider theme={theme}>  
  <Box bg="bg.primary" p={3} >
    {storyFn()}
  </Box>
</ThemeProvider>
<ThemeProvider theme={{...theme, colors: theme.colors.modes.dark, shadows: theme.shadows.modes.dark}}>  
  <Box bg="bg.primary" p={3}>
  {storyFn()}
  </Box>
</ThemeProvider>
</>)

addDecorator(ThemeDecorator)
addDecorator(withA11y)

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showRoots: true,
  },
});

