import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './app/App';
import { store } from './store';
import { globalCss } from './styled';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);

function Root() {
  globalCss();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
