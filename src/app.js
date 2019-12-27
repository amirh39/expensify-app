import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import storeConfig from './store/storeConfig';
import getVisibleExpenses from './selectors/expenses';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = storeConfig();

store.dispatch(addExpense({ description: 'rent', amount: 21000, createdAt: 1200 }));
store.dispatch(addExpense({ description: 'coffeeeee', amount: 100, createdAt: 123412 }));
store.dispatch(addExpense({ description: 'tea', createdAt: 1000000 }));
store.dispatch(addExpense({ description: 'xxx' }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
