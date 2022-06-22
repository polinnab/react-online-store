import React from 'react';
import {render} from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import store from "./redux-store/store"
import './styles/main.scss'
import "./i18n"
import './static/fonts/fonts.css';

render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
