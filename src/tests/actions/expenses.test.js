import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'thisismyuid';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, createdAt, note }) => {
    expensesData[id] = { description, amount, createdAt, note };
  });

  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test('Should run ADD_EXPENSE with provided data', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('Should add expense to database and store', done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'rent',
    amount: 4000,
    note: 'This is rent',
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('Should add expense with defaults to database and store', done => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

test('Should run EDIT_EXPENSE', () => {
  const action = editExpense('123ab', { description: 'rent' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123ab',
    updates: { description: 'rent' }
  });
});

test('Should edit expense from firebase ', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = { amount: 213194 };

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount);

      done();
    });
});

test('Should run REMOVE_EXPENSE', () => {
  const action = removeExpense({ id: '123ab' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123ab'
  });
});

test('Should remove expense from firebase ', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();

      done();
    });
});

test('Should setup set expense action with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase ', done => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();
  });
});
