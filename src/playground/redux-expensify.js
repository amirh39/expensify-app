import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({ description = '', note = '', amount = 0, createAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch = expense.createdAt >= startDate || typeof startDate !== 'number';
      const endDateMatch = expense.createdAt <= endDate || typeof endDate !== 'number';
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.dispatch(setStartDate(123));
console.log(store.getState());

const demoState = {
  expenses: [
    {
      id: 'sadasdafafgfg',
      description: 'Jan Rent',
      note: 'Last one',
      amount: 125000,
      createAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};

const user = {
  age: 19,
  name: 'Amir'
};

const use = {
  ...user
};

console.log(use);
