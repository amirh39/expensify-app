import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';

export const ExpenseTotal = ({ expenses }) => {
  const expenseCount = expenses.length;
  const expenseWord = expenseCount > 1 ? 'expenses' : 'expense';
  return (
    <div>
      <p>
        Viewing {expenseCount} {expenseWord}. Totaling{' '}
        {numeral(expenses.map(expense => expense.amount).reduce((sum, value) => sum + value, 0) / 100).format(
          '$0,0.00'
        )}
      </p>
    </div>
  );
};

const mapStatoToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStatoToProps)(ExpenseTotal);
