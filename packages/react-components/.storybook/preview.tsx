import React from 'react'
import { addParameters, addDecorator } from '@storybook/react'
import {ThemeProvider} from 'styled-components'
import theme from '../stories/themes'
import {Box} from '../src'

const ThemeDecorator = (storyFn: any) => (<>
<ThemeProvider theme={theme}>  
  <Box bg="bg.primary" p={3} >
    {storyFn()}
  </Box>
</ThemeProvider>
<ThemeProvider theme={{...theme, colors: theme.colors.mode.dark, shadows: theme.shadows.mode.dark}}>  
  <Box bg="bg.primary" p={3}>
  {storyFn()}
  </Box>
</ThemeProvider>
</>)

addDecorator(ThemeDecorator)

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showRoots: true,
  },
});

