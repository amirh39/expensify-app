import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should run ADD_EXPENSE with provided data', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1800,
    note: 'This was rent'
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should run ADD_EXPENSE with default data', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
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

test('Should run REMOVE_EXPENSE', () => {
  const action = removeExpense({ id: '123ab' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123ab'
  });
});
