import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import { ThemeProvider } from 'styled-components'

addDecorator(withA11y)
addDecorator(storyFn =>
  <ThemeProvider
    theme={
      {
        bg: 'black',
        fg: 'white',
      }
    }
  >
    { storyFn() }
  </ThemeProvider>  
)
// automatically import all files ending in *.stories.js
configure(require.context('../src/components', true, /\.stories\.(jsx|mdx)$/), module);
