import ReactDOM from 'react-dom/client';
import App from './App';

// SCSS
import './styles/index.scss';

// Redux
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
