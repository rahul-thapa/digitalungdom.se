import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '@components/Loading';
import { ThemeProvider } from 'styled-components';
import { light } from 'components/themes';
import Router from './routes';
import configureStore from './configureStore.js';
import history from './history.js';

const { store, persistor } = configureStore();

function App() {
  return (
    <React.Suspense fallback={<Loading logo />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider
            theme={light}
          >
            <Router history={history} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.Suspense>
  );
}

export default App;
