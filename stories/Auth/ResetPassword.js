import React from 'react'
import { storiesOf } from '@storybook/react';

import ResetPassword from '@components/Auth/ResetPassword'

storiesOf('Auth/ResetPassword', module)
  .add('Reset Password', () => (
  	<ResetPassword/>
  ))
